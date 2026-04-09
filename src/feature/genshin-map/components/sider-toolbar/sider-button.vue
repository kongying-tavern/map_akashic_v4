<script setup lang="ts">
import type { Component } from 'vue'
import { GSquircle } from '@/ui/g-shape'

const props = defineProps<{
  selected?: boolean
  icon: Component
  label: string
}>()
</script>

<template>
  <GSquircle
    :w="4 * 14"
    :h="4 * 14"
    :r="4 * 3"
    fill="transparent"
    :class="[
      'sider-button-vars sider-button',
      'w-14 h-14 m-1 relative',
      props.selected && 'is-selected',
    ]"
  >
    <!-- 按钮图标 -->
    <component :is="props.icon" class="sider-button-icon p-4.5" />
    <!-- 按钮文本 -->
    <div
      v-show="!props.selected"
      class="sider-button-text absolute left-0 bottom-0 w-full text-center text-xs"
    >
      {{ props.label }}
    </div>
  </GSquircle>
</template>

<style scoped>
@property --icon-move-y {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

@property --text-move-y {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

@property --icon-fill-progress {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 0%;
}

.sider-button-vars {
  --icon-move-y: -15%;
  --icon-fill-progress: 0%;
  --text-move-y: -40%;
}

.sider-button {
  transition:
    --icon-move-y 150ms cubic-bezier(0.34, 1.56, 0.64, 1),
    --icon-fill-progress 0s ease-out;
}

.sider-button::before {
  position: absolute;
  content: '';
  pointer-events: none;
  left: 0;
  top: 50%;
  transform: translateY(-100%);
  border-radius: 0.25rem;
  width: 0.25rem;
  height: 1.25rem;
  z-index: 10;
  background-color: var(--text-color);
  opacity: 0;
}
.sider-button.is-selected::before {
  opacity: 1;
  transform: translateY(-50%);
  transition: all 150ms ease;
}

.sider-button:hover {
  background-color: var(--item-hover-bg);
}

.sider-button:active {
  --icon-move-y: -20%;
  color: var(--text-active-color);
  background-color: var(--item-active-bg);
}

.sider-button.is-selected {
  --icon-move-y: 0%;
  --icon-fill-progress: 100%;
  background-color: var(--item-selected-bg);
  transition:
    --icon-move-y 150ms cubic-bezier(0.34, 1.56, 0.64, 1),
    --icon-fill-progress 150ms ease-out;
}

.sider-button-icon {
  transform: translateY(var(--icon-move-y));
}

.sider-button-text {
  transform: translateY(var(--text-move-y));
}
</style>
