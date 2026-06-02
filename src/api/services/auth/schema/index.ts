import * as z from 'zod'

export const loginRequestSchema = z.object({
  username: z.string().meta({ description: '账号' }),
  password: z.string().meta({ description: '密码' }),
})
export type LoginRequest = z.infer<typeof loginRequestSchema>

export const loginResponseSchema = z.object({})
export type LoginResponse = z.infer<typeof loginRequestSchema>
