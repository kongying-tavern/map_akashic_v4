import type { infer as ZodInfer } from 'zod'
import { localTokenSchema } from '../schemas/token'

export type LocalToken = ZodInfer<typeof localTokenSchema>
