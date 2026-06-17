import { OrthographicView } from 'deck.gl'
import type { OrthographicViewState } from 'deck.gl'
import { useMarkerStore } from '@/stores'
import { GenshinDeck, type GenshinDeckProps } from '../core/genshin-deck'
import { GenshinMarkerLayer } from '../layers/genshin-marker-layer'
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
  const markerStore = useMarkerStore()

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

  // marker layer watcher
  watch(
    () => [deckRef.value, props.tileset, markerStore.indexList] as const,
    ([deck, tileset, markers]) => {
      if (!deck || !tileset || !markers.length) return
      const [ox, oy] = tileset.center
      const layer = new GenshinMarkerLayer({
        data: markers,
        positionOffset: [ox, oy],
      })
      layer.applyDeck(deck)
    },
  )

  onUnmounted(() => {
    if (!deckRef.value) return
    deckRef.value.finalize()
    deckRef.value = null
  })
}
