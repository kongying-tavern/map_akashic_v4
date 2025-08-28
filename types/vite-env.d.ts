/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 应用版本号 */
  readonly VITE_APP_VERSION: string
  /** 请求地址 base */
  readonly VITE_API_BASE: string
  /** 开发模式下的代理目标地址 */
  readonly VITE_API_TARGET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
