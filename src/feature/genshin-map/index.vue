<script setup lang="ts">
import { Deck, OrthographicController, OrthographicView, type OrthographicViewState } from 'deck.gl'
import { SiderToolbar } from './components'
import ZoomController from './controllers/zoom-controller.vue'
import { TilesetLayer } from './layers/tile-layer'
import { deckInstanceKey } from './shared/injection-key'
import { useViewStore } from './stores/view-state'
import { ResolvedTileset } from './types'

const props = defineProps<{
  config?: ResolvedTileset
}>()

const viewStore = useViewStore()

const deckInstanceRef = shallowRef<Deck<OrthographicView> | null>(null)
provide(deckInstanceKey, deckInstanceRef)

const initialViewState = computed(() => {
  if (!props.config) return null
  const { config } = props
  const [initX, initY]: [number, number] = config.settings?.center ?? [0, 0]
  const initZoom = config.settings?.zoom ?? 0
  return {
    target: [initX + config.center[0], initY + config.center[1]],
    zoom: initZoom,
  } as OrthographicViewState
})

const tilesetLayer = computed(() => {
  if (!props.config) return null
  return new TilesetLayer({
    data: props.config,
    showTileLayer: true,
    showBounds: true,
    showOrigin: true,
    showTileInfo: true,
  })
})

const layers = computed(() => [tilesetLayer.value])

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')
onMounted(() => {
  const canvas = canvasRef.value!

  const cleanups: (() => void)[] = []

  const deck = new Deck<OrthographicView>({
    canvas,
    views: new OrthographicView({
      controller: OrthographicController,
    }),
    controller: {
      dragMode: 'pan',
      dragRotate: false,
      inertia: 500,
      scrollZoom: false,
      touchRotate: false,
    },
    initialViewState: viewStore.state,
    getCursor: ({ isDragging, isHovering }) => {
      return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default'
    },
    onViewStateChange: ({ viewState: newViewState }) => {
      viewStore.syncViewStateChange(newViewState)
      return newViewState
    },
  })
  deckInstanceRef.value = deck
  console.log('[deck] init')

  const { off: viewStateChangeOff } = viewStore.onViewStateChange((newViewState) => {
    deck.setProps({
      initialViewState: newViewState,
    })
  })

  cleanups.push(() => {
    viewStateChangeOff()
    deck.finalize()
    deckInstanceRef.value = null
  })

  onUnmounted(() => {
    console.log('[deck] destory')
    cleanups.forEach((cleanup) => cleanup())
  })
})

watch(
  () => [deckInstanceRef.value, layers.value] as const,
  ([deck, layerList]) => {
    if (!deck) {
      return
    }
    deck.setProps({
      layers: layerList,
    })
  },
  { immediate: true },
)

watch(
  () => [deckInstanceRef.value, initialViewState.value] as const,
  ([deck, viewState]) => {
    if (!deck || !viewState) {
      return
    }
    viewStore.setState(viewState)
  },
)
</script>

<template>
  <div class="w-full h-full overflow-hidden relative bg-black">
    <canvas ref="canvasRef" class="w-full h-full" />

    <div class="absolute inset-0 pointer-events-none">
      <ZoomController />
      <SiderToolbar />
    </div>
  </div>
</template>
