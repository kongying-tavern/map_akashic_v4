import { useRequest } from 'alova/client'
import { defineStore } from 'pinia'
import Api from '@/api'
import type { ResolvedTileset } from '@/feature/genshin-map/types'
import { parseTilesConfigs } from './merge'

/**
 * 应用前置配置
 */
export const useConfigStore = defineStore('config', () => {
  const {
    data: config,
    loading,
    error,
    send,
  } = useRequest(Api.config.getAppConfig(), {
    initialData: () => ({}),
  })

  const tiles = computed(() => {
    try {
      return parseTilesConfigs(config.value).reduce(
        (map, item) => map.set(item.id, item),
        new Map<string, ResolvedTileset>(),
      )
    } catch (error) {
      console.error(error)
      return new Map()
    }
  })

  const loadConfig = async () => {
    await send()
  }

  return {
    config: computed(() => config.value),
    loading,
    error,
    tiles,
    loadConfig,
  }
})
