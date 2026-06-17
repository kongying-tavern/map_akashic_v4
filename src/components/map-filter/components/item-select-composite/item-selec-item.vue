<script lang="ts">
import type { ItemVo } from '@/api/services/main/globals'
export interface ItemSelectItemProps {
  item: ItemVo
  selected?: boolean
}
</script>

<script setup lang="ts">
import IconRenderer from '@/components/icon-renderer/icon-renderer.vue'
defineProps<ItemSelectItemProps>()
</script>

<template>
  <div
    v-bind="$attrs"
    class="item-select-item"
    :class="[
      'h-10 flex items-center gap-2 px-3 cursor-pointer',
      'outline-none transition-colors select-none',
      selected ? 'is-selected font-bold' : '',
    ]"
  >
    <slot name="icon">
      <IconRenderer class="shrink-0 size-6 rounded-full" :icon-id="item.iconId" />
    </slot>
    <span class="text-sm truncate">{{ item.name }}</span>
    <slot name="suffix" />
  </div>
</template>

<style lang="css" scoped>
@property --percentage {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 100%;
}
@property --bg-from {
  syntax: '<color>';
  inherits: false;
  initial-value: transparent;
}
@property --bg-to {
  syntax: '<color>';
  inherits: false;
  initial-value: transparent;
}

.item-select-item {
  --percentage: 0%;
  --pa: calc(50% - 0.5 * var(--percentage));
  --pb: calc(50% + 0.5 * var(--percentage));
  --bg-from: transparent;
  --bg-to: transparent;
  background: linear-gradient(
    to bottom,
    var(--bg-from) var(--pa),
    var(--bg-to) var(--pa),
    var(--bg-to) var(--pb),
    var(--bg-from) var(--pb)
  );
  transition:
    --bg-from ease 150ms,
    --bg-to ease 150ms,
    --percentage ease 150ms;
}

.item-select-item.is-selected {
  --bg-from: var(--color-brand-1);
  --bg-to: var(--color-brand-1);
  --percentage: 100%;
  color: var(--color-brand-6);
}
.item-select-item:not(.is-selected):hover {
  --percentage: 100%;
  --bg-to: var(--gl-1);
}
.item-select-item:not(.is-selected):active {
  --bg-to: var(--gl-2);
}
</style>
