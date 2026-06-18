<script setup lang="ts">
import { OrthographicView } from 'deck.gl'
import DeckGl from './elements/deck-gl.vue'
import MarkerLayer from './elements/marker-layer.vue'
import TileLayer from './elements/tile-layer.vue'
import type { ResolvedTileset } from './types'

defineProps<{
  tileset: ResolvedTileset
}>()

const view = new OrthographicView()
</script>

<template>
  <DeckGl :views="view" v-slot="{ deck }">
    <TileLayer :deck="deck" :index="0" :data="tileset" />
    <MarkerLayer :deck="deck" :index="1" :data="{ data: [] }" />
  </DeckGl>
</template>
