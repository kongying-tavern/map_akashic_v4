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

export interface TilesetLayerProps {
  /** 图层数据 */
  data: ResolvedTileset | null
  /** @debug 是否显示边界框 */
  showBounds?: boolean
  /** @debug 是否显示原点 */
  showOrigin?: boolean
  /** @debug 是否显示瓦片信息 */
  showTileInfo?: boolean
}

const BASE_URL = import.meta.env.VITE_TILE_ASSETS_BASE
const ZOOM_MAPPING = 13

const createBmpProps = (url: string, bmp: ImageBitmap): TileSublayerProps => {
  return {
    byteLength: bmp.width * bmp.height * 4, // RGBA
    image: bmp,
    url,
  }
}

const loadTileImage = async (url: string, signal?: AbortSignal) => {
  const res = await fetch(url, {
    mode: 'cors',
    method: 'GET',
    signal,
  })
  if (res.status !== 200) {
    throw new Error(`failed to load tile: ${url}, ${res.statusText}.`)
  }
  const blob = await res.clone().blob()
  // cache the blob, no need to wait
  const bmp = await createImageBitmap(blob)
  return { bmp, blob }
}

const getExtent = (data: ResolvedTileset) => {
  const {
    size: { 0: w, 1: h },
    tilesOffset: { 0: ox, 1: oy },
  } = data
  return {
    xmin: ox,
    xmax: w + ox,
    ymin: oy,
    ymax: h + oy,
  }
}

const TILE_GRID_SIZE = 256
const TILE_GRID_MIN_ZOOM = -3
const TILE_GRID_MAX_ZOOM = 0
const TILE_GRID_ZOOM_OFFSET = 0

type TileGridData = {
  x: number
  y: number
  z: number
  path: [number, number][]
}

const clampTileZoom = (zoom: number) => {
  // Align with Deck.GL TileLayer (Tileset2D#getTileIndices):
  // For non-geospatial viewport, z = ceil(viewport.zoom) + zoomOffset.
  const z = Math.ceil(zoom) + TILE_GRID_ZOOM_OFFSET
  return Math.min(TILE_GRID_MAX_ZOOM, Math.max(TILE_GRID_MIN_ZOOM, z))
}

const getViewportBounds = (viewport: Viewport) => {
  const zoom = viewport.zoom ?? 0
  const scale = 2 ** zoom
  const halfWidth = (viewport.width ?? 0) / (2 * scale)
  const halfHeight = (viewport.height ?? 0) / (2 * scale)
  const targetX = viewport.center?.[0] ?? 0
  const targetY = viewport.center?.[1] ?? 0
  return [targetX - halfWidth, targetY - halfHeight, targetX + halfWidth, targetY + halfHeight]
}

const createTileLayer = (
  props: TilesetLayer['props'],
  options?: {
    getCache?: (id: string) => Promise<ImageBitmap | null>
    setCache?: (id: string, blob: Blob) => Promise<void>
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
  return new TileLayer<TileSublayerProps | null>({
    id: `tile(${id})`,
    tileSize: 256,
    coordinateOrigin: [cx, cy, 0],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    data: undefined,
    minZoom: -3, // 固定值，对应服务端存储底图的 level 10
    maxZoom: 0, // 固定值，对应服务端存储底图的 level 13
    extent: [xmin, ymin, xmax, ymax],
    getTileData: async ({ index: { x, y, z }, signal }) => {
      if (signal?.aborted) {
        return null
      }
      const url = `${BASE_URL}${pathId}/${z + ZOOM_MAPPING}/${x}_${y}.${extension}`
      const cacheId = `${pathId}_${z + ZOOM_MAPPING}_${x}_${y}.${extension}`
      try {
        // 首先尝试缓存
        const bmpCache = (await options?.getCache?.(cacheId)) ?? null
        if (bmpCache) {
          return createBmpProps(url, bmpCache)
        }
        // 缓存 miss 时从网络加载
        const { bmp, blob } = await loadTileImage(url, signal)
        options?.setCache?.(cacheId, blob)
        return createBmpProps(url, bmp)
      } catch {
        return null
      }
    },
    renderSubLayers: ({ data, tile }) => {
      if (!data) {
        return null
      }
      const { url } = data
      const {
        0: { 0: xmin, 1: ymin },
        1: { 0: xmax, 1: ymax },
      } = tile.boundingBox
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
  const z = clampTileZoom(viewport.zoom ?? 0)
  const step = TILE_GRID_SIZE * 2 ** (TILE_GRID_MAX_ZOOM - z)

  // coordinateOrigin 使用 center，因此可见边界需要转换到 tiles 本地坐标系
  const localMinX = viewMinX
  const localMinY = viewMinY
  const localMaxX = viewMaxX
  const localMaxY = viewMaxY

  const xMin = Math.floor(localMinX / step)
  const xMax = Math.ceil(localMaxX / step) - 1
  const yMin = Math.floor(localMinY / step)
  const yMax = Math.ceil(localMaxY / step) - 1

  const tileGridData: TileGridData[] = []
  for (let x = xMin; x <= xMax; x += 1) {
    const left = x * step
    const right = (x + 1) * step
    for (let y = yMin; y <= yMax; y += 1) {
      const bottom = (y + 1) * step
      const top = y * step
      if (right < xmin || left > xmax || top < ymin || bottom > ymax) {
        continue
      }
      tileGridData.push({
        x,
        y,
        z,
        path: [
          [left, top],
          [left, bottom],
          [right, bottom],
          [right, top],
          [left, top],
        ],
      })
    }
  }

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
  }

  constructor(props: TilesetLayerProps) {
    super({
      ...props,
      id: `tileset(${props.data?.id ?? 'null'})`,
    })
  }

  #cacheHandle: FileSystemDirectoryHandle | null = null

  #getCacheHandle = async (pathId: string) => {
    if (!this.#cacheHandle) {
      const root = await navigator.storage.getDirectory()
      this.#cacheHandle = await root.getDirectoryHandle(`cache_tile_${pathId}`, { create: true })
    }
    return this.#cacheHandle
  }

  #getCache = async (id: string) => {
    if (!this.props.data) return null
    try {
      const { pathId } = this.props.data
      const cacheHandle = await this.#getCacheHandle(pathId)
      const fileHandle = await cacheHandle.getFileHandle(id).catch(() => null)
      if (!fileHandle) {
        return null
      }
      const file = await fileHandle.getFile()
      const bmp = await createImageBitmap(file)
      return bmp
    } catch (error) {
      console.error(`failed to get cache: ${id}.`, error)
      return null
    }
  }

  #setCache = async (id: string, blob: Blob) => {
    if (!this.props.data) return
    try {
      const { pathId } = this.props.data
      const cacheHandle = await this.#getCacheHandle(pathId)
      const fileHandle = await cacheHandle.getFileHandle(id, { create: true })
      const writer = await fileHandle.createWritable()
      await writer.write(blob)
      await writer.close()
    } catch (error) {
      console.error(`failed to set cache: ${id}.`, error)
    }
  }

  shouldUpdateState: CompositeLayer<TilesetLayerProps>['shouldUpdateState'] = ({ changeFlags }) => {
    return changeFlags.somethingChanged
  }

  renderLayers = (): (Layer | null)[] => {
    const tileLayer = createTileLayer(this.props, {
      getCache: this.#getCache,
      setCache: this.#setCache,
    })
    const tileGridLayer = createTileGridLayer(this.props, this.context.viewport) ?? []
    const borderLayer = createBorderLayer(this.props)
    const originLayer = createOriginLayer(this.props)
    const tileInfoLayer = createTileInfoLayer(this.props)
    return [tileLayer, ...tileGridLayer, borderLayer, originLayer, tileInfoLayer]
  }
}
