<script setup lang="ts">
import WinuiSegmented from '@/ui/winui/winui-segmented.vue'

const mode = ref('normal')
const options = [
  { label: '效率', value: 'normal' },
  { label: '进阶', value: 'advencend' },
]
</script>

<template>
  <div class="flex-1 w-full" style="container-type: inline-size">
    <!-- 模式切换 -->
    <WinuiSegmented v-model="mode" :options="options" class="w-94cqw m-3cqw" />
  </div>
</template>
