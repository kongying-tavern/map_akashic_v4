<script setup lang="ts">
import { computed } from 'vue'
import { getSquircleGeometry, getSquirclePath } from './utils/squircle-geometry'

defineOptions({ inheritAttrs: false })

interface SquircleProps {
  /** 矩形宽 */
  w?: number
  /** 矩形高 */
  h?: number
  /** 圆角半径 */
  r?: number
  /** 曲率指数 */
  n?: number
  /** 采样率 */
  samples?: number
  /** 填充色 */
  fill?: string
  /** 描边色 */
  stroke?: string
  /** 描边宽度 */
  strokeWidth?: number
  /** 保留精度 */
  precision?: number
}

const props = withDefaults(defineProps<SquircleProps>(), {
  w: 160,
  h: 220,
  r: 60,
  n: 5,
  samples: 16,
  fill: '#5E7CE2',
  stroke: '#000',
  strokeWidth: 1.5,
  precision: 2,
})

const squircleGeometry = computed(() => {
  return getSquircleGeometry({
    w: props.w,
    h: props.h,
    r: props.r,
    n: props.n,
    samples: props.samples,
    strokeWidth: props.strokeWidth,
    precision: props.precision,
  })
})

const path = computed(() => {
  return getSquirclePath(squircleGeometry.value)
})
</script>

<template>
  <div
    class="relative"
    :style="{ width: `${squircleGeometry.w}px`, height: `${squircleGeometry.h}px` }"
  >
    <svg
      :width="squircleGeometry.w"
      :height="squircleGeometry.h"
      :viewBox="`0 0 ${squircleGeometry.w} ${squircleGeometry.h}`"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute inset-0 z-[0] pointer-events-none"
    >
      <path
        v-if="path"
        :d="path"
        :fill="fill"
        :stroke="stroke"
        :stroke-width="squircleGeometry.strokeWidth"
        stroke-linejoin="round"
      />
    </svg>
    <div v-if="$slots.default" v-bind="$attrs" class="absolute inset-0 z-[1]">
      <slot />
    </div>
  </div>
</template>
