<script setup lang="ts">
import { useRequest, useWatcher } from 'alova/client'
import Api from '@/api'
import type { ItemSearchVo, ItemVo } from '@/api/services/main/globals'
import { RegularSearch } from '@/ui/g-icons'
import ItemSelectItemList from './item-select-item-list.vue'
import ItemSelectTypeList from './item-select-type-list.vue'

const props = defineProps<{
  areaIdList?: number[]
}>()

const selectedTypeIndex = ref<number | undefined>(-2)
const selectedItemIds = ref<number[]>([])
const searchText = ref('')

// 地区变化时重置已选物品
watch(
  () => props.areaIdList,
  () => {
    selectedItemIds.value = []
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

// 切换左侧类型时前端筛选物品
const itemList = computed(() => {
  const typeId = selectedTypeIndex.value
  const allItems = rawItemList.value
  const query = searchText.value.trim().toLowerCase()

  let filtered: ItemVo[]

  // -1: 已选物品
  if (typeId === -1) {
    const selectedSet = new Set(selectedItemIds.value)
    const result: ItemVo[] = []
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i]
      if (item.id !== undefined && selectedSet.has(item.id)) {
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
  const idx = selectedItemIds.value.indexOf(itemId)
  if (idx === -1) {
    selectedItemIds.value = [...selectedItemIds.value, itemId]
  } else {
    selectedItemIds.value = selectedItemIds.value.filter((id) => id !== itemId)
  }
}

// 计算每个类型下已选物品的数量
const typeSelectedCountMap = computed(() => {
  const map = new Map<number, number>()
  const selectedSet = new Set(selectedItemIds.value)

  for (const item of rawItemList.value) {
    if (item.id !== undefined && selectedSet.has(item.id) && item.typeIdList) {
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
  if (typeId === -1 || typeId === -2) return selectedItemIds.value.length
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
      <ItemSelectTypeList
        :item-type-list="itemTypeList"
        :selected-type-index="selectedTypeIndex"
        :loading="typeLoading"
        :get-type-selected-count="getTypeSelectedCount"
        @select="(id: number) => (selectedTypeIndex = id)"
      />

      <ItemSelectItemList
        :item-list="itemList"
        :selected-ids="selectedItemIds"
        :loading="itemLoading"
        :has-area="!!areaIdList?.length"
        @toggle="toggleItemSelect"
      />
    </div>
  </div>
</template>
