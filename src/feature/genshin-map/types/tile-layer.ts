/**
 * 完成继承解析后的 tile 配置
 */
export interface ResolvedTileset {
  /**
   * ### 图层原点位置
   * @default [0,0]
   */
  center: [x: number, y: number]

  /** ### 图层文件后缀 */
  extension: string

  /** ### 图层 ID */
  id: string

  /** ### 可选设置 */
  settings?: {
    /** 初始化 tile 图层后的默认视口位置 */
    center?: [x: number, y: number]
    /** 初始化 tile 图层后的默认缩放级别 */
    zoom?: number
  }

  /**
   * ### 图层大小（单位：像素）
   * 如果未指定则会渲染默认的占位或报错图层（1024x1024）
   * @default [1024,1024]
   */
  size: [width: number, height: number]

  /**
   * ### 路径 ID
   * 在资源地址上 tile 的存储路径
   */
  pathId: string

  /**
   * ### tile 整体在图层内的偏移量（单位：像素）
   * @default [0,0]
   */
  tilesOffset: [x: number, y: number]
}

export interface TilesetMeta {
  /** 原点坐标 */
  origin: [x: number, y: number]
}

/** TileLayer 子图层属性 */
export interface TileSublayerProps {
  byteLength: number | null
  image: ImageBitmap | null
  url: string
}

/** TileLayer 工厂函数配置 */
export interface TileLayerFactoryOptions {
  debug?: boolean
  cacheFunc?: (url: string, signal?: AbortSignal) => Promise<ImageBitmap | null>
}

export interface TilesetLayerProps {
  /** 图层数据 */
  data: ResolvedTileset | null
  /** @debug 是否显示 tile 的原始图层 */
  showTileLayer?: boolean
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
