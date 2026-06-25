<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import MapFilter from '@/components/map-filter/map-filter.vue'

const params = useUrlSearchParams<{
  selectedAreaCode?: string
}>('history')
</script>

<template>
  <div class="w-full h-full flex">
    <!-- 亮色模式开发区域 -->
    <div class="relative flex-1 bg-light">
      <MapFilter
        v-model:area-code="params.selectedAreaCode"
        class="absolute left-8 top-8"
        style="color-scheme: light"
      />
    </div>

    <!-- 暗色模式开发区域 -->
    <div class="relative flex-1 bg-dark">
      <MapFilter
        v-model:area-code="params.selectedAreaCode"
        class="absolute left-8 top-8"
        style="color-scheme: dark"
      />
    </div>
  </div>
</template>
