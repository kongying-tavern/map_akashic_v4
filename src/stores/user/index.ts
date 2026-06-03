import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import * as z from 'zod'
import { type LoginResponse, loginResponseSchema } from '@/api/services/auth/schema'
import { StorageKey } from '@/shared/enums/storage-key'

const localTokenSchema = loginResponseSchema.extend({
  expirationTime: z.number().meta({ description: '过期时间' }),
})
type LocalToken = z.infer<typeof localTokenSchema>

const DELAY_TIME = 30 * 1000

export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage<LocalToken | null>(StorageKey.TOKEN, null, {
    serializer: {
      read: (raw) => {
        const { data, error } = localTokenSchema.safeParse(JSON.parse(raw))
        if (error || !data) return null
        return data
      },
      write: (value) => {
        if (!value) {
          return ''
        }
        return JSON.stringify(value)
      },
    },
  })

  const setToken = (res: LoginResponse) => {
    const now = Date.now()
    const expirationTime = now + res.expires_in * 1000 - DELAY_TIME
    token.value = {
      ...res,
      expirationTime,
    }
  }

  const isTokenValid = () => {
    if (!token.value) {
      return false
    }
    if (token.value.expirationTime <= Date.now()) {
      return false
    }
    return token.value
  }

  return {
    token,
    setToken,
    isTokenValid,
  }
})
