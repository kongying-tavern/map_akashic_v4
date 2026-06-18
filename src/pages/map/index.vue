<script setup lang="ts">
import { MapError, MapLoading } from '@/feature/genshin-map/components'
import GenshinMap from '@/feature/genshin-map/index.vue'
import { useConfigStore } from '@/stores'
import { useRouteQuery } from './index.query'

const query = useRouteQuery()

const configStore = useConfigStore()

const tilesetConfig = computed(() => {
  if (!query.value.area) {
    return configStore.tiles.get('A:MD:MENGDE')
  }
  return configStore.tiles.get(query.value.area)
})

const handleRetry = () => {
  configStore.loadConfig()
}
</script>

<template>
  <MapLoading v-if="configStore.loading" />
  <MapError
    v-else-if="configStore.error"
    :message="configStore.error.message"
    @retry="handleRetry"
  />
  <GenshinMap v-else-if="tilesetConfig" :tileset="tilesetConfig" />
</template>
