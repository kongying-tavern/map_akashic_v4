<script setup lang="ts">
import { ListboxContent, ListboxItem, ListboxRoot, ListboxVirtualizer } from 'reka-ui'
import type { ItemVo } from '@/api/services/main/globals'
import IconSelectItem from './item-selec-item.vue'

defineProps<{
  itemList: ItemVo[]
  selectedIds: number[]
  loading?: boolean
  hasArea: boolean
}>()

const emit = defineEmits<{
  toggle: [itemId: number]
}>()
</script>

<template>
  <ListboxRoot class="flex-1 overflow-hidden" style="scrollbar-width: thin">
    <ListboxContent class="h-full overflow-y-auto" style="scrollbar-width: thin">
      <template v-if="loading">
        <div v-for="i in 8" :key="i" class="h-10 flex items-center gap-2 px-3">
          <div class="size-6 rounded-full animate-pulse bg-[--gl-2]" />
          <div class="h-4 flex-1 rounded animate-pulse bg-[--gl-2]" />
        </div>
      </template>
      <template v-else-if="!hasArea">
        <div class="h-full flex items-center justify-center text-sm text-[--gl-6]">请选择地区</div>
      </template>
      <template v-else-if="itemList.length === 0">
        <div class="h-full flex items-center justify-center text-sm text-[--gl-6]">
          未检索到任何物品
        </div>
      </template>
      <ListboxVirtualizer
        v-else
        :options="itemList"
        :estimate-size="40"
        :text-content="(item: ItemVo) => item.name ?? ''"
      >
        <template #default="{ option }">
          <ListboxItem
            :value="option.id!"
            class="w-full"
            @select.prevent="() => emit('toggle', option.id!)"
          >
            <IconSelectItem :item="option" :selected="selectedIds.includes(option.id!)" />
          </ListboxItem>
        </template>
      </ListboxVirtualizer>
    </ListboxContent>
  </ListboxRoot>
</template>
