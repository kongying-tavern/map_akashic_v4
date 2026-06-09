import { CompositeLayer, TileLayer, BitmapLayer } from 'deck.gl'
import type { OrthographicViewState } from 'deck.gl'
import Api from '@/api'
import type { GenshinDeck } from '../../core/genshin-deck'
import type { ResolvedTileset } from '../../types'

/** 符合 Genshin Tileset 格式的资源地址 */
const BASE_URL = import.meta.env.VITE_SERVICE_RESOURCE_URL
/** 缩放偏移量 */
const ZOOM_MAPPING = 13

export interface GenshinTileLayerProps {
  data: ResolvedTileset
  bounds: [min: [number, number], max: [number, number]]
  initViewState: {
    target: [number, number]
    zoom: number
  }
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

const getInitTarget = (data: ResolvedTileset): [number, number] => {
  if (!data.settings?.center) {
    return [0, 0]
  }
  const [x, y] = data.settings.center
  const [ox, oy] = data.center
  return [x + ox, y + oy]
}

/** 计算 tile 块的 url */
const getTileUrl = (data: ResolvedTileset, index: TileIndex): string => {
  const { x, y, z } = index
  const url = `${BASE_URL}/tiles_${data.pathId}/${z + ZOOM_MAPPING}/${x}_${y}.png`
  return url
}

const createTileLayer = (tileset: ResolvedTileset) => {
  const { xmax, xmin, ymax, ymin } = getExtent(tileset)

  const tileLayer = new TileLayer<TileData | null>({
    id: `TileLayer(${tileset.pathId})`,
    data: null,
    minZoom: -3,
    maxZoom: 0,
    tileSize: 256,
    extent: [xmin, ymin, xmax, ymax],
    refinementStrategy: 'best-available',
    maxCacheByteSize: Number.MAX_SAFE_INTEGER,
    maxCacheSize: 512 * 2 ** 20, // 512 MiB
    maxRequests: navigator.hardwareConcurrency,
    getTileData: async ({ index, signal }) => {
      if (signal?.aborted) {
        return null
      }
      try {
        const url = getTileUrl(tileset, index)
        const bmp = await Api.assets.getTile(
          {
            pathId: tileset.pathId,
            x: index.x,
            y: index.y,
            z: index.z,
            zMapping: ZOOM_MAPPING,
            extension: tileset.extension,
          },
          signal,
        )
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
        id: `BitmapLayer(${data.url})`,
        image: data.image,
        bounds: [xmin, ymax, xmax, ymin],
      })
    },
  })

  return tileLayer
}

export class GenshinTileLayer extends CompositeLayer<GenshinTileLayerProps> {
  static layerName = 'GenshinTileLayer'

  static #instance: GenshinTileLayer | null = null

  constructor(data: ResolvedTileset) {
    const { xmax, xmin, ymax, ymin } = getExtent(data)
    super({
      id: 'GenshinTileLayer',
      data,
      bounds: [
        [xmin, ymin],
        [xmax, ymax],
      ],
      initViewState: {
        target: getInitTarget(data),
        zoom: data.settings?.zoom ?? -1,
      },
    })
    if (GenshinTileLayer.#instance) {
      GenshinTileLayer.#instance._finalize()
    }
    GenshinTileLayer.#instance = this
  }

  override renderLayers() {
    return createTileLayer(this.props.data)
  }

  applyDeck(deck: GenshinDeck, oldViewState: OrthographicViewState) {
    deck.setProps({
      controller: {
        dragMode: 'pan',
        dragRotate: false,
        inertia: 500,
        touchRotate: false,
        maxBounds: this.props.bounds,
      },
      initialViewState: oldViewState,
      layers: [this],
    })
    // 分两次调用以便触发视口过渡
    deck.setProps({
      initialViewState: {
        ...this.props.initViewState,
        transitionEasing: (t) => 1 - (1 - t) ** 4,
        transitionDuration: 500,
      },
    })
  }
}
