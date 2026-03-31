import * as zod from 'zod'

export const envSchema = zod.object({
  // ==================== 基础配置 ====================
  VITE_APP_TITLE: zod.string().trim().min(1),
  VITE_APP_CONFIG_URL: zod.string().trim().min(1),
  VITE_API_BASE: zod.string().trim().min(1),
  VITE_TILE_ASSETS_BASE: zod.string().trim().min(1),

  // ==================== 开发配置 ====================
  VITE_APP_CONFIG_URL_PROXY: zod.string().optional().default(''),
  VITE_API_BASE_PROXY: zod.string().optional().default(''),
  VITE_API_AUTH_USERNAME: zod.string().optional().default(''),
  VITE_API_AUTH_PASSWORD: zod.string().optional().default(''),
})
