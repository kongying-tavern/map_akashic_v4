import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { StorageKey } from '@/shared/enums/storage-key'
import { localTokenSchema } from '@/shared/schemas/token'
import type { LocalToken } from '@/shared/types/token'

export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage<LocalToken | null>(StorageKey.TOKEN, null, {
    serializer: {
      read: (raw) => {
        try {
          const parsered = localTokenSchema.parse(JSON.parse(raw))
          if (parsered.expiresAt < Date.now()) {
            localStorage.removeItem(StorageKey.TOKEN)
            return null
          }
          return parsered
        } catch {
          localStorage.removeItem(StorageKey.TOKEN)
          return null
        }
      },
      write: (value) => {
        return JSON.stringify(value)
      },
    },
  })

  return {
    token,
  }
})
