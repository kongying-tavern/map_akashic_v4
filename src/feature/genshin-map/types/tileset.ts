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
