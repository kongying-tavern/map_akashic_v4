<script setup lang="ts">
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

const collapsed = defineModel<boolean>('collapsed', {
  required: false,
  default: false,
})

const sider = defineModel<MENU_KEYS | null>('sider', {
  required: false,
  default: MENU_KEYS.FILTER,
})

const menuConfigMap = computed<Record<MENU_KEYS, MenuConfig>>(() => ({
  [MENU_KEYS.FILTER]: {
    label: t('filter'),
    icon: RegularFilter,
    component: defineAsyncComponent(() => import('@/feature/sider-menus/item-filter/index.vue')),
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
    component: defineAsyncComponent(() => import('@/feature/sider-menus/item-setting/index.vue')),
  },
}))

const mainItems = [MENU_KEYS.FILTER, MENU_KEYS.TRACK]
const footerItems = [MENU_KEYS.LOCALE, MENU_KEYS.SETTING]

const toggleMenu = (key: MENU_KEYS) => {
  if (key === sider.value) {
    sider.value = null
  } else {
    sider.value = key
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
          :selected="sider === item"
          :icon="menuConfigMap[item].icon"
          :label="menuConfigMap[item].label"
          @click="() => toggleMenu(item)"
        />
      </div>

      <div class="shrink-0 overflow-hidden">
        <SiderButton
          v-for="item in footerItems"
          :key="item"
          :selected="sider === item"
          :icon="menuConfigMap[item].icon"
          :label="menuConfigMap[item].label"
          @click="() => toggleMenu(item)"
        />
      </div>
    </div>

    <!-- 右侧拓展面板 -->
    <div
      v-if="sider"
      :class="[
        'sider-toolbar-right',
        'absolute top-0 left-[var(--tap-width)]',
        'w-80 h-full flex flex-col',
        'bg-[--bg-level-2] border-r-1 border-[--border-color]',
        collapsed ? 'is-collapsed' : 'pointer-events-auto',
        sider ? 'is-selected' : '',
      ]"
    >
      <div class="h-17 px-4 gap-2 select-none shrink-0 bg-[--bg-level-1]">
        <div class="text-lg leading-6 font-bold mt-3">{{ menuConfigMap[sider].label }}</div>
        <div>description</div>
      </div>
      <Suspense>
        <template #fallback> Loading... </template>
        <component :is="menuConfigMap[sider].component" />
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.sider-toolbar-vars {
  --tap-width: 4rem;
  /* 主题色应做提取 */
  --text-color: var(--color-brand-6);
  --text-active-color: var(--color-brand-5);
  --border-color: var(--gl-3);
  --bg-level-1: var(--gl-1);
  --bg-level-2: var(--gl-3);
  --item-hover-bg: var(--color-brand-1);
  --item-active-bg: var(--color-brand-2);
  --item-selected-bg: var(--color-brand-2);
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
