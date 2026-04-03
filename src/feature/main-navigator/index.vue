<script setup lang="ts">
import { GButton } from '@/ui/g-button'
import { GSquircle } from '@/ui/g-shape'
</script>

<template>
  <div
    class="main-navigator fixed bottom-8 left-1/2 -translate-x-1/2 w-82 h-18 drop-shadow-lg flex gap-2 p-2"
  >
    <GSquircle :w="4 * 82" :h="4 * 18" fill="#3f4458" />
    <router-link to="/map" active-class="is-actived">
      <GButton class="w-14 h-14 text-sm">地图</GButton>
    </router-link>
    <router-link to="/" exact-active-class="is-actived">
      <GButton class="w-14 h-14 text-sm">探索</GButton>
    </router-link>
    <GButton class="w-14 h-14 text-sm">派蒙</GButton>
    <GButton class="w-14 h-14 text-sm">收藏</GButton>
    <GButton class="w-14 h-14 text-sm">用户</GButton>
  </div>
</template>
