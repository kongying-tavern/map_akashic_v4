<script setup lang="ts">
import { deckInstanceKey } from '../../shared/injection-key'
import { ResolvedTileset } from '../../types'
import { CartesianFlyToInterpolator } from './cartesian-fly-to-interpolator'
import { GenshinTileLayer } from './genshin-tile-layer'

const props = defineProps<{
  data: ResolvedTileset
}>()

const deckRef = inject(deckInstanceKey, shallowRef(null))

let idleId: number

watch(
  () => [deckRef.value, props.data] as const,
  ([deck, config]) => {
    cancelIdleCallback(idleId)
    if (!deck) {
      return
    }

    const layer = new GenshinTileLayer(config)

    const initTarget: [number, number] = (() => {
      if (!config.settings?.center) return config.center
      const [x, y] = config.settings.center
      const [ox, oy] = config.center
      return [x + ox, y + oy]
    })()

    const renderWhenInit = () => {
      if (deck.isInitialized) {
        deck.setProps({
          controller: {
            ...deck.getViews()[0].controller,
            maxBounds: layer.props.bounds,
          },
          initialViewState: {
            zoom: config.settings?.zoom ?? -3,
            target: initTarget,
          },
          layers: [layer],
        })
        return
      }
      idleId = requestIdleCallback(renderWhenInit)
    }
    renderWhenInit()
  },
  { immediate: true },
)
</script>

<template>
  <slot />
</template>
