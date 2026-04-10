import { useUrlSearchParams } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useUrlSearchStore = defineStore('url-search', () => {
  const params = useUrlSearchParams('history')

  const locale = computed<I18nType.Locale>({
    get: () => {
      return (
        typeof params.locale !== 'string' ? 'zh-CN' : params.locale || 'zh-CN'
      ) as I18nType.Locale
    },
    set: (value) => {
      params.locale = value ?? ''
    },
  })

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
