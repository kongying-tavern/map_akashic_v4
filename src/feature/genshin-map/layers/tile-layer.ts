import { BitmapLayer, COORDINATE_SYSTEM, TileLayer, PathLayer, PointCloudLayer } from 'deck.gl'
import type { ResolvedTileset, TileSublayerProps, TileLayerFactoryOptions } from '../types'

const BASE_URL = import.meta.env.VITE_TILE_ASSETS_BASE
const ZOOM_MAPPING = 13

const loadTileImage = async (url: string, signal?: AbortSignal) => {
  const res = await fetch(url, {
    mode: 'cors',
    method: 'GET',
    signal,
  })
  const blob = await res.clone().blob()
  return await createImageBitmap(blob)
}

/** 简化图层创建 */
export const createTileLayer = (
  tileset: ResolvedTileset,
  options: TileLayerFactoryOptions = {},
) => {
  const {
    id,
    pathId,
    center: [cx, cy],
    size: [w, h],
    tilesOffset: [ox, oy],
    extension,
  } = tileset

  const { cacheFunc, debug } = options

  const tileLayer = new TileLayer<TileSublayerProps | null>({
    id,
    tileSize: 256,
    coordinateOrigin: [cx, cy, 0],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    data: undefined,
    minZoom: -3, // 固定值，对应服务端存储底图的 level 10
    maxZoom: 0, // 固定值，对应服务端存储底图的 level 13
    // extent: [ox, h + oy, w + ox + cx, oy + cy],
    extent: [ox, h + oy, w + ox, oy],
    getTileData: async ({ index: { x, y, z }, signal }) => {
      if (signal?.aborted) {
        return null
      }
      const url = `${BASE_URL}${pathId}/${z + ZOOM_MAPPING}/${x}_${y}.${extension}`
      try {
        // 首先尝试缓存
        const bmpCache = await cacheFunc?.(url, signal)
        if (bmpCache) {
          return {
            byteLength: bmpCache.width * bmpCache.height * 4, // RGBA
            image: bmpCache,
            url,
          } satisfies TileSublayerProps
        }
        // 缓存 miss 时从网络加载
        const bmp = await loadTileImage(url, signal)
        return {
          byteLength: bmp.width * bmp.height * 4, // RGBA
          image: bmp,
          url,
        } satisfies TileSublayerProps
      } catch {
        return null
      }
    },
    renderSubLayers: (props) => {
      if (!props.data) {
        return null
      }
      const { url } = props.data
      const {
        0: { 0: xmin, 1: ymin },
        1: { 0: xmax, 1: ymax },
      } = props.tile.boundingBox
      const bmpLayer = new BitmapLayer({
        id: `bmp-${url}`,
        image: props.data.image,
        bounds: [xmin, ymax, xmax, ymin],
      })
      return bmpLayer
    },
  })

  if (debug) {
    const borderLayer = new PathLayer({
      getWidth: 10,
      getColor: () => [255, 0, 0],
      data: [
        {
          name: 'bounds',
          path: [
            [ox, h + oy],
            [w + ox, h + oy],
            [w + ox, oy],
            [ox, oy],
            [ox, h + oy],
          ],
        },
      ],
    })
    const originLayer = new PointCloudLayer({
      data: [[cx, cy]],
      getPosition: (d) => d,
      getColor: () => [255, 0, 0],
      getSize: 10,
    })
    return [tileLayer, borderLayer, originLayer]
  }

  return [tileLayer]
}
