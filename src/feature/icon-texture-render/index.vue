<script lang="ts" setup>
import { useIconStore } from '@/stores'

const iconStore = useIconStore()

watch(
  () => iconStore.list,
  (iconList) => {
    iconStore.render(iconList)
    console.log('iconList', iconList)
  },
)
</script>

<template>
  <div>点位纹理渲染</div>
</template>
