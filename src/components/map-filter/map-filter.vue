<script setup lang="ts">
import { useRequest, useWatcher } from 'alova/client'
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import Api from '@/api'
import { IconRenderer } from '@/components/icon-renderer'
import { useMarkerStore } from '@/stores'
import AreaSelect from './components/area-select-composite/area-select.vue'
import FilterModeSelector from './components/filter-mode-selector.vue'

const markerStore = useMarkerStore()

// ============================== item type ==============================
const { data: rawItemTypeList } = useRequest(
  Api.main.item_type.listItemType({
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
  list.unshift({
    name: '全部',
    id: -1,
  })
  list.unshift({
    name: '已选择',
    id: -2,
  })
  return list
})

const selectedTypeIndex = ref<number>(0)

// ============================== item list ==============================
const { data: rawItemList, loading } = useWatcher(
  () => {
    const index = selectedTypeIndex.value
    const itemType = itemTypeList.value[index]
    const typeIdList = itemType.id === undefined ? [] : itemType.id > -1 ? [itemType.id] : []
    return Api.main.item.listItemIdByType({
      data: { typeIdList },
      transform: (data) => data.data?.record ?? [],
    })
  },
  [selectedTypeIndex],
  {
    initialData: [],
  },
)

const itemList = computed(() => {
  const index = selectedTypeIndex.value
  const itemType = itemTypeList.value[index]
  if (itemType.id === undefined) return []
  if (itemType.id < 0) return []
  return rawItemList.value
})

const selectedFilterModeIndex = ref(0)
</script>

<template>
  <div class="w-96 h-120 p-1 rounded-lg flex flex-col bg-[--gl-1] shadow-lg text-[--gl-6]">
    <!-- 筛选类型选择器 -->
    <FilterModeSelector v-model:selected-index="selectedFilterModeIndex" />

    <!-- TODO: 上方地区选择器 -->
    <AreaSelect />

    <!-- 下方区域 -->
    <!-- TODO: 物品搜索 -->
    <!-- <div class="bg-[--gl-2] rounded-md mb-1">
      <input
        :class="[
          'w-full h-9 px-3 py-1 bg-[--gl-2] rounded-md',
          'text-sm leading-6.5',
          'placeholder-text-sm',
          'outline-[--gl-3]',
        ]"
        :placeholder="`在 ${itemTypeList[selectedTypeIndex]?.name} 中检索`"
      />
    </div> -->

    <!-- <div class="flex-1 flex overflow-hidden rounded-md bg-[--gl-1] shadow">
      <ScrollAreaRoot class="shrink-0 w-40 overflow-hidden [--scrollbar-size:0.5rem]">
        <ScrollAreaViewport class="w-full h-full">
          <div
            v-for="(itemType, index) in itemTypeList"
            :key="itemType.id"
            :class="[
              styleClass.itemCommon,
              index === selectedTypeIndex ? styleClass.itemSelected : styleClass.itemUnSelected,
            ]"
            @click="selectedTypeIndex = index"
          >
            <IconRenderer
              class="shrink-0 w-8 h-8 border rounded-full border-[--gl-4] m-1"
              :icon-id="itemType.iconId"
            />
            <div class="flex-1 truncate leading-8">
              {{ itemType.name }}
            </div>
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar class="w-[--scrollbar-size]" orientation="vertical">
          <ScrollAreaThumb class="rounded-full bg-gray-300/50 hover:bg-gray-400/50" />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>

      <div class="flex-1">
        <div class="">
          <div v-show="loading">Loading</div>
          <div v-show="!loading" v-for="item in itemList" :key="item.id">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
