<script setup lang="ts">
import { useRoute } from 'vue-router'
import GenshinMap from '@/feature/genshin-map/index.vue'
import { useConfigStore } from '@/stores'

const route = useRoute('/map/[id]')
const configStore = useConfigStore()

const tile = computed(() => {
  const id = route.params.id
  return configStore.tiles.get(id)
})
</script>

<template>
  <div v-if="!tile">
    Tile not found
  </div>
  <GenshinMap v-else :config="tile" />
</template>
