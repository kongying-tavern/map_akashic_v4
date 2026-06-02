<script setup lang="ts">
import { deckInstanceKey } from '../../shared/injection-key'
import { ResolvedTileset } from '../../types'
import { GenshinTileLayer } from './genshin-tile-layer'

const props = defineProps<{
  data: ResolvedTileset
}>()

const deckRef = inject(deckInstanceKey, shallowRef(null))

watch(
  () => [deckRef.value, props.data] as const,
  ([deck, config]) => {
    if (!deck) {
      return
    }
    const layer = new GenshinTileLayer(config)
    deck.setProps({
      controller: {
        ...deck.getViews()[0].controller,
        maxBounds: layer.props.bounds,
      },
      initialViewState: {
        zoom: -3,
        target: layer.props.data.center,
      },
      layers: [layer],
    })
  },
  { immediate: true },
)
</script>

<template>
  <slot />
</template>
