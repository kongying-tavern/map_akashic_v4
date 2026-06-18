<script setup lang="ts">
import type { Deck, OrthographicView } from 'deck.gl'
import { Fragment } from 'vue'
import { GenshinMarkerLayer } from '../layers/genshin-marker-layer'
import type { GenshinMarkerLayerProps } from '../layers/genshin-marker-layer'
import { removeLayerFrom, addLayerFrom } from '../utils'

const props = defineProps<{
  deck: Deck<OrthographicView>
  data: GenshinMarkerLayerProps
  index: number
}>()

onMounted(() => {
  let instance: GenshinMarkerLayer | null = null

  const { stop } = watch(
    () => props.data,
    (data) => {
      if (instance) {
        removeLayerFrom(props.deck, props.index, instance)
      }
      const layer = new GenshinMarkerLayer(data)
      addLayerFrom(props.deck, props.index, layer)
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
