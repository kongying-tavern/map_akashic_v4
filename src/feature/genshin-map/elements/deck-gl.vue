<script lang="ts">
import type { View } from 'deck.gl'
type ViewOrViews = View | View[]
</script>

<script setup lang="ts" generic="ViewT extends ViewOrViews">
import { Deck } from 'deck.gl'

const props = defineProps<{
  views: ViewT
}>()

const canvasRef = useTemplateRef('canvasRef')
const deckRef = shallowRef<Deck<ViewT> | null>(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) {
    throw new Error('Canvas not found.')
  }
  const deck = new Deck<ViewT>({
    canvas,
    views: props.views,
  })

  let rIC = -1
  const untilReady = () => {
    if (deck.isInitialized) {
      deckRef.value = deck
      return
    }
    rIC = requestIdleCallback(untilReady)
  }
  untilReady()

  deckRef.value = deck

  const effects: { stop: () => void }[] = [
    { stop: () => cancelIdleCallback(rIC) },
    watch(
      () => props.views,
      (views) => {
        deck.setProps({ views })
      },
    ),
  ]

  onUnmounted(() => {
    effects.forEach(({ stop }) => stop())
    deck.finalize()
  })
})
</script>

<template>
  <div class="fixed w-100dvw h-100dvh overflow-hidden bg-black">
    <canvas v-bind="$attrs" ref="canvasRef" />
    <slot v-if="deckRef" name="default" :deck="deckRef" />
  </div>
</template>
