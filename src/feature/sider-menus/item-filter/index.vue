<script setup lang="ts">
import { useRequest } from 'alova/client'
import Api from '@/api'
import WinuiSegmented from '@/ui/winui/winui-segmented.vue'

const mode = ref('normal')
const options = [
  { label: '效率', value: 'normal' },
  { label: '进阶', value: 'advencend' },
]

const { data } = useRequest(
  Api.main.area.listArea({
    data: {
      isTraverse: true,
      parentId: -1,
    },
  }),
  {
    initialData: {},
  },
)
</script>

<template>
  <div class="flex-1 w-full" style="container-type: inline-size">
    <!-- 模式切换 -->
    <WinuiSegmented v-model="mode" :options="options" class="w-[calc(100%-1.5rem)] m-3" />

    <!-- 地区选择 TODO -->
    <div class="border border-[--gl-4] bg-[--gl-2] w-[calc(100%-1.5rem)] mx-3 h-20 rounded-lg">
      {{ data.data?.length }}
    </div>
  </div>
</template>
