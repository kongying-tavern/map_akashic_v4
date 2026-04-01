import type { ResolvedTileset } from './tileset'

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

export type TilesetLayerRenderProps = {
  data: ResolvedTileset | null
  showBounds?: boolean
}

export type TileLayerFactoryConfig = {
  baseUrl: string
  zoomMapping: number
  tileGridSize: number
  tileGridMinZoom: number
  tileGridMaxZoom: number
  tileGridZoomOffset: number
}

export type TileGridData = {
  x: number
  y: number
  z: number
  path: [number, number][]
}

export type TileExtent = {
  xmin: number
  ymin: number
  xmax: number
  ymax: number
}

export type ChildTileSlot = {
  childX: number
  childY: number
  childKey: string
  dx: number
  dy: number
  dSize: number
}
