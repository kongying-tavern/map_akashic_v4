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

const createTileLayer = (
  props: TilesetLayer['props'],
  options?: {
    getOrLoadTile?: (id: string, url: string) => Promise<ImageBitmap>
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
  return new TileLayer<TileSublayerProps | { url: string; error: unknown } | null>({
    id: `tile(${id})`,
    tileSize: 256,
    coordinateOrigin: [cx, cy, 0],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    data: undefined,
    minZoom: -3, // 固定值，对应服务端存储底图的 level 10
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

const createTileGridLayer = (props: TilesetLayer['props'], viewport: Viewport) => {
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
    TILE_GRID_MIN_ZOOM,
    TILE_GRID_MAX_ZOOM,
    TILE_GRID_ZOOM_OFFSET,
  )
  const step = TILE_GRID_SIZE * 2 ** (TILE_GRID_MAX_ZOOM - z)
  const tileGridData = createTileGridData(
    { xmin, ymin, xmax, ymax },
    [viewMinX, viewMinY, viewMaxX, viewMaxY],
    step,
    z,
  )

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
  }

  #handleMap = new Map<string, FileSystemDirectoryHandle>()
  #cacheGetPromiseMap = new Map<string, Promise<ImageBitmap | null>>()
  #cacheSetPromiseMap = new Map<string, Promise<void>>()
  #cacheInflightMap = new Map<string, Promise<ImageBitmap>>()
  #cacheMemoryMap = new Map<string, { bmp: ImageBitmap; byteLength: number }>()
  #cacheMemoryUsage = 0

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

  shouldUpdateState: CompositeLayer<TilesetLayerProps>['shouldUpdateState'] = ({ changeFlags }) => {
    return changeFlags.somethingChanged
  }

  renderLayers = (): (Layer | null)[] => {
    const tileLayer = createTileLayer(this.props, {
      getOrLoadTile: this.#getOrLoadTile,
    })
    const tileGridLayer = createTileGridLayer(this.props, this.context.viewport) ?? []
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
  }
}
