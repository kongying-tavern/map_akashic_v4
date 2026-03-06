<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { ConfigProvider } from '@/core'
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()

const {
  state: data,
  error,
  isLoading,
} = useAsyncState(configStore.loadConfig, {}, {
  immediate: true,
})
</script>

<template>
  <ConfigProvider>
    <div v-if="isLoading">
      Loading Config ...
    </div>
    <div v-else-if="!data">
      {{ error }}
    </div>
    <router-view v-else />
  </ConfigProvider>
</template>
