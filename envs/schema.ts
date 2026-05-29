import * as z from 'zod'

export const envSchema = z.object({
  // 基础配置
  VITE_APP_TITLE: z.string().trim().min(1, '应用标题不能为空').meta({ description: '应用标题' }),

  // 主服务
  VITE_SERVICE_MAIN_URL: z
    .string()
    .trim()
    .min(1, '主服务 URL 不能为空')
    .meta({ description: '主服务URL' }),
  VITE_SERVICE_MAIN_BASIC_AUTH: z
    .string()
    .trim()
    .regex(/^[\w-]+:[\w-]+$/, '需符合格式 username:password')
    .meta({ description: '主服务 Basic 认证' }),
  VITE_SERVICE_MAIN_PROXY: z.string().optional().meta({ description: '主服务代理URL' }),
  VITE_SERVICE_MAIN_OPENAPI_URL: z.string().optional().meta({ description: '主服务 OpenAPI URL' }),

  // 配置服务
  VITE_SERVICE_CONFIG_URL: z
    .string()
    .trim()
    .min(1, '配置服务 URL 不能为空')
    .meta({ description: '配置服务URL' }),
  VITE_SERVICE_CONFIG_PROXY: z.string().optional().meta({ description: '配置服务代理URL' }),

  // 资源服务
  VITE_SERVICE_RESOURCE_URL: z
    .string()
    .trim()
    .min(1, '资源服务 URL 不能为空')
    .meta({ description: '资源服务URL' }),
  VITE_SERVICE_RESOURCE_PROXY: z.string().optional().meta({ description: '资源服务代理URL' }),
})

export type Env = z.infer<typeof envSchema>
