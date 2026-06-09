<script setup lang="ts">
import { ref } from 'vue'
import ChromaHueCanvas from './components/ChromaHueCanvas.vue'
import HexDisplay from './components/HexDisplay.vue'
import LightnessSlider from './components/LightnessSlider.vue'
import { useChromaHueCanvas } from './hooks/useChromaHueCanvas'
import { useLightnessSlider } from './hooks/useLightnessSlider'
import { useOklchHex } from './hooks/useOklchHex'

const SIZE = 180

// 核心状态
const l = defineModel<number>('l', { default: 0.6 })
const c = defineModel<number>('c', { default: 0.1 })
const h = defineModel<number>('h', { default: 48 })

// 子组件模板 ref
const chromaCanvasComp = ref<InstanceType<typeof ChromaHueCanvas>>()
const lSliderComp = ref<InstanceType<typeof LightnessSlider>>()

// Canvas 相关逻辑
const { thumbLeft, thumbTop, onCanvasDown, onCanvasMove, onCanvasUp } = useChromaHueCanvas(
  chromaCanvasComp,
  l,
  c,
  h,
  SIZE,
)

// L 滑块相关逻辑
const { lThumbTop, lGradient, onLDown, onLMove, onLUp } = useLightnessSlider(lSliderComp, l, c, h)

// Hex 双向桥接
const { hex } = useOklchHex(l, c, h)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-1.5">
      <!-- C × H 色域画布 -->
      <ChromaHueCanvas
        ref="chromaCanvasComp"
        :thumb-left="thumbLeft"
        :thumb-top="thumbTop"
        :size="SIZE"
        @pointerdown="onCanvasDown"
        @pointermove="onCanvasMove"
        @pointerup="onCanvasUp"
        @pointercancel="onCanvasUp"
      />

      <!-- 亮度 (L) 滑块 -->
      <LightnessSlider
        ref="lSliderComp"
        :l-thumb-top="lThumbTop"
        :l-gradient="lGradient"
        :size="SIZE"
        @pointerdown="onLDown"
        @pointermove="onLMove"
        @pointerup="onLUp"
        @pointercancel="onLUp"
      />
    </div>

    <!-- Hex 输入 + 数值显示 -->
    <HexDisplay :hex="hex" :l="l" :c="c" :h="h" @update:hex="hex = $event" />
  </div>
</template>
