<script setup lang="ts">
import { ColorFieldInput, ColorFieldRoot } from 'reka-ui'

defineProps<{
  hex: string
  l: number
  c: number
  h: number
}>()

defineEmits<{
  'update:hex': [value: string]
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      class="h-7 w-7 shrink-0 rounded ring-1 ring-neutral-300 dark:ring-neutral-600"
      :style="{ backgroundColor: hex }"
    />
    <ColorFieldRoot :model-value="hex" @update:model-value="$emit('update:hex', $event)">
      <ColorFieldInput
        class="h-7 w-20 rounded bg-transparent px-1.5 font-mono text-xs ring-1 ring-neutral-300 dark:ring-neutral-600"
      />
    </ColorFieldRoot>
    <span class="text-xs tabular-nums opacity-50">
      L:{{ (l * 100).toFixed(0) }}% C:{{ c.toFixed(2) }} H:{{ Math.round(h) }}
    </span>
  </div>
</template>
