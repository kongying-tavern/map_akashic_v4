import { OrthographicView } from 'deck.gl'
import type { OrthographicViewState } from 'deck.gl'
import { GenshinDeck, type GenshinDeckProps } from '../core/genshin-deck'
import { GenshinTileLayer } from '../layers/genshin-tile-layer'
import type { ResolvedTileset } from '../types'

export interface GenshinMapProps {
  tileset: ResolvedTileset
}

const createGenshinDeck = (
  canvas: HTMLCanvasElement,
  inject: Partial<Omit<GenshinDeckProps, 'views' | 'canvas'>> = {},
) => {
  return new GenshinDeck({
    views: new OrthographicView(),
    canvas,
    ...inject,
  })
}

export const useGenshinDeck = (
  canvasRef: ShallowRef<HTMLCanvasElement | null>,
  props: GenshinMapProps,
) => {
  const deckRef = shallowRef<GenshinDeck | null>(null)

  const readonlyViewState = shallowRef<OrthographicViewState>({
    zoom: -3,
    target: [0, 0],
  })

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) throw new Error('Canvas Element does not mounted')
    const deck = createGenshinDeck(canvas, {
      onViewStateChange: ({ viewState }) => {
        readonlyViewState.value = viewState
      },
    })
    deckRef.value = deck
  })

  // tile layer watcher
  watch(
    () => [deckRef.value, props.tileset] as const,
    ([deck, tileset]) => {
      if (!deck) return
      const layer = new GenshinTileLayer(tileset)
      layer.applyDeck(deck, readonlyViewState.value)
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (!deckRef.value) return
    deckRef.value.finalize()
    deckRef.value = null
  })
}
