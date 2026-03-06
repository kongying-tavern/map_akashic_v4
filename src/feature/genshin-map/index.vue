<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute('/map/[code]')

onMounted(() => {
})

onUnmounted(() => {
})
</script>

<template>
  <div class="relative w-full h-full">
    {{ route.params.code }}
  </div>
</template>
