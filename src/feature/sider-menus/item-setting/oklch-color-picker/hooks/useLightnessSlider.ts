import { computed, type Ref } from 'vue'
import type LightnessSlider from '../components/LightnessSlider.vue'
import { oklchToSrgb } from '../utils/color-conversion'

export function useLightnessSlider(
  compRef: Ref<InstanceType<typeof LightnessSlider> | undefined>,
  l: Ref<number>,
  c: Ref<number>,
  h: Ref<number>,
) {
  let draggingL = false

  function getTrack() {
    return compRef.value?.lTrackRef
  }

  function updateL(e: PointerEvent) {
    const track = getTrack()
    if (!track) return
    const rect = track.getBoundingClientRect()
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    l.value = 1 - y
  }

  function onLDown(e: PointerEvent) {
    draggingL = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updateL(e)
  }

  function onLMove(e: PointerEvent) {
    if (draggingL) updateL(e)
  }

  function onLUp() {
    draggingL = false
  }

  const lThumbTop = computed(() => `${(1 - l.value) * 100}%`)

  const lGradient = computed(() => {
    const stops: string[] = []
    const steps = 12
    for (let i = 0; i <= steps; i++) {
      const lVal = 1 - i / steps // 从上到下：L从1到0（白到黑）
      const [r, g, b] = oklchToSrgb(lVal, c.value, h.value)
      stops.push(`rgb(${r},${g},${b}) ${((i / steps) * 100).toFixed(0)}%`)
    }
    return `linear-gradient(to bottom, ${stops.join(', ')})`
  })

  return {
    lThumbTop,
    lGradient,
    onLDown,
    onLMove,
    onLUp,
  }
}
