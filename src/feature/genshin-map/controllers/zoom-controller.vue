<script setup lang="ts">
import { GSquircle } from '@/ui/g-shape'
import { useViewStore } from '../stores/view-state'

const viewStore = useViewStore()

const zoom = computed(() => {
  if (typeof viewStore.state.zoom !== 'number') {
    return 0
  }
  return viewStore.state.zoom
})

const handleZoomIn = () => {
  viewStore.setState({
    zoom: zoom.value + 1,
    transitionDuration: 1000,
    transitionEasing: (t) => 1 - (1 - t) ** 5,
  })
}

const handleZoomOut = () => {
  viewStore.setState({
    zoom: zoom.value - 1,
    transitionDuration: 1000,
    transitionEasing: (t) => 1 - (1 - t) ** 5,
  })
}
</script>

<template>
  <GSquircle
    :w="4 * 32"
    :h="4 * 8"
    :stroke-width="2"
    fill="hsl(228, 17%, 30%)"
    stroke="#FFFFFF40"
    class="absolute bottom-2 right-2 w-32 h-8 pointer-events-auto text-white"
  >
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden flex">
      <div
        class="h-full w-8 grid place-content-center select-none cursor-pointer hover:bg-#FFFFFF60 active:bg-#FFFFFF20"
        @click="handleZoomIn"
      >
        +
      </div>
      <div class="h-full w-16 grid place-content-center select-none text-xs">
        {{ `${zoom.toFixed(2)}` }}
      </div>
      <div
        class="h-full w-8 grid place-content-center select-none cursor-pointer hover:bg-#FFFFFF60 active:bg-#FFFFFF20"
        @click="handleZoomOut"
      >
        -
      </div>
    </div>
  </GSquircle>
</template>
