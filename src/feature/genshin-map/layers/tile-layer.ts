import type { DefaultProps, Viewport } from '@deck.gl/core'
import { PathStyleExtension, PathStyleExtensionProps } from '@deck.gl/extensions'
import {
  BitmapLayer,
  CompositeLayer,
  COORDINATE_SYSTEM,
  PathLayer,
  PointCloudLayer,
  Layer,
  TileLayer,
  TextLayer,
} from 'deck.gl'
import type { ResolvedTileset, TileSublayerProps } from '../types'
import {
  clampTileZoom,
  createBmpProps,
  createTileGridData,
  getExtent,
  getViewportBounds,
  type TileGridData,
} from '../utils/tile-layer'

export interface TilesetLayerProps {
  /** 图层数据 */
  data: ResolvedTileset | null
  /** @debug 是否显示边界框 */
  showBounds?: boolean
  /** @debug 是否显示原点 */
  showOrigin?: boolean
  /** @debug 是否显示瓦片信息 */
  showTileInfo?: boolean
  /** 限制缓存使用的内存大小，单位为 MB @default 512 */
  maxCacheMemory?: number
}

const BASE_URL = import.meta.env.VITE_TILE_ASSETS_BASE
const ZOOM_MAPPING = 13
const TILE_GRID_SIZE = 256
const TILE_GRID_MIN_ZOOM = -3
const TILE_GRID_MAX_ZOOM = 0
const TILE_GRID_ZOOM_OFFSET = 0
const PRE_RENDER_CONCURRENCY = Math.max(1, navigator.hardwareConcurrency || 4)

const loadTileImage = async (url: string, signal?: AbortSignal) => {
  const res = await fetch(url, {
    mode: 'cors',
    method: 'GET',
    signal,
  })
  if (res.status !== 200) {
    throw new Error(`failed to load tile: ${url}, ${res.statusText}.`)
  }
  const blob = await res.blob()
  // cache the blob, no need to wait
  const bmp = await createImageBitmap(blob)
  return { bmp, blob }
}

const createCanvas2D = (width: number, height: number) => {
  const useOffscreen = typeof OffscreenCanvas !== 'undefined'
  const canvas = useOffscreen
    ? new OffscreenCanvas(width, height)
    : Object.assign(document.createElement('canvas'), {
        width,
        height,
      })
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to create 2D context.')
  }
  return { canvas, ctx, useOffscreen }
}

const canvasToBlob = async (
  canvas: OffscreenCanvas | HTMLCanvasElement,
  useOffscreen: boolean,
  type = 'image/png',
) => {
  if (useOffscreen) {
    return (canvas as OffscreenCanvas).convertToBlob({ type })
  }
  return new Promise<Blob>((resolve, reject) => {
    ;(canvas as HTMLCanvasElement).toBlob((result) => {
      if (!result) {
        reject(new Error('Failed to export canvas blob.'))
        return
      }
      resolve(result)
    }, type)
  })
}

const createTileLayer = (
  props: TilesetLayer['props'],
  options?: {
    getOrLoadTile?: (id: string, url: string) => Promise<ImageBitmap>
    minZoom?: number
    revision?: number
  },
) => {
  if (!props.data) {
    return null
  }
  const {
    id,
    pathId,
    extension,
    center: [cx, cy],
  } = props.data
  const { xmin, ymin, xmax, ymax } = getExtent(props.data)
  console.log('[minZoom]', options?.minZoom ?? TILE_GRID_MIN_ZOOM)
  return new TileLayer<TileSublayerProps | { url: string; error: unknown } | null>({
    id: `tile(${id})@${options?.revision ?? 0}`,
    tileSize: 256,
    coordinateOrigin: [cx, cy, 0],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    data: undefined,
    minZoom: options?.minZoom ?? TILE_GRID_MIN_ZOOM,
    maxZoom: 0, // 固定值，对应服务端存储底图的 level 13
    maxRequests: navigator.hardwareConcurrency,
    extent: [xmin, ymin, xmax, ymax],
    getTileData: async ({ index: { x, y, z }, signal }) => {
      if (signal?.aborted) {
        return null
      }
      const url = `${BASE_URL}${pathId}/${z + ZOOM_MAPPING}/${x}_${y}.${extension}`
      const cacheId = `${pathId}_${z + ZOOM_MAPPING}_${x}_${y}.${extension}`
      try {
        const bmp = await options?.getOrLoadTile?.(cacheId, url)
        if (!bmp) {
          return null
        }
        return createBmpProps(url, bmp)
      } catch (error) {
        return {
          url,
          error,
        }
      }
    },
    renderSubLayers: ({ data, tile }) => {
      if (!data) {
        return null
      }
      const {
        0: { 0: xmin, 1: ymin },
        1: { 0: xmax, 1: ymax },
      } = tile.boundingBox
      const { url } = data
      if ('error' in data) {
        return new TextLayer({
          id: `tileError(${url})`,
          data: [{ text: `Error: ${data.error}` }],
          fontFamily: 'Consolas',
          getTextAnchor: 'middle',
          getAlignmentBaseline: 'top',
          getColor: [255, 0, 0],
          getSize: 12,
          getPosition: () => [(xmin + xmax) / 2, (ymin + ymax) / 2, 0],
          getText: () => 'ERROR',
        })
      }
      const bmpLayer = new BitmapLayer({
        id: `bitmap(${url})`,
        image: data.image,
        bounds: [xmin, ymax, xmax, ymin],
      })
      return bmpLayer
    },
    onTileLoad: () => {},
  })
}

const createTileGridLayer = (
  props: TilesetLayer['props'],
  viewport: Viewport,
  options?: {
    minZoom?: number
  },
) => {
  if (!props.data) {
    return null
  }
  const {
    id,
    center: [cx, cy],
  } = props.data
  const { xmin, ymin, xmax, ymax } = getExtent(props.data)
  const [viewMinX, viewMinY, viewMaxX, viewMaxY] = getViewportBounds(viewport)
  const z = clampTileZoom(
    viewport.zoom ?? 0,
    options?.minZoom ?? TILE_GRID_MIN_ZOOM,
    TILE_GRID_MAX_ZOOM,
    TILE_GRID_ZOOM_OFFSET,
  )
  const step = TILE_GRID_SIZE * 2 ** (TILE_GRID_MAX_ZOOM - z)
  const tileGridData = createTileGridData({
    extent: { xmin, ymin, xmax, ymax },
    viewportBounds: [viewMinX, viewMinY, viewMaxX, viewMaxY],
    step,
    z,
  })

  const path = new PathLayer<TileGridData, PathStyleExtensionProps>({
    id: `tileGrid(${id})`,
    data: tileGridData,
    coordinateOrigin: [cx, cy, 0],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    getWidth: 1,
    widthMinPixels: 1,
    getColor: [255, 255, 0],
    getPath: (d) => d.path,
    getDashArray: [10, 10],
    dashJustified: true,
    dashGapPickable: true,
    extensions: [
      new PathStyleExtension({
        dash: true,
      }),
    ],
  })

  const text = new TextLayer({
    id: `tileGridText(${id})`,
    data: tileGridData,
    fontFamily: 'Consolas',
    getTextAnchor: 'start',
    getAlignmentBaseline: 'top',
    getPosition: (d) => d.path[0],
    getText: (d) => `${d.z + ZOOM_MAPPING}/${d.x}_${d.y}`,
    getColor: [255, 255, 0],
    sizeMaxPixels: 14,
    getSize: 14,
  })

  return [path, text]
}

const createBorderLayer = (props: TilesetLayer['props']) => {
  if (!props.data || !props.showBounds) {
    return null
  }
  const { id } = props.data
  const { xmin, ymin, xmax, ymax } = getExtent(props.data)
  return new PathLayer({
    id: `border(${id})`,
    data: [1],
    getWidth: 1,
    widthMinPixels: 1,
    getColor: [255, 255, 255],
    getPath: () => [
      [xmin, ymin],
      [xmin, ymax],
      [xmax, ymax],
      [xmax, ymin],
      [xmin, ymin],
    ],
  })
}

const createOriginLayer = (props: TilesetLayer['props']) => {
  if (!props.data) {
    return null
  }
  const { id, center } = props.data
  return new PointCloudLayer({
    id: `origin(${id})`,
    data: [
      { pos: [0, 0], color: [255, 255, 255] }, // 原始原点
      { pos: center, color: [255, 255, 0] }, // 相对原点
    ],
    pointSize: 4,
    getPosition: (d) => d.pos,
    getColor: (d) => d.color,
  })
}

const createTileInfoLayer = (props: TilesetLayer['props']) => {
  if (!props.data) {
    return null
  }
  const {
    id,
    size: { 0: w, 1: h },
  } = props.data
  const { xmin, ymin } = getExtent(props.data)
  return new TextLayer({
    id: `tileInfo(${id})`,
    getSize: 16,
    getPosition: (d) => d.pos,
    getColor: () => [255, 0, 0],
    getAlignmentBaseline: 'bottom',
    getText: (d) => d.text,
    sizeMinPixels: 16,
    data: [{ pos: [xmin, ymin], text: `${w}x${h}` }],
  })
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

  #computePreRenderMinZoom = (tilesAtMinZoom: TileGridData[]) => {
    let currentTiles = tilesAtMinZoom
    let currentZoom = TILE_GRID_MIN_ZOOM
    while (currentTiles.length > 1) {
      const nextZoom = currentZoom - 1
      const step = TILE_GRID_SIZE * 2 ** (TILE_GRID_MAX_ZOOM - nextZoom)
      const { xmin, ymin, xmax, ymax } = getExtent(this.props.data!)
      const nextTiles = createTileGridData({
        extent: { xmin, ymin, xmax, ymax },
        step,
        z: nextZoom,
      })
      if (nextTiles.length === currentTiles.length) {
        break
      }
      currentZoom = nextZoom
      currentTiles = nextTiles
      if (currentTiles.length <= 1) {
        break
      }
    }
    return currentZoom
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
    const preRenderMinZoom = this.#computePreRenderMinZoom(minZoomTiles)

    const minTileX = Math.min(...minZoomTiles.map((tile) => tile.x))
    const minTileY = Math.min(...minZoomTiles.map((tile) => tile.y))
    const maxTileX = Math.max(...minZoomTiles.map((tile) => tile.x))
    const maxTileY = Math.max(...minZoomTiles.map((tile) => tile.y))
    const tileCols = maxTileX - minTileX + 1
    const tileRows = maxTileY - minTileY + 1

    const canvasWidth = tileCols * TILE_GRID_SIZE
    const canvasHeight = tileRows * TILE_GRID_SIZE
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
          const url = `${BASE_URL}${pathId}/${z + ZOOM_MAPPING}/${x}_${y}.${extension}`
          const cacheId = `${pathId}_${z + ZOOM_MAPPING}_${x}_${y}.${extension}`
          try {
            const bmp = await this.#getOrLoadTile(cacheId, url)
            const dx = (x - minTileX) * TILE_GRID_SIZE
            const dy = (y - minTileY) * TILE_GRID_SIZE
            ctx.drawImage(bmp, dx, dy, TILE_GRID_SIZE, TILE_GRID_SIZE)
            levelBitmapMap.set(`${x}_${y}`, bmp)
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
        for (let childXOffset = 0; childXOffset <= 1; childXOffset += 1) {
          for (let childYOffset = 0; childYOffset <= 1; childYOffset += 1) {
            const childX = tile.x * 2 + childXOffset
            const childY = tile.y * 2 + childYOffset
            const childKey = `${childX}_${childY}`
            const childBmp = previousLevelMap.get(childKey)
            if (!childBmp) {
              continue
            }
            hasChild = true
            tileCtx.drawImage(
              childBmp,
              childXOffset * (TILE_GRID_SIZE / 2),
              childYOffset * (TILE_GRID_SIZE / 2),
              TILE_GRID_SIZE / 2,
              TILE_GRID_SIZE / 2,
            )
          }
        }
        if (!hasChild) {
          continue
        }
        const cacheId = `${pathId}_${currentZoom + ZOOM_MAPPING}_${tile.x}_${tile.y}.${extension}`
        const bmp = await this.#cacheGeneratedTile(cacheId, tileCanvas)
        currentLevelMap.set(`${tile.x}_${tile.y}`, bmp)
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
    const tileLayer = createTileLayer(this.props, {
      getOrLoadTile: this.#getOrLoadTile,
      minZoom: this.#runtimeMinZoom,
      revision: this.#tileLayerRevision,
    })
    const tileGridLayer =
      createTileGridLayer(this.props, this.context.viewport, {
        minZoom: this.#runtimeMinZoom,
      }) ?? []
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
