<script setup lang="ts" generic="T">
import { ListboxItem } from 'reka-ui'

defineProps<{
  item: T
  label: string
  code: string
  selected?: boolean
}>()

const emits = defineEmits<{
  select: [item: T]
}>()
</script>

<template>
  <ListboxItem :value="code" class="w-full h-15 px-1 py-1 bg-transparent">
    <div
      class="focus:outline-[--color-brand-3]"
      tabindex="0"
      :class="[
        'rounded-md w-full h-full pl-2 pr-3 pt-1 outline-2 outline-transparent',
        'border border-[--gl-3]',
        selected ? 'bg-[--color-brand-1]' : 'bg-[--gl-1] hover:bg-[--gl-2] active:bg-[--gl-3]',
      ]"
      @click.stop="() => emits('select', item)"
    >
      <div class="text-base truncate">{{ label }}</div>
      <div class="text-xs">{{ code }}</div>
    </div>
  </ListboxItem>
</template>
