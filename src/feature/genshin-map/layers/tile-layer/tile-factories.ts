import type { Viewport } from '@deck.gl/core'
import { PathStyleExtension, PathStyleExtensionProps } from '@deck.gl/extensions'
import {
  BitmapLayer,
  COORDINATE_SYSTEM,
  PathLayer,
  PointCloudLayer,
  TextLayer,
  TileLayer,
} from 'deck.gl'
import type {
  TileGridData,
  TileLayerFactoryConfig,
  TileSublayerProps,
  TilesetLayerRenderProps,
} from '../../types/tile-layer'
import {
  buildTileAddress,
  clampTileZoom,
  createBmpProps,
  createTileGridData,
  getExtent,
  getViewportBounds,
} from './tile-utils'

export const createTileLayer = (
  props: TilesetLayerRenderProps,
  config: Pick<TileLayerFactoryConfig, 'baseUrl' | 'zoomMapping' | 'tileGridMinZoom'>,
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
  return new TileLayer<TileSublayerProps | { url: string; error: unknown } | null>({
    id: `tile(${id})@${options?.revision ?? 0}`,
    tileSize: 256,
    coordinateOrigin: [cx, cy, 0],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    data: undefined,
    minZoom: options?.minZoom ?? config.tileGridMinZoom,
    maxZoom: 0,
    maxRequests: navigator.hardwareConcurrency,
    extent: [xmin, ymin, xmax, ymax],
    getTileData: async ({ index: { x, y, z }, signal }) => {
      if (signal?.aborted) {
        return null
      }
      const { url, cacheId } = buildTileAddress({
        baseUrl: config.baseUrl,
        pathId,
        extension,
        zoomMapping: config.zoomMapping,
        z,
        x,
        y,
      })
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
      return new BitmapLayer({
        id: `bitmap(${url})`,
        image: data.image,
        bounds: [xmin, ymax, xmax, ymin],
      })
    },
    onTileLoad: () => {},
  })
}

export const createTileGridLayer = (
  props: TilesetLayerRenderProps,
  viewport: Viewport,
  config: Pick<
    TileLayerFactoryConfig,
    'tileGridMinZoom' | 'tileGridMaxZoom' | 'tileGridZoomOffset' | 'tileGridSize' | 'zoomMapping'
  >,
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
    config.tileGridMinZoom,
    config.tileGridMaxZoom,
    config.tileGridZoomOffset,
  )
  const step = config.tileGridSize * 2 ** (config.tileGridMaxZoom - z)
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
    getText: (d) => `${d.z + config.zoomMapping}/${d.x}_${d.y}`,
    getColor: [255, 255, 0],
    sizeMaxPixels: 14,
    getSize: 14,
  })

  return [path, text]
}

export const createBorderLayer = (props: TilesetLayerRenderProps) => {
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

export const createOriginLayer = (props: TilesetLayerRenderProps) => {
  if (!props.data) {
    return null
  }
  const { id, center } = props.data
  return new PointCloudLayer({
    id: `origin(${id})`,
    data: [
      { pos: [0, 0], color: [255, 255, 255] },
      { pos: center, color: [255, 255, 0] },
    ],
    pointSize: 4,
    getPosition: (d) => d.pos,
    getColor: (d) => d.color,
  })
}

export const createTileInfoLayer = (props: TilesetLayerRenderProps) => {
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
