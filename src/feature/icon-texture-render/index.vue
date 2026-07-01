<script lang="ts" setup>
import { useIconStore } from '@/stores'

const iconStore = useIconStore()

const canvasRef = ref<HTMLCanvasElement | null>(null)

watch(
  () => iconStore.list,
  async (iconList) => {
    const { texture } = await iconStore.render(iconList)
    const canvas = canvasRef.value
    if (!canvas) return
    canvas.width = texture.width
    canvas.height = texture.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(texture, 0, 0)
  },
)
</script>

<template>
  <div class="w-full h-full overflow-auto">
    <canvas class="" ref="canvasRef" />
  </div>
</template>
