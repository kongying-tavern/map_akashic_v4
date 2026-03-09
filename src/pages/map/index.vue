<script setup lang="ts">
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()
</script>

<template>
  <div class="relative w-100dvw h-100dvh overflow-auto">
    <router-link
      v-for="[id] in configStore.tiles"
      :key="id"
      :to="{
        name: '/map/[id]',
        params: {
          id,
        },
      }"
      class="block px-4 py-2 text-blue-700 hover:bg-blue-100 active:bg-blue-300 m-2 rounded"
    >
      {{ id }}
    </router-link>
  </div>
</template>
