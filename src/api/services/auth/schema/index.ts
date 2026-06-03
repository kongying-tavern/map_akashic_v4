import * as z from 'zod'

export const loginResponseSchema = z.object({
  access_token: z.string().meta({ description: '接口 token' }),
  token_type: z.string().meta({ description: 'token 前缀' }),
  expires_in: z.int().meta({ description: '接口 token 有效时间' }),
  scope: z.string().meta({ description: '可访问范围' }),
  jti: z.string().meta({ description: "What's that mean?" }),
})
export type LoginResponse = z.infer<typeof loginResponseSchema>
