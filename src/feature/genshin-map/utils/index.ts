import type { Deck, OrthographicView } from 'deck.gl'
import { GenshinLayer } from '../types'

export const removeLayerFrom = (
  deck: Deck<OrthographicView>,
  index: number,
  layer: GenshinLayer | null,
) => {
  if (!layer) return
  const copyLayers = [...(deck.props.layers ?? [])]
  copyLayers[index] = null
  deck.setProps({ layers: copyLayers })
}

export const addLayerFrom = (deck: Deck<OrthographicView>, index: number, layer: GenshinLayer) => {
  const copyLayers = [...(deck.props.layers ?? [])]
  copyLayers[index] = layer
  deck.setProps({ layers: copyLayers })
}
