<script setup lang="ts">
import { useRequest, useWatcher } from 'alova/client'
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import Api from '@/api'
import { useIconStore } from '@/stores'

const iconStore = useIconStore()

// ============================== item type ==============================
const { data: rawItemTypeList } = useRequest(
  Api.main.item_type.listItemType({
    transform: (data) => data.data ?? [],
  }),
  {
    initialData: [],
  },
)

const transformedTypeList = computed(() => {
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

const selectedItemTypeId = ref<number | undefined>(-1)

const styleClass = {
  itemCommon: ['flex overflow-hidden text-sm', 'select-none cursor-pointer'].join(' '),
  itemUnSelected: ['hover:bg-[--gl-2] active:bg-[--gl-3]'].join(' '),
  itemSelected: ['bg-[--gl-5] text-[--gl-1]'].join(' '),
} as const

// ============================== item list ==============================
const { data: rawItemList } = useWatcher(() => {
  const typeId = selectedItemTypeId.value
  const typeIdList = typeId === undefined ? [] : typeId > -1 ? [typeId] : []
  return Api.main.item.listItemIdByType({
    data: { typeIdList },
  })
}, [selectedItemTypeId])

console.log('iconStore.iconList', iconStore.iconList)
</script>

<template>
  <div class="page-development">
    <div class="border w-120 h-96 m-8 rounded flex flex-col">
      <!-- TODO: 上方地区选择器 -->
      <div class="border-b w-full h-12 shrink-0">Area Zone</div>

      <!-- 下方区域 -->
      <div class="flex-1 flex overflow-hidden">
        <!-- 左侧物品分类选择器 -->
        <ScrollAreaRoot class="shrink-0 w-48 overflow-hidden [--scrollbar-size:8px] border-r">
          <ScrollAreaViewport class="w-full h-full">
            <div
              v-for="itemType in transformedTypeList"
              :key="itemType.id"
              :class="[
                styleClass.itemCommon,
                itemType.id === selectedItemTypeId
                  ? styleClass.itemSelected
                  : styleClass.itemUnSelected,
              ]"
              @click="selectedItemTypeId = itemType.id"
            >
              <div class="shrink-0 w-8 h-8 border m-1"></div>
              <div class="flex-1 truncate leading-8">
                {{ itemType.name }}
              </div>
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar
            class="bg-gray-100 w-[--scrollbar-size] p-0.5"
            orientation="vertical"
          >
            <ScrollAreaThumb class="rounded-full bg-gray-300 hover:bg-gray-400 transition-colors" />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>

        <!-- 右侧区域 -->
        <div class="flex-1">
          <!-- TODO: 物品搜索 -->
          <div class="p-2 border-b">
            <input
              :class="[
                'w-full h-9 px-3 py-1',
                'border border-[--gl-5] rounded-full',
                'text-sm leading-6.5',
                'placeholder-text-sm',
                'outline-[--gl-5]',
              ]"
              value="请输入文本"
              placeholder="在 获取方式 分类中检索"
            />
          </div>

          <!-- TODO: 物品选择器 -->
          <div class="">items</div>
        </div>
      </div>
    </div>
  </div>
</template>
