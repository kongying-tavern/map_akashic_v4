<script lang="ts" setup>
import { useIconStore } from '@/stores'

const iconStore = useIconStore()

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const progressValue = ref(0)
const progressMessage = ref('')
const rendering = ref(false)

const canvasSize = reactive({ width: 0, height: 0 })
const containerSize = reactive({ width: 0, height: 0 })

const scale = computed(() => {
  const { width: cw, height: ch } = canvasSize
  const { width: bw, height: bh } = containerSize
  if (!cw || !ch || !bw || !bh) return 1
  return Math.min(bw / cw, bh / ch, 1)
})

const updateContainerSize = () => {
  const el = containerRef.value
  if (!el) return
  containerSize.width = el.clientWidth
  containerSize.height = el.clientHeight
}

let resizeObserver: ResizeObserver | null = null
onMounted(() => {
  updateContainerSize()
  if (containerRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(updateContainerSize)
    resizeObserver.observe(containerRef.value)
  }
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

watch(
  () => iconStore.list,
  async (iconList) => {
    rendering.value = true
    progressValue.value = 0
    progressMessage.value = '开始渲染'
    try {
      const { texture } = await iconStore.render(iconList, (value, message) => {
        progressValue.value = value
        if (message) progressMessage.value = message
      })
      const canvas = canvasRef.value
      if (!canvas) return
      canvas.width = texture.width
      canvas.height = texture.height
      canvasSize.width = texture.width
      canvasSize.height = texture.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(texture, 0, 0)
    } finally {
      rendering.value = false
    }
  },
)
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden flex items-center justify-center"
  >
    <canvas ref="canvasRef" class="origin-center" :style="{ transform: `scale(${scale})` }" />
    <div
      v-if="rendering"
      class="absolute left-1/2 bottom-4 -translate-x-1/2 min-w-[240px] px-3 py-2 rounded bg-black/60 text-white text-xs"
    >
      <div class="flex justify-between mb-1">
        <span>{{ progressMessage }}</span>
        <span>{{ progressValue }}%</span>
      </div>
      <div class="h-1 w-full bg-white/20 rounded overflow-hidden">
        <div class="h-full bg-white transition-all" :style="{ width: `${progressValue}%` }" />
      </div>
    </div>
  </div>
</template>
