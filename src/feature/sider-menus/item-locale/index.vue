<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUrlSearchStore } from '@/stores'

const urlSearchStore = useUrlSearchStore()

const { t, availableLocales, locale: i18nLocale } = useI18n({ useScope: 'global' })

const locales: { label: string; value: I18nType.Locale }[] = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

const searchQuery = ref('')

const visibleLocales = computed(() => {
  const supported = locales.filter((x) =>
    (availableLocales as unknown as string[]).includes(x.value),
  )

  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return supported

  return supported.filter((x) => {
    const label = x.label.toLowerCase()
    const value = x.value.toLowerCase()
    return label.includes(q) || value.includes(q)
  })
})

watch(
  () => urlSearchStore.locale,
  (v) => {
    i18nLocale.value = v
  },
  { immediate: true },
)

function selectLocale(v: I18nType.Locale) {
  urlSearchStore.locale = v
  i18nLocale.value = v
}
</script>

<template>
  <div class="locale-menu mx-2">
    <div class="locale-search">
      <input
        id="locale-search"
        v-model="searchQuery"
        class="locale-search-input"
        type="text"
        inputmode="search"
        autocomplete="off"
        spellcheck="false"
        :placeholder="t('sider.locale.search.placeholder')"
      />
    </div>

    <div class="locale-list" role="listbox" aria-label="语言列表">
      <button
        v-for="item in visibleLocales"
        :key="item.value"
        class="locale-item"
        :class="{ 'is-selected': item.value === urlSearchStore.locale }"
        type="button"
        role="option"
        :aria-selected="item.value === urlSearchStore.locale"
        @click="selectLocale(item.value)"
      >
        <span class="locale-item-label">{{ item.label }}</span>
        <span class="locale-item-value">{{ item.value }}</span>
      </button>

      <div v-if="visibleLocales.length === 0" class="locale-empty">
        {{ t('sider.locale.list.empty') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.locale-menu {
  --text-color: light-dark(hsl(215, 18%, 22%), hsl(0, 0%, 92%));
  --subtle-text-color: light-dark(hsl(215, 10%, 40%), hsl(0, 0%, 70%));
  --border-color: light-dark(hsl(0, 0%, 86%), hsl(0, 0%, 28%));
  --control-bg: light-dark(hsl(0, 0%, 100%), hsl(227, 18%, 18%));
  --control-bg-hover: light-dark(hsl(0, 0%, 98%), hsl(227, 18%, 20%));
  --item-hover-bg: light-dark(hsl(0, 0%, 94%), hsl(227, 18%, 24%));
  --item-active-bg: light-dark(hsl(0, 0%, 90%), hsl(227, 18%, 28%));
  --item-selected-bg: light-dark(hsl(212, 90%, 92%), hsl(212, 55%, 30%));
  --focus-ring: light-dark(hsl(212, 95%, 55%), hsl(212, 95%, 65%));
  --radius: 6px;
  --item-h: 36px;

  color: var(--text-color);
  font-size: 14px;
}

.locale-label {
  display: block;
  margin: 8px 0 6px;
  font-size: 12px;
  color: var(--subtle-text-color);
  user-select: none;
}

.locale-search {
  display: flex;
}

.locale-search-input {
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  background: var(--control-bg);
  color: var(--text-color);
  outline: none;
}

.locale-search-input::placeholder {
  color: color-mix(in oklab, var(--subtle-text-color) 75%, transparent);
}

.locale-search-input:hover {
  background: var(--control-bg-hover);
}

.locale-search-input:focus-visible {
  box-shadow: 0 0 0 2px color-mix(in oklab, var(--focus-ring) 35%, transparent);
  border-color: color-mix(in oklab, var(--focus-ring) 70%, var(--border-color));
}

.locale-list {
  margin-top: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  background: var(--control-bg);
  overflow: auto;
  max-height: 280px;
  padding: 4px;

  content-visibility: auto;
  contain-intrinsic-size: 280px;
}

.locale-item {
  width: 100%;
  height: var(--item-h);
  padding: 0 10px;
  border-radius: 4px;
  border: 0;
  background: transparent;
  color: var(--text-color);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  text-align: left;
}

.locale-item:hover {
  background: var(--item-hover-bg);
}

.locale-item:active {
  background: var(--item-active-bg);
}

.locale-item.is-selected {
  background: var(--item-selected-bg);
}

.locale-item:focus-visible {
  outline: 2px solid color-mix(in oklab, var(--focus-ring) 55%, transparent);
  outline-offset: 1px;
}

.locale-item-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.locale-item-value {
  font-size: 12px;
  color: var(--subtle-text-color);
}

.locale-empty {
  height: var(--item-h);
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: var(--subtle-text-color);
  user-select: none;
}
</style>
