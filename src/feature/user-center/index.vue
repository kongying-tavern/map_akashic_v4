<script setup lang="ts">
import { GImage } from '@/ui/g-image'
</script>

<template>
  <div
    :style="{
      'scrollbar-width': 'none',
      '--m': '0.5rem',
    }"
    class="w-full h-full overflow-auto relative bg-#EEE"
  >
    <!-- 动态顶部区域 -->
    <!-- <div class="sticky top-0 left-0 w-full h-16 bg-#FFFFFF60 backdrop-blur-md">Scroll Top</div> -->

    <!-- 滚动区域 -->
    <div class="w-full max-w-screen-xl mx-auto h-200dvh">
      <div class="flex flex-wrap m-[var(--m)] gap-[var(--m)]">
        <!-- 用户基础信息 -->
        <div class="min-w-[min(20rem,calc(100%-2*var(--m)))] flex-1 rounded-lg overflow-hidden">
          <div class="w-32 h-32 rounded-32 border-2 border-solid border-gray overflow-hidden">
            <GImage
              class="w-full h-full"
              src="https://bbs-static.miyoushe.com/static/2026/02/06/529ccdf573d8f1ca5a8dbb593a23695a_1209693741071636755.png"
            />
          </div>
        </div>

        <!-- 用户成就 -->
        <div class="min-w-[min(20rem,calc(100%-2*var(--m)))] flex-1 rounded-lg overflow-hidden">
          <GImage
            class="w-full h-48"
            src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
