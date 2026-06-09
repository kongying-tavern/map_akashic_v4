<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  thumbLeft: string
  thumbTop: string
  size: number
}>()

defineEmits<{
  pointerdown: [e: PointerEvent]
  pointermove: [e: PointerEvent]
  pointerup: []
  pointercancel: []
}>()

const canvasRef = ref<HTMLCanvasElement>()

defineExpose({ canvasRef })
</script>

<template>
  <div
    class="relative select-none overflow-hidden rounded ring-1 ring-neutral-300 dark:ring-neutral-600"
    :style="{ width: size + 'px', height: size + 'px' }"
    style="touch-action: none"
  >
    <canvas
      ref="canvasRef"
      class="absolute inset-0 h-full w-full cursor-crosshair"
      @pointerdown="$emit('pointerdown', $event)"
      @pointermove="$emit('pointermove', $event)"
      @pointerup="$emit('pointerup')"
      @pointercancel="$emit('pointercancel')"
    />
    <!-- 选中点 -->
    <div
      class="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.35),0_0_3px_rgba(0,0,0,0.2)]"
      :style="{ left: thumbLeft, top: thumbTop }"
    />
  </div>
</template>
