import type { DadianConfig } from '@/api'
import { defineStore } from 'pinia'
import { config as configApi } from '@/api'

/**
 * 应用前置配置
 */
export const useConfigStore = defineStore('config', () => {
  const config = shallowRef<DadianConfig>({})

  const loadConfig = async () => {
    const res = await configApi.getDadianJson()
    if (!res)
      throw new Error('Failed to load config')
    config.value = res
    return res
  }

  return {
    config: computed(() => config.value),
    loadConfig,
  }
})
