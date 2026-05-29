import 'alova'
import type { ZodType } from 'zod'

declare module 'alova' {
  export interface AlovaCustomTypes {
    meta: {
      responseSchema?: ZodType
    }
  }
}
