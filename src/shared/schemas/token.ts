import * as z from 'zod'

/** 存储在本地的 token 对象的格式 */
export const localTokenSchema = z
  .object({
    accessToken: z.string().describe('访问令牌'),
    refreshToken: z.string().describe('刷新令牌'),
    tokenType: z.string().describe('令牌类型'),
    version: z.literal(1).describe('版本号'),
    expiresAt: z.number().describe('过期时间戳'),
  })
  .describe('存储在本地的 token 对象的格式')
