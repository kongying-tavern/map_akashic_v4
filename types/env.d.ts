/// <reference types="vite/client" />
/// <reference types="vue-router/auto" />

interface ViteTypeOptions {
  /** 启用严格模式: 要求所有环境变量都在 `import.meta.env` 中定义 */
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  /** 基础 URL */
  readonly BASE_URL: string
  /** 是否为开发环境 */
  readonly DEV: boolean
  /** 环境模式 */
  readonly MODE: string
  /** 是否为生产环境 */
  readonly PROD: boolean
  /** 是否为 SSR 环境 */
  readonly SSR: boolean

  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 基础服务端点 */
  readonly VITE_API_BASE: string
  /** 订阅配置地址 */
  readonly VITE_APP_CONFIG_URL: string
  /** 底图资源地址 */
  readonly VITE_TILE_ASSETS_BASE: string

  /** 基础配置端点代理 */
  readonly VITE_APP_CONFIG_URL_PROXY: string
  /**  基础服务端点代理 */
  readonly VITE_API_BASE_PROXY: string
  /** 基础验证用户名 */
  readonly VITE_API_AUTH_USERNAME: string
  /** 基础验证口令 */
  readonly VITE_API_AUTH_PASSWORD: string
}

interface ImportMeta {
  /** 环境变量 */
  readonly env: ImportMetaEnv
}
