<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'

defineProps<{
  title?: string
}>()

const open = defineModel<boolean>('open', {
  required: false,
  default: false,
})
</script>

<template>
  <CollapsibleRoot
    v-model:open="open"
    :class="[
      'filter-item outline-3 outline-transparent',
      'rounded-lg bg-[--gl-1] select-none overflow-hidden border border-[--border-color]',
      open ? 'is-opened' : '',
    ]"
  >
    <CollapsibleTrigger
      :class="['filter-item-trigger w-full flex flex-col cursor-pointer text-sm text-[--gl-7]']"
    >
      <!-- 标题栏 -->
      <div class="w-full shrink-0 h-9 flex items-center truncate">
        <slot name="icon" />
        <div class="h-full flex-1 text-left leading-9">
          {{ title }}
        </div>
        <!-- 折叠按钮 -->
        <div class="h-full aspect-square grid place-content-center">
          <svg
            class="shrink-0 size-4 text-[--gl-5]"
            :class="[open ? 'rotate-180' : '']"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <!-- 折叠信息 -->
      <slot name="summary" :open="open" />
    </CollapsibleTrigger>

    <!-- 可折叠内容 -->
    <CollapsibleContent>
      <div class="overflow-hidden">
        <div class="border-t-(--gl-4) text-sm text-(--gl-6)">
          <slot />
        </div>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style lang="css" scoped>
.filter-item {
  --border-color: var(--gl-4);
}
.filter-item:has(.filter-item-trigger:hover) {
  outline-color: color-mix(in oklch, var(--color-brand-3), transparent 50%);
}
.filter-item:has(.hover-clip:hover) {
  outline-color: transparent;
}
.filter-item:has(.filter-item-trigger:active) {
  outline-width: 1px;
}

.filter-item-trigger {
  --uno: hover: bg-light-dark(#00000008, #ffffff08);
}

[data-state='open'] > .filter-item-trigger {
  color: var(--border-color-brand-6);
}
</style>
