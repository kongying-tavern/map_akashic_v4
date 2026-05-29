import { useLocalStorage, useUrlSearchParams } from '@vueuse/core'
import { defineStore } from 'pinia'
import { StorageKey } from '@/shared/enums/storage-key'

export const useUrlSearchStore = defineStore('url-search', () => {
  const params = useUrlSearchParams('history')

  const locale = useLocalStorage<I18nType.Locale>(StorageKey.LOCALE, 'zh')

  const sider = computed<string | null>({
    get: () => {
      return (typeof params.sider !== 'string' ? null : params.sider) as string | null
    },
    set: (value) => {
      params.sider = value ?? ''
    },
  })

  const collapsed = computed<boolean>({
    get: () => {
      return (typeof params.collapsed !== 'string' ? false : params.collapsed === '1') as boolean
    },
    set: (value) => {
      params.collapsed = value ? '1' : '0'
    },
  })

  return {
    locale,
    sider,
    collapsed,
  }
})
