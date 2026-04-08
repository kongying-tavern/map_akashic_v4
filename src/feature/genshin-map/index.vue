<script setup lang="ts">
import { Deck, OrbitController, OrthographicView, OrthographicViewState } from 'deck.gl'
import { SiderToolbar } from './components'
import ZoomController from './controllers/zoom-controller.vue'
import { TilesetLayer } from './layers/tile-layer'
import { useViewStore } from './stores/view-state'
import { ResolvedTileset } from './types'

const props = defineProps<{
  config: ResolvedTileset
}>()

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

const cleanups = shallowRef<(() => void)[]>([])

const { state: viewState, onViewStateChange, syncViewStateChange } = useViewStore()

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const { config } = props
  const [initX, initY]: [number, number] = config.settings?.center ?? [0, 0]
  const initZoom = config.settings?.zoom ?? 0

  // setup view state
  const initialViewState: OrthographicViewState = {
    ...viewState,
    target: [initX + config.center[0], initY + config.center[1]],
    zoom: initZoom,
  }
  syncViewStateChange(initialViewState)

  // setup tile layer
  const tileLayer = new TilesetLayer({
    data: config,
    showBounds: true,
    showOrigin: true,
    showTileInfo: true,
  })

  // setup deck
  const deck = new Deck<OrthographicView>({
    canvas,
    views: new OrthographicView({
      controller: OrbitController,
    }),
    controller: {
      dragMode: 'pan',
      dragRotate: false,
      inertia: 500,
      scrollZoom: false,
      touchRotate: false,
    },
    initialViewState: initialViewState,
    layers: [tileLayer],
    getCursor: ({ isDragging, isHovering }) => {
      return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default'
    },
    onViewStateChange: ({ viewState: newViewState }) => {
      syncViewStateChange(newViewState)
      return {
        ...newViewState,
        minZoom: initialViewState.minZoom,
        maxZoom: initialViewState.maxZoom,
      }
    },
  })

  // setup view state change listener
  const { off: viewStateChangeOff } = onViewStateChange((newViewState) => {
    deck.setProps({
      initialViewState: newViewState,
    })
  })

  // setup cleanup
  cleanups.value.push(() => {
    viewStateChangeOff()
    deck.finalize()
  })
})

onUnmounted(() => {
  console.log('cleanup')
  cleanups.value.forEach((cleanup) => cleanup())
  cleanups.value = []
})
</script>

<template>
  <div class="w-full h-full overflow-hidden relative bg-black">
    <canvas ref="canvasRef" />

    <div class="absolute inset-0 pointer-events-none">
      <!-- <ZoomController /> -->
      <SiderToolbar />
    </div>
  </div>
</template>
