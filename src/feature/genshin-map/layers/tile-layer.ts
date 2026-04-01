import type { DefaultProps } from '@deck.gl/core'
import { CompositeLayer, Layer } from 'deck.gl'
import { canvasToBlob, createCanvas2D } from '@/utils/canvas'
import type { TileLayerFactoryConfig, TilesetLayerProps } from '../types'
import {
  createBorderLayer,
  createOriginLayer,
  createTileGridLayer,
  createTileInfoLayer,
  createTileLayer,
} from '../factorys/tile-layer'
import {
  buildTileKey,
  buildTileAddress,
  clampTileZoom,
  computeChildTileSlots,
  computePreRenderMinZoom,
  computeTileCanvasLayout,
  computeTileDrawOffset,
  createTileGridData,
  getExtent,
  loadTileImage,
} from '../utils/tile-layer'

const BASE_URL = import.meta.env.VITE_TILE_ASSETS_BASE
const ZOOM_MAPPING = 13
const TILE_GRID_SIZE = 256
const TILE_GRID_MIN_ZOOM = -3
const TILE_GRID_MAX_ZOOM = 0
const TILE_GRID_ZOOM_OFFSET = 0
const PRE_RENDER_CONCURRENCY = Math.max(1, navigator.hardwareConcurrency || 4)
const TILE_LAYER_FACTORY_CONFIG: TileLayerFactoryConfig = {
  baseUrl: BASE_URL,
  zoomMapping: ZOOM_MAPPING,
  tileGridSize: TILE_GRID_SIZE,
  tileGridMinZoom: TILE_GRID_MIN_ZOOM,
  tileGridMaxZoom: TILE_GRID_MAX_ZOOM,
  tileGridZoomOffset: TILE_GRID_ZOOM_OFFSET,
}

export class TilesetLayer extends CompositeLayer<TilesetLayerProps> {
  static layerName = 'TilesetLayer'

  static defaultProps: DefaultProps<TilesetLayerProps> = {
    data: { type: 'data', value: null },
    showBounds: { type: 'boolean', value: false },
    showOrigin: { type: 'boolean', value: false },
    showTileInfo: { type: 'boolean', value: false },
    maxCacheMemory: { type: 'number', value: 512 },
  }

  constructor(props: TilesetLayerProps) {
    super({
      ...props,
      id: `tileset(${props.data?.id ?? 'null'})`,
    })
    Reflect.set(globalThis, 'tilesetLayer', this)
  }

  #handleMap = new Map<string, FileSystemDirectoryHandle>()
  #cacheGetPromiseMap = new Map<string, Promise<ImageBitmap | null>>()
  #cacheSetPromiseMap = new Map<string, Promise<void>>()
  #cacheInflightMap = new Map<string, Promise<ImageBitmap>>()
  #cacheMemoryMap = new Map<string, { bmp: ImageBitmap; byteLength: number }>()
  #cacheMemoryUsage = 0
  #preRenderPromise: Promise<unknown> | null = null
  #preRenderedPathId: string | null = null
  #runtimeMinZoom = TILE_GRID_MIN_ZOOM
  #tileLayerRevision = 0

  #getCacheHandle = async (pathId: string) => {
    const cacheHandle = this.#handleMap.get(pathId)
    if (cacheHandle) {
      return cacheHandle
    }
    const root = await navigator.storage.getDirectory()
    const handle = await root.getDirectoryHandle(`cache_tile_${pathId}`, { create: true })
    this.#handleMap.set(pathId, handle)
    return handle
  }

  #getMaxCacheMemoryBytes = () => {
    const mb = this.props.maxCacheMemory ?? 512
    if (!Number.isFinite(mb) || mb <= 0) {
      return 0
    }
    return mb * 1024 * 1024
  }

  #setMemoryCache = (id: string, bmp: ImageBitmap, byteLength: number) => {
    const maxBytes = this.#getMaxCacheMemoryBytes()
    if (maxBytes <= 0 || byteLength > maxBytes) {
      return
    }
    const existed = this.#cacheMemoryMap.get(id)
    if (existed) {
      this.#cacheMemoryMap.delete(id)
      this.#cacheMemoryUsage -= existed.byteLength
    }
    this.#cacheMemoryMap.set(id, { bmp, byteLength })
    this.#cacheMemoryUsage += byteLength
    while (this.#cacheMemoryUsage > maxBytes && this.#cacheMemoryMap.size > 0) {
      const oldestId = this.#cacheMemoryMap.keys().next().value as string | undefined
      if (!oldestId) {
        break
      }
      const oldestCache = this.#cacheMemoryMap.get(oldestId)
      if (!oldestCache) {
        continue
      }
      this.#cacheMemoryMap.delete(oldestId)
      this.#cacheMemoryUsage -= oldestCache.byteLength
    }
  }

  #getCache = async (id: string) => {
    if (!this.props.data) return null
    const memoryCache = this.#cacheMemoryMap.get(id)
    if (memoryCache) {
      // 命中内存缓存时刷新其最近使用顺序（LRU）
      this.#cacheMemoryMap.delete(id)
      this.#cacheMemoryMap.set(id, memoryCache)
      return memoryCache.bmp
    }
    const cachePromise = this.#cacheGetPromiseMap.get(id)
    if (cachePromise) return cachePromise
    const { pathId } = this.props.data
    const promise = (async () => {
      try {
        const cacheHandle = await this.#getCacheHandle(pathId)
        const fileHandle = await cacheHandle.getFileHandle(id).catch(() => null)
        if (!fileHandle) {
          return null
        }
        const file = await fileHandle.getFile()
        const bmp = await createImageBitmap(file)
        this.#setMemoryCache(id, bmp, bmp.width * bmp.height * 4)
        return bmp
      } catch (error) {
        console.error(`failed to get cache: ${id}.`, error)
        return null
      } finally {
        this.#cacheGetPromiseMap.delete(id)
      }
    })()
    this.#cacheGetPromiseMap.set(id, promise)
    return promise
  }

  #getOrLoadTile = async (id: string, url: string) => {
    const cached = await this.#getCache(id)
    if (cached) {
      return cached
    }
    const inflight = this.#cacheInflightMap.get(id)
    if (inflight) {
      return inflight
    }
    const promise = (async () => {
      const { bmp, blob } = await loadTileImage(url)
      this.#setMemoryCache(id, bmp, bmp.width * bmp.height * 4)
      this.#setCache(id, blob)
      return bmp
    })()
    this.#cacheInflightMap.set(id, promise)
    try {
      return await promise
    } finally {
      this.#cacheInflightMap.delete(id)
    }
  }

  #setCache = async (id: string, blob: Blob) => {
    if (!this.props.data) return
    const cachePromise = this.#cacheSetPromiseMap.get(id)
    if (cachePromise) return cachePromise
    const { pathId } = this.props.data
    const promise = (async () => {
      try {
        const cacheHandle = await this.#getCacheHandle(pathId)
        const fileHandle = await cacheHandle.getFileHandle(id, { create: true })
        const writer = await fileHandle.createWritable()
        await writer.write(blob)
        await writer.close()
      } catch (error) {
        console.error(`failed to set cache: ${id}.`, error)
      } finally {
        this.#cacheSetPromiseMap.delete(id)
      }
    })()
    this.#cacheSetPromiseMap.set(id, promise)
  }

  #cacheGeneratedTile = async (cacheId: string, canvas: OffscreenCanvas | HTMLCanvasElement) => {
    const useOffscreen = typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas
    const blob = await canvasToBlob(canvas, useOffscreen, 'image/png')
    const bmp = await createImageBitmap(blob)
    this.#setMemoryCache(cacheId, bmp, bmp.width * bmp.height * 4)
    await this.#setCache(cacheId, blob)
    return bmp
  }

  preRender = async (options?: {
    backgroundColor?: string
    onProgress?: (loaded: number, total: number) => void
  }) => {
    if (!this.props.data) {
      throw new Error('preRender requires valid tileset data.')
    }
    const {
      pathId,
      extension,
      size: [w, h],
    } = this.props.data
    const { xmin, ymin, xmax, ymax } = getExtent(this.props.data)
    const zoom = TILE_GRID_MIN_ZOOM
    const z = clampTileZoom(zoom, TILE_GRID_MIN_ZOOM, TILE_GRID_MAX_ZOOM, TILE_GRID_ZOOM_OFFSET)
    const step = TILE_GRID_SIZE * 2 ** (TILE_GRID_MAX_ZOOM - z)
    const minZoomTiles = createTileGridData({
      extent: { xmin, ymin, xmax, ymax },
      step,
      z,
    })
    if (minZoomTiles.length === 0) {
      throw new Error(`No tiles found for zoom=${zoom} (z=${z}).`)
    }
    const preRenderMinZoom = computePreRenderMinZoom({
      tilesAtMinZoom: minZoomTiles,
      extent: { xmin, ymin, xmax, ymax },
      minZoom: TILE_GRID_MIN_ZOOM,
      maxZoom: TILE_GRID_MAX_ZOOM,
      tileSize: TILE_GRID_SIZE,
    })

    const { minTileX, minTileY, maxTileX, maxTileY, canvasWidth, canvasHeight } =
      computeTileCanvasLayout({
        tiles: minZoomTiles,
        tileSize: TILE_GRID_SIZE,
      })
    const { canvas, ctx, useOffscreen } = createCanvas2D(canvasWidth, canvasHeight)
    if (options?.backgroundColor) {
      ctx.fillStyle = options.backgroundColor
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    }

    const total = minZoomTiles.length
    let loaded = 0
    let cursor = 0
    const queue = [...minZoomTiles]
    const levelBitmapMap = new Map<string, ImageBitmap>()
    const workers = Array.from(
      { length: Math.min(PRE_RENDER_CONCURRENCY, queue.length) },
      async () => {
        while (true) {
          const current = queue[cursor]
          cursor += 1
          if (!current) {
            return
          }
          const { x, y } = current
          const { url, cacheId } = buildTileAddress({
            baseUrl: BASE_URL,
            pathId,
            extension,
            zoomMapping: ZOOM_MAPPING,
            z,
            x,
            y,
          })
          try {
            const bmp = await this.#getOrLoadTile(cacheId, url)
            const { dx, dy } = computeTileDrawOffset({
              x,
              y,
              minTileX,
              minTileY,
              tileSize: TILE_GRID_SIZE,
            })
            ctx.drawImage(bmp, dx, dy, TILE_GRID_SIZE, TILE_GRID_SIZE)
            levelBitmapMap.set(buildTileKey({ x, y }), bmp)
          } catch (error) {
            console.error(`preRender failed tile: ${url}.`, error)
          } finally {
            loaded += 1
            options?.onProgress?.(loaded, total)
          }
        }
      },
    )
    await Promise.all(workers)

    let previousLevelMap = levelBitmapMap
    for (let currentZoom = z - 1; currentZoom >= preRenderMinZoom; currentZoom -= 1) {
      const currentStep = TILE_GRID_SIZE * 2 ** (TILE_GRID_MAX_ZOOM - currentZoom)
      const currentTiles = createTileGridData({
        extent: { xmin, ymin, xmax, ymax },
        step: currentStep,
        z: currentZoom,
      })
      const currentLevelMap = new Map<string, ImageBitmap>()
      for (const tile of currentTiles) {
        const tileCanvasObj = createCanvas2D(TILE_GRID_SIZE, TILE_GRID_SIZE)
        const tileCanvas = tileCanvasObj.canvas
        const tileCtx = tileCanvasObj.ctx
        let hasChild = false
        for (const childSlot of computeChildTileSlots({
          x: tile.x,
          y: tile.y,
          tileSize: TILE_GRID_SIZE,
        })) {
          const childBmp = previousLevelMap.get(childSlot.childKey)
          if (!childBmp) {
            continue
          }
          hasChild = true
          tileCtx.drawImage(childBmp, childSlot.dx, childSlot.dy, childSlot.dSize, childSlot.dSize)
        }
        if (!hasChild) {
          continue
        }
        const { cacheId } = buildTileAddress({
          baseUrl: BASE_URL,
          pathId,
          extension,
          zoomMapping: ZOOM_MAPPING,
          z: currentZoom,
          x: tile.x,
          y: tile.y,
        })
        const bmp = await this.#cacheGeneratedTile(cacheId, tileCanvas)
        currentLevelMap.set(buildTileKey({ x: tile.x, y: tile.y }), bmp)
      }
      previousLevelMap = currentLevelMap
    }

    const blob = await canvasToBlob(canvas, useOffscreen, 'image/png')
    const objectUrl = URL.createObjectURL(blob)
    this.#runtimeMinZoom = preRenderMinZoom
    this.#tileLayerRevision += 1
    this.setNeedsUpdate()
    this.context.deck?.redraw('preRender cache updated')
    return {
      z,
      zoom,
      minZoom: preRenderMinZoom,
      tileCount: total,
      tileRange: {
        minX: minTileX,
        maxX: maxTileX,
        minY: minTileY,
        maxY: maxTileY,
      },
      canvasSize: [canvasWidth, canvasHeight] as const,
      sourceSize: [w, h] as const,
      blob,
      objectUrl,
      revoke: () => URL.revokeObjectURL(objectUrl),
    }
  }

  updateState: CompositeLayer<TilesetLayerProps>['updateState'] = (params) => {
    super.updateState(params)
    const pathId = this.props.data?.pathId
    if (!pathId) {
      this.#runtimeMinZoom = TILE_GRID_MIN_ZOOM
      this.#preRenderedPathId = null
      this.#preRenderPromise = null
      return
    }
    if (this.#preRenderedPathId === pathId || this.#preRenderPromise) {
      return
    }
    const preRenderPromise = this.preRender().catch((error) => {
      console.error('preRender failed.', error)
    })
    this.#preRenderPromise = preRenderPromise
    preRenderPromise.finally(() => {
      this.#preRenderedPathId = pathId
      this.#preRenderPromise = null
    })
  }

  shouldUpdateState: CompositeLayer<TilesetLayerProps>['shouldUpdateState'] = ({ changeFlags }) => {
    return changeFlags.somethingChanged
  }

  renderLayers = (): (Layer | null)[] => {
    const tileLayer = createTileLayer(this.props, TILE_LAYER_FACTORY_CONFIG, {
      getOrLoadTile: this.#getOrLoadTile,
      minZoom: this.#runtimeMinZoom,
      revision: this.#tileLayerRevision,
    })
    const tileGridLayer =
      createTileGridLayer(
        this.props,
        this.context.viewport,
        TILE_LAYER_FACTORY_CONFIG,
        {
          minZoom: this.#runtimeMinZoom,
        },
      ) ?? []
    const borderLayer = createBorderLayer(this.props)
    const originLayer = createOriginLayer(this.props)
    const tileInfoLayer = createTileInfoLayer(this.props)
    return [tileLayer, ...tileGridLayer, borderLayer, originLayer, tileInfoLayer]
  }

  finalizeState: CompositeLayer<TilesetLayerProps>['finalizeState'] = (context) => {
    super.finalizeState?.(context)
    this.#handleMap.clear()
    this.#cacheGetPromiseMap.clear()
    this.#cacheSetPromiseMap.clear()
    this.#cacheInflightMap.clear()
    for (const { bmp } of this.#cacheMemoryMap.values()) {
      bmp.close()
    }
    this.#cacheMemoryMap.clear()
    this.#cacheMemoryUsage = 0
    this.#preRenderPromise = null
    this.#preRenderedPathId = null
    this.#runtimeMinZoom = TILE_GRID_MIN_ZOOM
    this.#tileLayerRevision = 0
  }
}
