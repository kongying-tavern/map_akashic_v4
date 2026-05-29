<script setup lang="ts">
import GenshinMap from '@/feature/genshin-map/index.vue'
import { useConfigStore } from '@/stores'
import { useRouteQuery } from './index.query'

const query = useRouteQuery()

const configStore = useConfigStore()

const tile = computed(() => {
  // if (!query.area) {
  //   return
  // }
  return configStore.tiles.get('A:MD:XUESHAN')
})
</script>

<template>
  <GenshinMap :config="tile" />
</template>
