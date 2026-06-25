<script setup lang="ts">
import { Method } from 'alova'
import { useRequest, useWatcher } from 'alova/client'
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import Api from '@/api'
import type { ItemSearchVo, ItemVo } from '@/api/services/main/globals'
import { RegularBulletedList, RegularCheckList, RegularSearch } from '@/ui/g-icons'
import IconSelectItem from './item-selec-item.vue'

const props = defineProps<{
  areaIdList?: number[]
}>()

const selectedTypeIndex = ref<number | undefined>(-2)
const selectedItemIdSet = ref<Set<number>>(new Set())
const searchText = ref('')

// 地区变化时重置已选物品
watch(
  () => props.areaIdList,
  () => {
    selectedItemIdSet.value = new Set()
    searchText.value = ''
  },
)

const { data: rawItemTypeList, loading: typeLoading } = useRequest(
  Api.main.item_type.listItemType({
    cacheFor: {
      mode: 'restore',
      expire: 60 * 60 * 1000,
    },
    transform: (data) => data.data ?? [],
  }),
  {
    initialData: [],
  },
)

const itemTypeList = computed(() => {
  const list = rawItemTypeList.value
    .filter(({ isFinal }) => isFinal)
    .toSorted((a, b) => (b.sortIndex ?? 0) - (a.sortIndex ?? 0))
  return list
})

class AreaEmptyError extends Error {
  name = 'AreaEmptyError'
}

// 切换地区后加载该地区的全部物品
const {
  data: rawItemList,
  loading: itemLoading,
  onError,
} = useWatcher(
  () => {
    return Api.main.item.listItemIdByType({
      cacheFor: {
        mode: 'restore',
        expire: 60 * 60 * 1000,
      },
      data: {
        typeIdList: [],
        areaIdList: props.areaIdList ?? [],
        size: 300,
        sort: ['sortIndex-'],
      },
      transform: (data) => data.data?.record ?? [],
    })
  },
  [() => props.areaIdList],
  {
    initialData: [],
    abortLast: true,
    immediate: false,
    middleware: ({ method }, next) => {
      if (!(method.data as ItemSearchVo)?.areaIdList?.length) {
        return
      }
      next()
    },
  },
)
onError((error) => {
  if (error instanceof AreaEmptyError) return
})

// 物品 id -> 物品索引 Map
const itemIdMap = computed(() => {
  const map = new Map<number, ItemVo>()
  const list = rawItemList.value
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.id !== undefined) {
      map.set(item.id, item)
    }
  }
  return map
})

// 切换左侧类型时前端筛选物品
const itemList = computed(() => {
  const typeId = selectedTypeIndex.value
  const allItems = rawItemList.value
  const query = searchText.value.trim().toLowerCase()

  let filtered: ItemVo[]

  // -1: 已选物品
  if (typeId === -1) {
    const set = selectedItemIdSet.value
    const result: ItemVo[] = []
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i]
      if (item.id !== undefined && set.has(item.id)) {
        result.push(item)
      }
    }
    filtered = result
  }
  // -2: 全部分类
  else if (typeId === -2) {
    filtered = allItems
  }
  // 按类型筛选
  else {
    const result: ItemVo[] = []
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i]
      const typeIds = item.typeIdList
      if (typeIds) {
        for (let j = 0; j < typeIds.length; j++) {
          if (typeIds[j] === typeId) {
            result.push(item)
            break
          }
        }
      }
    }
    filtered = result
  }

  // 按名称关键词筛选
  if (query) {
    return filtered.filter((item) => item.name?.toLowerCase().includes(query))
  }

  return filtered
})

// 切换物品选中状态
function toggleItemSelect(itemId: number | undefined) {
  if (itemId === undefined) return
  const set = new Set(selectedItemIdSet.value)
  if (set.has(itemId)) {
    set.delete(itemId)
  } else {
    set.add(itemId)
  }
  selectedItemIdSet.value = set
}

function isItemSelected(itemId: number | undefined) {
  return itemId !== undefined && selectedItemIdSet.value.has(itemId)
}

// 计算每个类型下已选物品的数量
const typeSelectedCountMap = computed(() => {
  const map = new Map<number, number>()
  const set = selectedItemIdSet.value

  for (const item of rawItemList.value) {
    if (item.id !== undefined && set.has(item.id) && item.typeIdList) {
      for (const typeId of item.typeIdList) {
        map.set(typeId, (map.get(typeId) || 0) + 1)
      }
    }
  }

  return map
})

// 获取类型已选数量
function getTypeSelectedCount(typeId: number | undefined) {
  if (typeId === undefined) return 0
  if (typeId === -1 || typeId === -2) return selectedItemIdSet.value.size
  return typeSelectedCountMap.value.get(typeId) || 0
}
</script>

<template>
  <div class="flex-1 flex flex-col overflow-hidden rounded-lg border border-[--gl-1] bg-[--gl-0]">
    <div class="shrink-0 p-2 border-b border-[--gl-1]">
      <div
        class="flex h-8 items-center gap-1.5 rounded-md border border-[--gl-2] bg-[--gl-1] px-2 transition-colors focus-within:border-[--color-brand-5]"
      >
        <RegularSearch class="size-4 shrink-0 text-[--gl-6]" />
        <input
          v-model="searchText"
          type="text"
          class="h-full flex-1 bg-transparent text-sm text-[--gl-12] outline-none placeholder:text-[--gl-6]"
          placeholder="搜索物品..."
        />
      </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <ScrollAreaRoot
        class="w-40 shrink-0 overflow-hidden [--scrollbar-size:0.5rem] border-r border-[--gl-1]"
      >
        <ScrollAreaViewport class="w-full h-full">
          <IconSelectItem
            :item="{ id: -1, name: '已选物品' }"
            :selected="selectedTypeIndex === -1"
            @click="selectedTypeIndex = -1"
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
            @click="selectedTypeIndex = -2"
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
          <template v-if="typeLoading">
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
              @click="selectedTypeIndex = itemType.id"
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

      <ScrollAreaRoot class="flex-1 overflow-hidden [--scrollbar-size:0.5rem]">
        <ScrollAreaViewport class="w-full h-full" style="container-type: size">
          <template v-if="itemLoading">
            <div v-for="i in 8" :key="i" class="h-10 flex items-center gap-2 px-3">
              <div class="size-6 rounded-full animate-pulse bg-[--gl-2]" />
              <div class="h-4 flex-1 rounded animate-pulse bg-[--gl-2]" />
            </div>
          </template>
          <template v-else-if="!areaIdList?.length">
            <div class="h-100cqh flex items-center justify-center text-sm text-[--gl-6]">
              请选择地区
            </div>
          </template>
          <template v-else-if="itemList.length === 0">
            <div class="h-100cqh flex items-center justify-center text-sm text-[--gl-6]">
              未检索到任何物品
            </div>
          </template>
          <template v-else>
            <IconSelectItem
              v-for="item in itemList"
              :key="item.id"
              :item="item"
              :selected="isItemSelected(item.id)"
              @click="toggleItemSelect(item.id)"
            />
          </template>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar class="w-[--scrollbar-size]" orientation="vertical">
          <ScrollAreaThumb class="rounded-full bg-gray-300/50 hover:bg-gray-400/50" />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
    </div>
  </div>
</template>
