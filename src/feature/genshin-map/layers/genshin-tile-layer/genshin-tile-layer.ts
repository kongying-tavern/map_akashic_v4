import { CompositeLayer, TileLayer, BitmapLayer } from 'deck.gl'
import Api from '@/api'
import { ResolvedTileset } from '../../types'

/** 符合 Genshin Tileset 格式的资源地址 */
const BASE_URL = import.meta.env.VITE_SERVICE_RESOURCE_URL
/** 缩放偏移量 */
const ZOOM_MAPPING = 13

export interface GenshinTileLayerProps {
  data: ResolvedTileset
  bounds: [min: [number, number], max: [number, number]]
}

interface TileData {
  byteLength: number
  url: string
  image: ImageBitmap
}

interface TileExtent {
  xmin: number
  xmax: number
  ymin: number
  ymax: number
}

type TileIndex = Parameters<TileLayer['getTileData']>[0]['index']

/** 计算 tile 图层边界 */
const getExtent = (data: ResolvedTileset): TileExtent => {
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

/** 计算 tile 块的 url */
const getTileUrl = (data: ResolvedTileset, index: TileIndex): string => {
  const { x, y, z } = index
  const url = `${BASE_URL}/tiles_${data.pathId}/${z + ZOOM_MAPPING}/${x}_${y}.png`
  return url
}

const createTileLayer = (
  tileset: ResolvedTileset,
  /** 该图层是否作为 fallback 使用 */
  asFallback = false,
) => {
  const { xmax, xmin, ymax, ymin } = getExtent(tileset)
  return new TileLayer<TileData | null>({
    id: `TileLayer(${tileset.pathId}${asFallback ? '.fallback' : ''})`,
    data: null,
    minZoom: -3,
    maxZoom: asFallback ? -3 : 0,
    tileSize: 256,
    extent: [xmin, ymin, xmax, ymax],
    // refinementStrategy: 'never',
    refinementStrategy: 'best-available',
    maxCacheByteSize: Number.MAX_SAFE_INTEGER,
    maxCacheSize: Number.MAX_SAFE_INTEGER,
    maxRequests: navigator.hardwareConcurrency,
    getTileData: async ({ index, signal }) => {
      if (signal?.aborted) {
        return null
      }
      try {
        const url = getTileUrl(tileset, index)
        const bmp = await Api.assets.getTile({
          pathId: tileset.pathId,
          x: index.x,
          y: index.y,
          z: index.z,
          zMapping: ZOOM_MAPPING,
          extension: tileset.extension,
        })
        return {
          byteLength: bmp.width * bmp.height * 4,
          image: bmp,
          url,
        } as TileData
      } catch {
        return null
      }
    },
    renderSubLayers: ({ data, tile }) => {
      if (!data || typeof data === 'string') {
        return null
      }
      const {
        0: { 0: xmin, 1: ymin },
        1: { 0: xmax, 1: ymax },
      } = tile.boundingBox
      return new BitmapLayer({
        id: `BitmapLayer(${data.url}${asFallback ? '.fallback' : ''})`,
        image: data.image,
        bounds: [xmin, ymax, xmax, ymin],
      })
    },
  })
}

export class GenshinTileLayer extends CompositeLayer<GenshinTileLayerProps> {
  static layerName = 'GenshinTileLayer'

  constructor(data: ResolvedTileset) {
    const { xmax, xmin, ymax, ymin } = getExtent(data)
    super({
      data,
      bounds: [
        [xmin, ymin],
        [xmax, ymax],
      ],
    })
  }

  override renderLayers() {
    return [
      // createTileLayer(this.props.data, true),
      createTileLayer(this.props.data),
    ] satisfies ReturnType<CompositeLayer['renderLayers']>
  }
}
