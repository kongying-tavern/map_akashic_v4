<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  lThumbTop: string
  lGradient: string
  size: number
}>()

defineEmits<{
  pointerdown: [e: PointerEvent]
  pointermove: [e: PointerEvent]
  pointerup: []
  pointercancel: []
}>()

const lTrackRef = ref<HTMLElement>()

defineExpose({ lTrackRef })
</script>

<template>
  <div
    ref="lTrackRef"
    class="relative w-4 select-none cursor-pointer rounded ring-1 ring-neutral-300 dark:ring-neutral-600"
    :style="{ background: lGradient, height: size + 'px' }"
    style="touch-action: none"
    @pointerdown="$emit('pointerdown', $event)"
    @pointermove="$emit('pointermove', $event)"
    @pointerup="$emit('pointerup')"
    @pointercancel="$emit('pointercancel')"
  >
    <div
      class="pointer-events-none absolute left-1/2 h-3 w-5 -translate-x-1/2 -translate-y-1/2 rounded-sm border-[2px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
      :style="{ top: lThumbTop }"
    />
  </div>
</template>
