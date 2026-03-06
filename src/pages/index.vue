<script setup lang="ts">
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()
</script>

<template>
  <div class="relative w-100dvw h-100dvh overflow-auto">
    <router-link
      v-for="area in configStore.config.tiles"
      :key="area.code"
      :to="{
        name: '/map/[code]',
        params: {
          code: area.code || 'unknown',
        },
      }"
      class="block px-4 py-2 text-blue-700 hover:bg-blue-100 active:bg-blue-300 m-2 rounded"
    >
      {{ `${area.name || 'Unknown'}: ${area.code || 'unknown'}` }}
    </router-link>
  </div>
</template>
