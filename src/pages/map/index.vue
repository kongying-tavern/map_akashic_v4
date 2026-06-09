<script setup lang="ts">
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
</script>

<template>
  <GenshinMap v-if="tilesetConfig" :tileset="tilesetConfig" />
</template>
