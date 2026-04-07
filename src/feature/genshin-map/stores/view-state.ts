import { createEventHook } from '@vueuse/core'
import type { OrthographicViewState } from 'deck.gl'
import { defineStore } from 'pinia'

export const useViewStore = defineStore('map-view', () => {
  const state = shallowRef<OrthographicViewState>({
    minZoom: -3,
    maxZoom: 0,
    target: [0, 0] as [x: number, y: number],
    zoom: 0,
  })

  const eventhook = createEventHook<Partial<OrthographicViewState>>()

  const onViewStateChange = (callback: (newState: OrthographicViewState) => void) => {
    return eventhook.on(callback)
  }

  const syncViewStateChange = (newState: Partial<OrthographicViewState>) => {
    state.value = {
      ...state.value,
      ...newState,
    }
  }

  const setState = (newState: Partial<OrthographicViewState>) => {
    eventhook.trigger({
      ...state.value,
      ...newState,
    })
  }

  return {
    /** 提供给响应式系统的当前视图状态 */
    state: computed(() => state.value),
    /** 由 vue 响应式系统触发的视图变化 */
    setState,
    /** 由地图负责响应的视图变化 */
    onViewStateChange,
    /** 从地图系统同步到 vue 响应式系统的视图变化 */
    syncViewStateChange,
  }
})
