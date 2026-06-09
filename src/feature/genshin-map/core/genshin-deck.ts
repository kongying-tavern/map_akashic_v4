import { Deck } from 'deck.gl'
import type { DeckProps, OrthographicView } from 'deck.gl'

export class GenshinDeck extends Deck<OrthographicView> {}
export interface GenshinDeckProps extends DeckProps<OrthographicView> {}
