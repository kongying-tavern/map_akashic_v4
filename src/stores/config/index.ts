import { defineStore } from 'pinia'
import type { MapConfig } from '@/api'
import { config as configApi } from '@/api'
import type { ResolvedTileset } from '@/feature/genshin-map/types'
import { parseTilesConfigs } from './merge'

/**
 * 应用前置配置
 */
export const useConfigStore = defineStore('config', () => {
  const config = shallowRef<MapConfig>({})

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
    const res = await configApi.getDadianJson()
    if (!res) {
      throw new Error('Failed to load config')
    }
    config.value = res
    return res
  }

  return {
    config: computed(() => config.value),
    tiles,
    loadConfig,
  }
})
