/// <reference types="vite/client" />
/// <reference types="vue-router/auto" />

interface ViteTypeOptions {
  /** 启用严格模式: 要求所有环境变量都在 `import.meta.env` 中定义 */
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 基础服务端点 */
  readonly VITE_API_BASE: string
  /** 用于渲染底图等信息的基础配置，必须提供此配置才能显示地图和相关点位数据 */
  readonly VITE_APP_CONFIG_URL: string

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
