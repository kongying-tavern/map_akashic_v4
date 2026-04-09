<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import RegularFilter from '@/ui/g-icons/regular-filter.vue'
import RegularLocale from '@/ui/g-icons/regular-locale.vue'
import RegularLocation from '@/ui/g-icons/regular-location.vue'
import RegularSetting from '@/ui/g-icons/regular-setting.vue'
import CollapseButton from './collapse-button.vue'
import SiderButton from './sider-button.vue'

const enum MENU_KEYS {
  FILTER = 'filter',
  TRACK = 'track',
  LOCALE = 'locale',
  SETTING = 'setting',
}

interface MenuConfig {
  label: string
  icon: Component
  component?: Component
}

const { t } = useI18n()

const menuConfigMap = computed<Record<MENU_KEYS, MenuConfig>>(() => ({
  [MENU_KEYS.FILTER]: {
    label: t('filter'),
    icon: RegularFilter,
    component: defineComponent({ render: () => 'TODO' }),
  },
  [MENU_KEYS.TRACK]: {
    label: t('track'),
    icon: RegularLocation,
    component: defineComponent({ render: () => 'TODO' }),
  },
  [MENU_KEYS.LOCALE]: {
    label: t('locale'),
    icon: RegularLocale,
    component: defineAsyncComponent(() => import('@/feature/sider-menus/item-locale/index.vue')),
  },
  [MENU_KEYS.SETTING]: {
    label: t('setting'),
    icon: RegularSetting,
    component: defineComponent({ render: () => 'TODO' }),
  },
}))

const mainItems = [MENU_KEYS.FILTER, MENU_KEYS.TRACK]
const footerItems = [MENU_KEYS.LOCALE, MENU_KEYS.SETTING]

const params = useUrlSearchParams('history')

const selectedMenu = computed<MENU_KEYS | null>({
  get: () => {
    return (typeof params.sider !== 'string' ? null : params.sider) as MENU_KEYS
  },
  set: (value) => {
    params.sider = value ?? ''
  },
})

const collapsed = computed({
  get: () => {
    return params.collapsed === '1'
  },
  set: (bool) => {
    params.collapsed = bool ? '1' : '0'
  },
})

const toggleMenu = (key: MENU_KEYS) => {
  if (key === selectedMenu.value) {
    selectedMenu.value = null
  } else {
    selectedMenu.value = key
  }
}
</script>

<template>
  <div
    class="sider-toolbar sider-toolbar-vars fixed top-0 left-0 w-[min(100dvw,24rem)] h-100dvh z-1"
  >
    <CollapseButton class="pointer-events-auto" v-model:collapsed="collapsed" />

    <!-- 左侧边条 -->
    <div
      :class="[
        'sider-toolbar-left absolute left-0 top-0 z-2 pt-16',
        'w-[calc(var(--tap-width)+1px)] h-full',
        'flex flex-col',
        'border-r-1 border-[--border-color] bg-[--bg-level-1]',
        'select-none',
        collapsed ? 'is-collapsed' : 'pointer-events-auto',
      ]"
    >
      <div class="flex-1 w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
        <SiderButton
          v-for="item in mainItems"
          :key="item"
          :selected="selectedMenu === item"
          :icon="menuConfigMap[item].icon"
          :label="menuConfigMap[item].label"
          @click="() => toggleMenu(item)"
        />
      </div>

      <div class="shrink-0 overflow-hidden">
        <SiderButton
          v-for="item in footerItems"
          :key="item"
          :selected="selectedMenu === item"
          :icon="menuConfigMap[item].icon"
          :label="menuConfigMap[item].label"
          @click="() => toggleMenu(item)"
        />
      </div>
    </div>

    <!-- 右侧拓展面板 -->
    <div
      v-if="selectedMenu"
      :class="[
        'sider-toolbar-right',
        'absolute top-0 left-[var(--tap-width)]',
        'w-80 h-full',
        'bg-[--bg-level-2] border-r-1 border-[hsl(180,100%,100%,40%)]',
        collapsed ? 'is-collapsed' : 'pointer-events-auto',
        selectedMenu ? 'is-selected' : '',
      ]"
    >
      <div class="h-12 flex items-center px-2 gap-2 select-none">
        {{ menuConfigMap[selectedMenu].label }}
      </div>
      <Suspense>
        <template #fallback> Loading... </template>
        <component :is="menuConfigMap[selectedMenu].component" />
      </Suspense>
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

.sider-toolbar-left {
  transition: all 150ms ease;
  clip-path: inset(0 0 0 0);
  opacity: 1;
}
.sider-toolbar-left.is-collapsed {
  clip-path: inset(0 0 50% 0);
  opacity: 0;
}

.sider-toolbar-right {
  transition: all 150ms ease;
  clip-path: inset(0 0 0 0);
  opacity: 1;
  transition-delay: 150ms;
}
.sider-toolbar-right.is-collapsed {
  clip-path: inset(0 50% 0 0);
  opacity: 0;
  transition-delay: 0ms;
}
</style>
