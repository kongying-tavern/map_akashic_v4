<script setup lang="ts">
import WinuiSegmented from '@/ui/winui/winui-segmented.vue'
import AreaFilter from './components/area-filter.vue'

const mode = ref('normal')
const options = [
  { label: '效率', value: 'normal' },
  { label: '进阶', value: 'advencend' },
]
</script>

<template>
  <div class="flex-1 w-full" style="container-type: inline-size">
    <!-- 模式切换 -->
    <WinuiSegmented v-model="mode" :options="options" class="w-[calc(100%-1.5rem)] m-3" />

    <!-- 地区选择 -->
    <AreaFilter />
  </div>
</template>
