import { computed, onMounted, onUnmounted, watch, type Ref } from 'vue'
import type ChromaHueCanvas from '../components/ChromaHueCanvas.vue'
import { renderCanvas, MAX_CHROMA } from '../utils/color-conversion'

export function useChromaHueCanvas(
  compRef: Ref<InstanceType<typeof ChromaHueCanvas> | undefined>,
  l: Ref<number>,
  c: Ref<number>,
  h: Ref<number>,
  size: number = 180,
) {
  let renderFrameId = 0
  let draggingCanvas = false

  function getCanvas() {
    return compRef.value?.canvasRef
  }

  // 性能节流控制 (rAF)
  function scheduleRender() {
    cancelAnimationFrame(renderFrameId)
    renderFrameId = requestAnimationFrame(() => {
      const canvas = getCanvas()
      if (canvas) {
        renderCanvas(canvas, l.value)
      }
    })
  }

  // Canvas 指针交互
  function updateCH(e: PointerEvent) {
    const canvas = getCanvas()
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
    c.value = x * MAX_CHROMA
    h.value = y * 360
  }

  function onCanvasDown(e: PointerEvent) {
    draggingCanvas = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    updateCH(e)
  }

  function onCanvasMove(e: PointerEvent) {
    if (draggingCanvas) updateCH(e)
  }

  function onCanvasUp() {
    draggingCanvas = false
  }

  const thumbLeft = computed(() => `${(c.value / MAX_CHROMA) * 100}%`)
  const thumbTop = computed(() => `${(h.value / 360) * 100}%`)

  // 生命周期
  watch(l, scheduleRender)

  onMounted(() => {
    const canvas = getCanvas()
    if (!canvas) return
    canvas.width = size
    canvas.height = size
    renderCanvas(canvas, l.value)
  })

  onUnmounted(() => {
    cancelAnimationFrame(renderFrameId)
  })

  return {
    thumbLeft,
    thumbTop,
    onCanvasDown,
    onCanvasMove,
    onCanvasUp,
  }
}
