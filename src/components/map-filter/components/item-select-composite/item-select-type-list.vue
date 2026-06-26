<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import type { ItemVo } from '@/api/services/main/globals'
import { RegularBulletedList, RegularCheckList } from '@/ui/g-icons'
import IconSelectItem from './item-selec-item.vue'

defineProps<{
  itemTypeList: ItemVo[]
  selectedTypeIndex: number | undefined
  loading?: boolean
  getTypeSelectedCount: (typeId: number | undefined) => number
}>()

const emit = defineEmits<{
  select: [typeId: number]
}>()
</script>

<template>
  <ScrollAreaRoot
    class="w-40 shrink-0 overflow-hidden [--scrollbar-size:0.5rem] border-r border-[--gl-1]"
  >
    <ScrollAreaViewport class="w-full h-full">
      <IconSelectItem
        :item="{ id: -1, name: '已选物品' }"
        :selected="selectedTypeIndex === -1"
        @click="emit('select', -1)"
      >
        <template #icon>
          <RegularCheckList class="size-6 p-1" />
        </template>
        <template v-if="getTypeSelectedCount(-1) > 0" #suffix>
          <span
            class="ml-auto shrink-0 rounded-full bg-[--color-brand-5] px-1.5 text-xs leading-5 text-white"
          >
            {{ getTypeSelectedCount(-1) }}
          </span>
        </template>
      </IconSelectItem>
      <IconSelectItem
        :item="{ id: -2, name: '全部分类' }"
        :selected="selectedTypeIndex === -2"
        @click="emit('select', -2)"
      >
        <template #icon>
          <RegularBulletedList class="size-6 p-1" />
        </template>
        <template v-if="getTypeSelectedCount(-2) > 0" #suffix>
          <span
            class="ml-auto shrink-0 rounded-full bg-[--color-brand-5] px-1.5 text-xs leading-5 text-white"
          >
            {{ getTypeSelectedCount(-2) }}
          </span>
        </template>
      </IconSelectItem>
      <template v-if="loading">
        <div v-for="i in 5" :key="i" class="h-10 flex items-center gap-2 px-3">
          <div class="size-6 rounded-full animate-pulse bg-[--gl-2]" />
          <div class="h-4 flex-1 rounded animate-pulse bg-[--gl-2]" />
        </div>
      </template>
      <template v-else>
        <IconSelectItem
          v-for="itemType in itemTypeList"
          :key="itemType.id"
          :item="itemType"
          :selected="selectedTypeIndex === itemType.id"
          @click="emit('select', itemType.id!)"
        >
          <template v-if="getTypeSelectedCount(itemType.id) > 0" #suffix>
            <span
              class="ml-auto shrink-0 rounded-full bg-[--color-brand-5] px-1.5 text-xs leading-5 text-white"
            >
              {{ getTypeSelectedCount(itemType.id) }}
            </span>
          </template>
        </IconSelectItem>
      </template>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar class="w-[--scrollbar-size]" orientation="vertical">
      <ScrollAreaThumb class="rounded-full bg-gray-300/50 hover:bg-gray-400/50" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
