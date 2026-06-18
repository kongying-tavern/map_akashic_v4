<script setup lang="ts">
import type { Deck, OrthographicView } from 'deck.gl'
import { Fragment } from 'vue'
import { GenshinTileLayer } from '../layers/genshin-tile-layer'
import type { ResolvedTileset } from '../types'
import { removeLayerFrom, addLayerFrom } from '../utils'

const props = defineProps<{
  deck: Deck<OrthographicView>
  data: ResolvedTileset
  index: number
}>()

onMounted(() => {
  let instance: GenshinTileLayer | null = null

  const { stop } = watch(
    () => props.data,
    (data) => {
      if (instance) {
        removeLayerFrom(props.deck, props.index, instance)
      }
      const layer = new GenshinTileLayer(data)
      addLayerFrom(props.deck, props.index, layer)
      layer.applyDeck(props.deck)
      instance = layer
    },
    { immediate: true },
  )

  onUnmounted(() => {
    stop()
    if (instance) {
      removeLayerFrom(props.deck, props.index, instance)
    }
  })
})
</script>

<template>
  <Fragment />
</template>
