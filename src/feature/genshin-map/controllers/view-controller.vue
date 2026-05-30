<script setup lang="ts">
import { LinearInterpolator, TRANSITION_EVENTS } from 'deck.gl'
import { useEventListener } from '@vueuse/core'
import { GSquircle } from '@/ui/g-shape'
import { useViewStore } from '../stores/view-state'
import { useGenshinMap } from '../hooks/use-genshin-map'

const props = withDefaults(defineProps<{
  /** 缩放按钮的过渡时长 (ms) */
  zoomDuration?: number
  /** 滚轮缩放的过渡时长 (ms) */
  wheelZoomDuration?: number
  /** 拖拽惯性时长 (ms)，0 表示禁用 */
  dragInertia?: number
  /** 速度采样窗口 (ms) */
  inertiaSampleWindow?: number
  /** 触发惯性的最小速度 (px/ms) */
  inertiaMinVelocity?: number
}>(), {
  zoomDuration: 1000,
  wheelZoomDuration: 500,
  dragInertia: 500,
  inertiaSampleWindow: 60,
  inertiaMinVelocity: 1,
})

const viewStore = useViewStore()
const { deckRef, deckContainerRef } = useGenshinMap()

const zoom = computed(() => {
  if (typeof viewStore.state.zoom !== 'number')
    return 0
  return viewStore.state.zoom
})

const interpolator = new LinearInterpolator({
  transitionProps: {
    compare: ['target', 'zoom'],
    extract: ['target', 'zoom'],
    required: ['target', 'zoom'],
  },
})

const easeOutQuint = (t: number) => 1 - (1 - t) ** 5

const applyZoom = (
  deltaZoom: number,
  duration: number,
  anchor?: { x: number, y: number },
) => {
  const z0 = zoom.value
  const z1 = Math.max(
    viewStore.state.minZoom ?? -Infinity,
    Math.min(viewStore.state.maxZoom ?? Infinity, z0 + deltaZoom),
  )
  if (z1 === z0)
    return

  const t0 = (viewStore.state.target ?? [0, 0]) as [number, number]
  let nextTarget: [number, number] = [t0[0], t0[1]]

  if (anchor) {
    const deck = deckRef.value
    const viewport = deck?.getViewports?.()?.[0]
    if (viewport) {
      const [wx, wy] = viewport.unproject([anchor.x, anchor.y]) as [number, number]
      const scale = 2 ** (z0 - z1)
      nextTarget = [wx + (t0[0] - wx) * scale, wy + (t0[1] - wy) * scale]
    }
  }

  viewStore.setState({
    zoom: z1,
    target: nextTarget,
    transitionDuration: duration,
    transitionEasing: easeOutQuint,
    transitionInterpolator: interpolator,
    transitionInterruption: TRANSITION_EVENTS.BREAK,
  })
}

const handleZoomIn = () => applyZoom(1, props.zoomDuration)
const handleZoomOut = () => applyZoom(-1, props.zoomDuration)

useEventListener(deckContainerRef, 'wheel', (ev: WheelEvent) => {
  ev.preventDefault()
  const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect()
  const anchor = { x: ev.clientX - rect.left, y: ev.clientY - rect.top }
  const delta = ev.deltaY > 0 ? -0.5 : 0.5
  applyZoom(delta, props.wheelZoomDuration, anchor)
}, { passive: false })

interface PointerSample {
  t: number
  x: number
  y: number
}

let isDragging = false
let activePointerId: number | null = null
let lastPointer: PointerSample | null = null
const samples: PointerSample[] = []
let inertiaRaf = 0

const cancelInertia = () => {
  if (inertiaRaf) {
    cancelAnimationFrame(inertiaRaf)
    inertiaRaf = 0
  }
}

const panBy = (dxPx: number, dyPx: number) => {
  const z = zoom.value
  const scale = 2 ** z
  const [tx, ty] = (viewStore.state.target ?? [0, 0]) as [number, number]
  viewStore.setState({
    target: [tx - dxPx / scale, ty - dyPx / scale],
    transitionDuration: 0,
  })
}

const startInertia = (vx: number, vy: number) => {
  const speed = Math.hypot(vx, vy)
  if (speed < props.inertiaMinVelocity || props.dragInertia <= 0)
    return

  const duration = props.dragInertia
  const start = performance.now()
  const v0x = vx
  const v0y = vy
  let prev = 0

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = easeOutQuint(t)
    const deltaProgress = eased - prev
    prev = eased
    const dx = v0x * duration * deltaProgress
    const dy = v0y * duration * deltaProgress
    panBy(dx, dy)
    if (t < 1) {
      inertiaRaf = requestAnimationFrame(tick)
    } else {
      inertiaRaf = 0
    }
  }
  inertiaRaf = requestAnimationFrame(tick)
}

useEventListener(deckContainerRef, 'pointerdown', (ev: PointerEvent) => {
  if (ev.button !== 0)
    return
  cancelInertia()
  isDragging = true
  activePointerId = ev.pointerId
  ;(ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId)
  const sample = { t: performance.now(), x: ev.clientX, y: ev.clientY }
  lastPointer = sample
  samples.length = 0
  samples.push(sample)
})

useEventListener(deckContainerRef, 'pointermove', (ev: PointerEvent) => {
  if (!isDragging || ev.pointerId !== activePointerId || !lastPointer)
    return
  const dx = ev.clientX - lastPointer.x
  const dy = ev.clientY - lastPointer.y
  panBy(dx, dy)
  const sample = { t: performance.now(), x: ev.clientX, y: ev.clientY }
  lastPointer = sample
  samples.push(sample)
  const cutoff = sample.t - props.inertiaSampleWindow
  while (samples.length > 2 && samples[0].t < cutoff)
    samples.shift()
})

const endDrag = (ev: PointerEvent) => {
  if (!isDragging || ev.pointerId !== activePointerId)
    return
  isDragging = false
  activePointerId = null
  try {
    ;(ev.currentTarget as HTMLElement).releasePointerCapture(ev.pointerId)
  }
  catch { /* noop */ }

  if (samples.length >= 2) {
    const now = performance.now()
    const last = samples[samples.length - 1]
    const gap = now - last.t

    const cutoff = last.t - props.inertiaSampleWindow
    while (samples.length > 2 && samples[0].t < cutoff)
      samples.shift()

    if (samples.length >= 2) {
      const first = samples[0]
      const dt = last.t - first.t
      if (dt > 0) {
        const avgVx = (last.x - first.x) / dt
        const avgVy = (last.y - first.y) / dt
        const avgSpeed = Math.hypot(avgVx, avgVy)

        const decay = Math.exp(-gap / props.inertiaSampleWindow)
        let vx = avgVx * decay
        let vy = avgVy * decay

        const speed = Math.hypot(vx, vy)
        if (speed > avgSpeed) {
          const ratio = avgSpeed / speed
          vx *= ratio
          vy *= ratio
        }

        startInertia(vx, vy)
      }
    }
  }
  samples.length = 0
  lastPointer = null
}

useEventListener(deckContainerRef, 'pointerup', endDrag)
useEventListener(deckContainerRef, 'pointercancel', endDrag)

onBeforeUnmount(() => cancelInertia())
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
