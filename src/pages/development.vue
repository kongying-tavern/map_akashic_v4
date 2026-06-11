<script setup lang="ts">
import { useRequest, useWatcher } from 'alova/client'
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import Api from '@/api'
import { IconRenderer } from '@/components/icon-renderer'

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

const styleClass = {
  itemCommon: ['flex overflow-hidden text-sm', 'select-none cursor-pointer'].join(' '),
  itemUnSelected: ['hover:bg-[--gl-2] active:bg-[--gl-3]'].join(' '),
  itemSelected: ['bg-[--color-brand-1] text-[--color-brand-5]'].join(' '),
} as const

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
const filterOptions = [
  { label: '基本筛选', value: 'basic' },
  { label: '高阶筛选', value: 'advanced' },
]
</script>

<template>
  <div
    class="page-development w-full h-full bg-[image:linear-gradient(135deg,#a9d0fe,#f4eef5,#a9d0fe)]"
  >
    <div
      class="panel w-96 h-120 p-1 rounded-lg flex flex-col absolute left-8 top-8 bg-[--gl-1]/40 shadow-lg"
    >
      <!-- 筛选类型选择器 -->
      <div class="flex gap-1 mb-1">
        <div
          v-for="(filter, index) in filterOptions"
          :key="filter.value"
          class="filter-type-item relative text-sm px-3 h-8 leading-8 rounded-md select-none"
          :class="[
            index === selectedFilterModeIndex
              ? 'bg-[--color-brand-1] text-[--color-brand-5] [--corner-color:--gl-1] shadow'
              : 'bg-transparent text-[--gl-6] hover:bg-[--gl-1]/50 [--corner-color:transparent]',
          ]"
          @pointerdown="selectedFilterModeIndex = index"
        >
          {{ filter.label }}
        </div>
      </div>

      <!-- TODO: 上方地区选择器 -->
      <div
        class="h-24 shrink-0 bg-[--gl-1] p-1 mb-1 rounded-md select-none hover:bg-[--gl-2] active:bg-[--gl-3] relative flex shadow"
      >
        <div class="w-1/3 grid place-content-center">Country</div>
        <div class="w-1px h-full bg-gray-400 rotate-15deg" />
        <div class="w-2/3 grid place-content-center">Zone</div>
      </div>

      <!-- 下方区域 -->
      <!-- TODO: 物品搜索 -->
      <div class="p-2 bg-[--gl-1] rounded-md mb-1 shadow">
        <input
          :class="[
            'w-full h-9 px-3 py-1 bg-[--gl-2] rounded-full',
            // 'border border-[--gl-5] rounded-full',
            'text-sm leading-6.5',
            'placeholder-text-sm',
            'outline-[--gl-5]',
          ]"
          :placeholder="`在 ${itemTypeList[selectedTypeIndex]?.name} 中检索`"
        />
      </div>

      <div class="flex-1 flex overflow-hidden rounded-md bg-[--gl-1] shadow">
        <!-- 左侧物品分类选择器 -->
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

        <!-- 右侧区域 -->
        <div class="flex-1">
          <!-- TODO: 物品选择器 -->
          <div class="">
            <div v-show="loading">Loading</div>
            <div v-show="!loading" v-for="item in itemList" :key="item.id">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
