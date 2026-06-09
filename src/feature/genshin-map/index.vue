<script setup lang="ts">
import SiderToolbar from './components/sider-toolbar/index.vue'
import { useGenshinDeck, type GenshinMapProps } from './hooks/use-genshin-deck'

const props = defineProps<GenshinMapProps>()

const canvasRef = useTemplateRef('canvas')
useGenshinDeck(canvasRef, props)
</script>

<template>
  <div class="fixed w-100dvw h-100dvh overflow-hidden bg-black">
    <canvas ref="canvas" class="absolute inset-0" />
    <SiderToolbar />
  </div>
</template>
