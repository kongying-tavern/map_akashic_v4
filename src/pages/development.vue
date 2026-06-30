<script setup lang="ts">
import { router } from '@/router'

const components = router
  .getRoutes()
  .filter((route) => route.path.startsWith('/development/'))
  .map((route) => ({
    path: route.path,
    label: route.meta.title,
  }))
</script>

<template>
  <div class="page-development w-full h-full flex">
    <!-- 左侧边栏 -->
    <aside
      class="w-50 shrink-0 border-r border-gray-200 bg-gray-50 overflow-y-auto dark:border-gray-700 dark:bg-gray-900"
    >
      <h2 class="p-4 text-sm font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
        组件列表
      </h2>
      <nav class="flex flex-col gap-1">
        <RouterLink
          v-for="comp in components"
          :key="comp.path"
          :to="comp.path"
          class="px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
          active-class="!bg-blue-100 !text-blue-700 dark:!bg-blue-900 dark:!text-blue-300"
        >
          {{ comp.label }}
        </RouterLink>
      </nav>
    </aside>

    <!-- 右侧内容区 -->
    <main class="flex-1 overflow-hidden">
      <RouterView />
    </main>
  </div>
</template>
