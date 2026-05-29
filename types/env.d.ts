interface ViteTypeOptions {
  /** 启用严格模式: 要求所有环境变量都在 `import.meta.env` 中定义 */
  strictImportMetaEnv: unknown
}

interface ImportMeta {
  /** 环境变量 */
  readonly env: ImportMetaEnv
}

type _Env = import('../envs/schema').Env

interface ImportMetaEnv extends _Env {}
