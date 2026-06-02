<script setup lang="ts">
import {
  Deck,
  LinearInterpolator,
  OrthographicController,
  OrthographicView,
  type OrthographicViewState,
} from 'deck.gl'
import { deckCanvasKey, deckInstanceKey } from './shared/injection-key'

const props = defineProps<{
  /** 更改这个值触发视口状态的自动插值变化 */
  nextViewState?: unknown
}>()

const emits = defineEmits<{
  viewStateChange: [state: OrthographicViewState, oldState?: OrthographicViewState]
}>()

/** deck canvas */
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
provide(deckCanvasKey, canvasRef)

/** deck instance */
const deckInstanceRef = shallowRef<Deck<OrthographicView> | null>(null)
provide(deckInstanceKey, deckInstanceRef)

onMounted(() => {
  const canvas = canvasRef.value!

  const deck = new Deck<OrthographicView>({
    canvas,
    views: new OrthographicView({
      controller: OrthographicController,
    }),
    controller: {
      dragMode: 'pan',
      dragRotate: false,
      inertia: 500,
      scrollZoom: true,
      touchRotate: false,
    },
    initialViewState: {
      target: [0, 0],
      zoom: -3,
    },
    getCursor: ({ isDragging, isHovering }) => {
      return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default'
    },
    onViewStateChange: ({ oldViewState, viewState: newViewState }) => {
      emits('viewStateChange', newViewState, oldViewState)
      return newViewState
    },
  })
  Reflect.set(globalThis, 'deck', deck)

  deckInstanceRef.value = deck

  onUnmounted(() => {
    Reflect.set(globalThis, 'deck', null)
    deck.finalize()
    deckInstanceRef.value = null
  })
})
</script>

<template>
  <div class="w-full h-full overflow-hidden relative bg-black">
    <canvas ref="canvasRef" />
    <slot />
  </div>
</template>
