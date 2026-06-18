import type { Layer } from 'deck.gl'
import type { GenshinDeck } from '../core/genshin-deck'

export interface GenshinLayer extends Layer {
  applyDeck?: (deck: GenshinDeck) => void
}
