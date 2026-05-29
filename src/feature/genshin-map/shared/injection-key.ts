import { Deck, OrthographicView } from 'deck.gl'
import { InjectionKey } from 'vue'

export const deckInstanceKey = Symbol('deck-instance') as InjectionKey<
  ShallowRef<Deck<OrthographicView> | null>
>
