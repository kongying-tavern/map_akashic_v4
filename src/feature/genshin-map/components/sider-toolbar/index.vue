<script setup lang="ts">
import RegularFilter from '@/ui/g-icons/regular-filter.vue'
import RegularLocation from '@/ui/g-icons/regular-location.vue'
import SiderButton from './sider-button.vue'

const selectedMenu = ref('filter')

const items = [
  { label: '过滤', key: 'filter', icon: RegularFilter },
  { label: '追踪', key: 'advanced', icon: RegularLocation },
]
</script>

<template>
  <div
    class="sider-toolbar sider-toolbar-vars fixed top-0 left-0 w-[min(100dvw,24rem)] h-100dvh z-1 pointer-events-auto"
  >
    <!-- 左侧边条 -->
    <div
      class="absolute left-0 top-0 w-[calc(var(--tap-width)+1px)] z-2 h-full bg-[--bg-level-1] border-r-1 border-[--border-color] select-none"
    >
      <SiderButton
        v-for="item in items"
        :key="item.key"
        :selected="selectedMenu === item.key"
        :icon="item.icon"
        :iconkey="item.key"
        :label="item.label"
        @click="selectedMenu = item.key"
      />
    </div>

    <!-- 右侧拓展面板 -->
    <div
      class="absolute top-0 left-[var(--tap-width)] w-80 h-full bg-[--bg-level-2] border-r-1 border-[hsl(180,100%,100%,40%)] pointer-events-auto"
    >
      <div class="h-12 flex items-center px-4 gap-2">
        <div class="w-3 h-3 grid place-items-center">
          <svg viewBox="0 0 1024 960" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1024,480C1024,488.667 1020.83,496.167 1014.5,502.5C1008.17,508.833 1000.67,512 992,512L109.5,512L502.5,905.5C508.833,911.833 512,919.333 512,928C512,936.667 508.833,944.167 502.5,950.5C496.167,956.833 488.667,960 480,960C471.333,960 463.833,956.833 457.5,950.5L11,504C7.33333,500.333 4.58333,496.667 2.75,493C0.916667,489.333 0,485 0,480C0,475 0.916667,470.667 2.75,467C4.58333,463.333 7.33333,459.667 11,456L457.5,9.5C463.833,3.16669 471.333,0 480,0C488.667,0 496.167,3.16669 502.5,9.5C508.833,15.8334 512,23.3334 512,32C512,40.6667 508.833,48.1667 502.5,54.5L109.5,448L992,448C1000.67,448 1008.17,451.167 1014.5,457.5C1020.83,463.833 1024,471.333 1024,480Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div>Back</div>
      </div>
      <div class="h-12 flex items-center px-2 bg-[hsl(0,0%,98%)]">
        <div class="w-8 h-8 bg-[hsl(40,50%,90%)] rounded text-xs grid place-items-center">地区</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sider-toolbar-vars {
  --tap-width: 4rem;
  /* 主题色应做提取 */
  --text-color: light-dark(hsl(40, 44%, 46%), hsl(40, 44%, 46%));
  --text-active-color: light-dark(hsl(40, 44%, 60%), hsl(40, 44%, 60%));
  --border-color: light-dark(hsl(0, 0%, 90%), hsl(0, 0%, 30%));
  --bg-level-1: light-dark(hsl(0, 0%, 98%, 100%), hsl(227, 18%, 20%, 100%));
  --bg-level-2: light-dark(hsl(0, 0%, 95%, 100%), hsl(227, 18%, 30%, 100%));
  --item-hover-bg: light-dark(hsl(0, 0%, 92%), hsl(227, 18%, 24%));
  --item-active-bg: light-dark(hsl(0, 0%, 88%), hsl(227, 18%, 28%));
  --item-selected-bg: light-dark(hsl(40, 60%, 90%), hsl(40, 50%, 30%));
}

.sider-toolbar {
  color: var(--text-color);
  font-size: 14px;
}
</style>
