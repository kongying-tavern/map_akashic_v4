import { CompositeLayer, ScatterplotLayer } from 'deck.gl'
import type { Layer, LayersList } from 'deck.gl'
import type { MarkerThin } from '@/stores/marker'
import type { GenshinDeck } from '../../core/genshin-deck'

export interface GenshinMarkerLayerProps {
  data: MarkerThin[]
  positionOffset?: [x: number, y: number]
}

export class GenshinMarkerLayer extends CompositeLayer<GenshinMarkerLayerProps> {
  static layerName = 'GenshinMarkerLayer'

  constructor(props: GenshinMarkerLayerProps) {
    super(props)
  }

  override renderLayers(): Layer | null | LayersList {
    const [ox = 0, oy = 0] = this.props.positionOffset ?? []
    return [
      new ScatterplotLayer<MarkerThin>({
        id: 'GenshinMarkerLayer-Scatterplot',
        data: this.props.data,
        getPosition: ({ pos }) => [pos[0] + ox, pos[1] + oy],
        getFillColor: [255, 200, 0, 200],
        getRadius: 8,
        radiusMinPixels: 4,
        radiusMaxPixels: 12,
        pickable: true,
      }),
    ]
  }

  applyDeck(deck: GenshinDeck, index?: number) {
    const { layers = [] } = deck.props
    const nextLayers = [...layers]
    if (index !== undefined && index >= 0 && index <= nextLayers.length) {
      nextLayers.splice(index, 0, this)
    } else {
      nextLayers.push(this)
    }
    deck.setProps({
      layers: nextLayers,
    })
  }
}
