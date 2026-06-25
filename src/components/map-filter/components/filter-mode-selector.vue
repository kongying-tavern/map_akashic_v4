<script setup lang="ts">
const selectedIndex = defineModel<number>('selectedIndex', { default: 0 })

const filterOptions = [
  { label: '基本筛选', value: 'basic' },
  { label: '高阶筛选', value: 'advanced' },
]
</script>

<template>
  <div class="relative flex mb-1" :style="{ '--index': selectedIndex }">
    <!-- 滑块 -->
    <div
      class="absolute inset-y-0 w-1/2 rounded-lg bg-[--color-brand-1] shadow transition-transform duration-150 ease-in-out"
      style="transform: translateX(calc(var(--index) * 100%))"
    />

    <!-- 选项 -->
    <div
      v-for="(filter, index) in filterOptions"
      :key="filter.value"
      class="relative z-10 flex-1 px-3 h-8 text-sm leading-8 text-center select-none transition-colors duration-150"
      :class="index === selectedIndex ? 'text-[--color-brand-5]' : 'text-[--gl-6]'"
      @pointerdown="selectedIndex = index"
    >
      {{ filter.label }}
    </div>
  </div>
</template>
