<script setup lang="ts">
import { Deck, OrbitController, OrthographicView, OrthographicViewState } from 'deck.gl'
import { TilesetLayer } from './layers/tile-layer'
import { ResolvedTileset } from './types'

const props = defineProps<{
  config: ResolvedTileset
}>()

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

const deckRef = shallowRef<Deck<OrthographicView>>()

const injectViewState = shallowRef<OrthographicViewState>({
  // minZoom: -3,
  // maxZoom: 0,
})

/** 仅用于 UI 反馈，不能通过修改此值来实现视图变化 */
const readonlyViewState = shallowRef<OrthographicViewState>({
  ...injectViewState.value,
  target: [0, 0],
  zoom: 0,
})

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const { config } = props

  const tileLayer = new TilesetLayer({
    data: config,
    showBounds: true,
    showOrigin: true,
    showTileInfo: true,
  })

  const [initX, initY]: [number, number] = config.settings?.center ?? [0, 0]
  const initZoom = config.settings?.zoom ?? 0

  const initialViewState: OrthographicViewState = {
    ...injectViewState.value,
    target: [initX + config.center[0], initY + config.center[1]],
    zoom: initZoom,
  }
  readonlyViewState.value = initialViewState

  const deck = new Deck<OrthographicView>({
    canvas,
    views: new OrthographicView({
      controller: OrbitController,
    }),
    controller: {
      dragMode: 'pan',
      dragRotate: false,
    },
    initialViewState: initialViewState,
    layers: [tileLayer],
    onViewStateChange: ({ viewState: newState }) => {
      readonlyViewState.value = newState
      return {
        ...injectViewState.value,
        ...newState,
      }
    },
  })

  deckRef.value = deck
})

onUnmounted(() => {
  const deck = deckRef.value
  if (!deck) return
  deck.finalize()
})
</script>

<template>
  <div class="relative w-full h-full overflow-hidden relative bg-black">
    <canvas ref="canvasRef" />

    <div class="absolute left-4 top-4 text-sm text-white pointer-events-none">
      <pre>{{ JSON.stringify($props.config, null, 2) }}</pre>
    </div>

    <div class="absolute right-4 top-4 text-sm text-white pointer-events-none">
      <pre>{{ JSON.stringify(readonlyViewState, null, 2) }}</pre>
    </div>
  </div>
</template>
