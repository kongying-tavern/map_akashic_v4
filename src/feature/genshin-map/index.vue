<script setup lang="ts">
import { SiderToolbar } from './components'
import ZoomController from './controllers/zoom-controller.vue'
import DeckGl from './deck-gl.vue'
import GenshinTileLayer from './layers/genshin-tile-layer/index.vue'
import { ResolvedTileset } from './types'

const props = defineProps<{
  config?: ResolvedTileset
}>()
</script>

<template>
  <deck-gl>
    <genshin-tile-layer v-if="props.config" :data="props.config" />

    <div class="absolute inset-0 pointer-events-none">
      <zoom-controller />
      <sider-toolbar />
    </div>
  </deck-gl>
</template>
