<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { ConfigProvider } from '@/core'
import MainNavigator from '@/feature/main-navigator/index.vue'
import { useConfigStore } from '@/stores'

const configStore = useConfigStore()

const {
  state: data,
  error,
  isLoading,
} = useAsyncState(
  async () => {
    const config = await configStore.loadConfig()
    return config
  },
  null,
  {
    immediate: true,
  },
)
</script>

<template>
  <ConfigProvider>
    <div class="page-development h-full bg-#ede4d5 relative" style="--s: #fff">
      <div v-if="isLoading">Loading Config ...</div>
      <div v-else-if="!data">
        {{ error }}
      </div>
      <router-view v-else />
      <!-- <MainNavigator></MainNavigator> -->
    </div>
  </ConfigProvider>
</template>
