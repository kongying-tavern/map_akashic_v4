<script lang="ts">
export interface MarkerLayerProps {
  deck: Deck<OrthographicView>
  data: GenshinMarkerLayerProps['data']
  positionOffset?: GenshinMarkerLayerProps['positionOffset']
  index: number
}
</script>

<script setup lang="ts">
import type { Deck, OrthographicView } from 'deck.gl'
import { Fragment } from 'vue'
import { GenshinMarkerLayer } from '../layers/genshin-marker-layer'
import type { GenshinMarkerLayerProps } from '../layers/genshin-marker-layer'
import { removeLayerFrom, addLayerFrom } from '../utils'

const props = defineProps<MarkerLayerProps>()

const emits = defineEmits<{
  click: [info: MarkerLayerProps['data'][number]]
  hover: [info: MarkerLayerProps['data'][number]]
  drag: [info: MarkerLayerProps['data'][number]]
  dragEnd: [info: MarkerLayerProps['data'][number]]
  dragStart: [info: MarkerLayerProps['data'][number]]
}>()

onMounted(() => {
  let instance: GenshinMarkerLayer | null = null

  const { stop } = watchEffect(() => {
    const { deck, data, index, positionOffset } = props
    const layer = new GenshinMarkerLayer({
      data,
      positionOffset,
      onClick: (info, event) => {
        if (!info.layer || !info.object) return
        console.log({ info, event })
        emits('click', info.object)
      },
      onHover: (info) => {
        if (!info.layer || !info.object) return
        emits('hover', info.object)
      },
      onDrag: (info) => {
        if (!info.layer || !info.object) return
        emits('drag', info.object)
      },
      onDragEnd: (info) => {
        if (!info.layer || !info.object) return
        emits('dragEnd', info.object)
      },
      onDragStart: (info) => {
        if (!info.layer || !info.object) return
        emits('dragStart', info.object)
      },
    })
    addLayerFrom(deck, index, layer)
    instance = layer
  })

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
