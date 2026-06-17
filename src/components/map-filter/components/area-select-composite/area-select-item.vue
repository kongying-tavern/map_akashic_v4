<script lang="ts">
export interface AreaSelectItemProps {
  area: AreaVo
  iconUrl?: string
  selected: boolean
}
</script>

<script setup lang="ts">
import type { AreaVo } from '@/api/services/main/globals'

defineProps<AreaSelectItemProps>()
</script>

<template>
  <div
    v-bind="$attrs"
    class="area-select-item"
    :class="[
      'h-12 flex items-center gap-2 px-3 cursor-pointer',
      'outline-none transition-colors',
      selected ? 'is-selected font-bold' : '',
    ]"
  >
    <div class="size-6 shrink-0 rounded overflow-hidden relative">
      <div
        v-if="iconUrl"
        class="absolute inset-0 bg-contain bg-center bg-no-repeat bg-current"
        :style="{
          mask: `url(${iconUrl})`,
          maskSize: 'contain',
        }"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <slot name="fallbackIcon" />
      </div>
    </div>
    <span class="text-sm truncate">{{ area.name }}</span>
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

.area-select-item {
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

.area-select-item.is-selected {
  --bg-from: var(--color-brand-1);
  --bg-to: var(--color-brand-1);
  --percentage: 100%;
  color: var(--color-brand-6);
}
.area-select-item:not(.is-selected):hover {
  --percentage: 100%;
  --bg-to: var(--gl-1);
}
.area-select-item:not(.is-selected):active {
  --bg-to: var(--gl-2);
}
</style>
