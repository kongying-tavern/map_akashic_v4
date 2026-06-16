<script setup lang="ts">
import MapFilter from '@/components/map-filter/map-filter.vue'
</script>

<template>
  <div class="page-development w-full h-full flex">
    <!-- 亮色模式开发区域 -->
    <div class="relative flex-1 bg-white">
      <MapFilter class="absolute left-8 top-8" />
    </div>
    <!-- 暗色模式开发区域 -->
    <div class="relative flex-1 bg-[#1a1a2e]">
      <MapFilter class="absolute left-8 top-8" style="color-scheme: dark" />
    </div>
  </div>
</template>
