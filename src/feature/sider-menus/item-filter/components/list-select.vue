<script lang="ts">
export interface ListSelectProps<T> {
  options: T[]
  estimateSize?: number
  getLabel: (item: T) => string
  getValue: (item: T) => string
}
</script>

<script setup lang="ts" generic="T">
import { ListboxRoot, ListboxContent, ListboxVirtualizer, ListboxItem } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<ListSelectProps<T>>(), {
  estimateSize: 60,
})

const emits = defineEmits<{
  select: [item: T]
}>()

interface ListItem {
  original: T
  value: string
  label: string
}

const modelValue = defineModel<string>('modelValue', {
  required: false,
})

const listItems = computed<ListItem[]>(() =>
  (props.options ?? []).map((item) => ({
    original: item,
    value: props.getValue(item),
    label: props.getLabel(item),
  })),
)
</script>

<template>
  <ListboxRoot style="scrollbar-width: thin" :data-value="modelValue">
    <ListboxContent>
      <ListboxVirtualizer
        :options="listItems"
        :estimate-size="estimateSize"
        :text-content="(item) => item.label"
      >
        <template #default="{ option }">
          <slot
            :item="option.original"
            :label="option.label"
            :value="option.value"
            :selected="option.value === modelValue"
          />
        </template>
      </ListboxVirtualizer>
    </ListboxContent>
  </ListboxRoot>
</template>
