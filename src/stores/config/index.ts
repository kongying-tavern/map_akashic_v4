import type { UnwrapedTileConfig } from './merge'
import type { DadianConfig } from '@/api'
import { defineStore } from 'pinia'
import { config as configApi } from '@/api'
import { DadianConfigSchema } from '@/utils'
import { parseTilesConfigs } from './merge'

export type { UnwrapedTileConfig } from './merge'

/**
 * 应用前置配置
 */
export const useConfigStore = defineStore('config', () => {
  const config = shallowRef<DadianConfig>({})

  const tiles = computed(() => parseTilesConfigs(config.value)
    .reduce((map, item) => map.set(item.id, item), new Map<string, UnwrapedTileConfig>()),
  )

  const loadConfig = async () => {
    const res = await configApi.getDadianJson()
    if (!res)
      throw new Error('Failed to load config')
    await DadianConfigSchema.parseAsync(res)
    config.value = res
    return res
  }

  return {
    config: computed(() => config.value),
    tiles,
    loadConfig,
  }
})
