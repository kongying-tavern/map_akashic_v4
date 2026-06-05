<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'

defineProps<{
  title?: string
}>()

const open = defineModel<boolean>('open')
</script>

<template>
  <CollapsibleRoot
    v-model:open="open"
    :default-open="false"
    :class="[
      'filter-item outline-2 outline-transparent',
      'rounded-lg bg-[--gl-1] select-none overflow-hidden border border-[--color]',
    ]"
  >
    <!-- 标题栏 -->
    <CollapsibleTrigger
      :class="[
        'filter-item-trigger w-full h-16 flex cursor-pointer text-sm text-[--gl-7] transition-colors-150',
      ]"
    >
      <div class="flex-1 min-w-0 text-left truncate font-medium">
        {{ title }}
        <div v-if="$slots.summary" class="shrink-0 text-xs text-[--gl-5] truncate max-w-40%">
          <slot name="summary" />
        </div>
      </div>
      <div class="h-12 p-2">
        <svg
          class="filter-item-chevron shrink-0 size-4 text-[--gl-5]"
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
    </CollapsibleTrigger>

    <!-- 可折叠内容 -->
    <CollapsibleContent
      force-mount
      class="grid ease-in-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
    >
      <div class="overflow-hidden">
        <div class="border-t-(--gl-4) text-sm text-(--gl-6)">
          <slot />
        </div>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style lang="css" scoped>
@property --filter-chevron-rotate {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.filter-item {
  --color: var(--gl-4);
}
.filter-item:has(.filter-item-trigger:hover) {
  --color: var(--color-brand-5);
  outline-color: var(--color-brand-3);
}
.filter-item:has(.filter-item-trigger:active) {
  outline-width: 1px;
}

.filter-item-trigger {
  --uno: hover: bg-light-dark(#00000008, #ffffff08);
}

.filter-item-chevron {
  --filter-chevron-rotate: 0deg;
  transform: rotate(var(--filter-chevron-rotate));
}

[data-state='open'] > .filter-item-trigger {
  color: var(--color-brand-6);
}

[data-state='open'] > .filter-item-trigger .filter-item-chevron {
  --filter-chevron-rotate: -180deg;
}
</style>
