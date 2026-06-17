<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import MapFilter from '@/components/map-filter/map-filter.vue'

const params = useUrlSearchParams<{
  selectedAreaCode?: string
}>('history')
</script>

<template>
  <div class="page-development w-full h-full flex">
    <!-- 亮色模式开发区域 -->
    <div class="relative flex-1 bg-white">
      <MapFilter
        v-model:area-code="params.selectedAreaCode"
        class="absolute left-8 top-8"
        style="color-scheme: light"
      />
    </div>

    <!-- 暗色模式开发区域 -->
    <div class="relative flex-1 bg-#1a1a21">
      <MapFilter
        v-model:area-code="params.selectedAreaCode"
        class="absolute left-8 top-8"
        style="color-scheme: dark"
      />
    </div>
  </div>
</template>
