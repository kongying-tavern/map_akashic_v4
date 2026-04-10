import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import * as API from '@/api/globals'
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

  const info = shallowRef<API.SysUserVo | null>(null)

  return {
    /** 鉴权令牌 */
    token: computed(() => token.value),
    /** 用户信息 */
    info: computed(() => info.value),
  }
})
