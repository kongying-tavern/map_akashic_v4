<script setup lang="ts">
import { useRequest } from 'alova/client'
import { useI18n } from 'vue-i18n'
import Api from '@/api'
import type { AreaVo } from '@/api/services/main/globals'
import { useRouteQuery } from '@/pages/map/index.query'
import { RegularWorld, RegularChromeClose } from '@/ui/g-icons'
import AreaSelectItem from './area-select-item.vue'
import FilterItem from './filter-item.vue'
import ListSelect from './list-select.vue'

const { t } = useI18n()
const query = useRouteQuery()

const { data: areaSourceList } = useRequest(
  Api.main.area.listArea({
    data: { isTraverse: true },
    transform: (res) => {
      return res.data ?? []
    },
  }),
  {
    initialData: [],
  },
)

const areaMap = computed(() => {
  return areaSourceList.value.reduce((map, area) => {
    map.set(area.code ?? '', area)
    map.set(`${area.id}`, area)
    return map
  }, new Map<string, AreaVo>())
})

const step = ref(0)
const areaCodePath = ref<string[]>([])
watch(
  areaMap,
  () => {
    if (!query.value.area) return
    const storagedArea = areaMap.value.get(query.value.area)
    if (!storagedArea) return
    const storagedParent = areaMap.value.get(`${storagedArea.parentId}`)
    if (!storagedParent) return
    areaCodePath.value = [storagedParent.code ?? '', storagedArea.code ?? '']
    step.value = 1
  },
  { immediate: true },
)

/** 候选父级地区 */
const parentArea = computed(() => {
  const parentAreaCode = areaCodePath.value[0]
  if (!parentAreaCode) return
  return areaMap.value.get(parentAreaCode)
})

/** 候选子级地区 */
const childArea = computed(() => {
  const childAreaCode = areaCodePath.value[1]
  if (!childAreaCode) return
  return areaMap.value.get(childAreaCode)
})

/** 当前生效地区 */
const targetArea = computed({
  get: () => {
    if (!query.value.area) return
    return areaMap.value.get(query.value.area)
  },
  set: (area) => {
    if (!area) {
      query.value.area = undefined
      return
    }
    query.value.area = area.code
  },
})

const selecTargetArea = (area: AreaVo) => {
  if (!areaCodePath.value[0]) return
  targetArea.value = area
}

const parentAreaList = computed(() => {
  return areaSourceList.value.filter(({ parentId }) => (parentId ?? -1) < 0)
})

const childAreaList = computed(() => {
  const parentAreaId = parentArea.value?.id
  if (!parentAreaId) return []
  return areaSourceList.value.filter(({ parentId }) => parentId === parentAreaId)
})
</script>

<template>
  <FilterItem :title="t('sider.filter.area.title')" class="m-3 mt-0">
    <template #icon>
      <RegularWorld class="size-9 p-2.5" />
    </template>

    <template #summary="{ open }">
      <!-- 展开情况下显示步骤组件 -->
      <div v-if="open" class="mx-1 flex items-center gap-1 cursor-default" @click.stop="">
        <!-- 步骤 1: 选择大区域 -->
        <div
          class="flex-1 min-w-0 flex flex-col items-center gap-1 py-1 px-1.5 rounded-md transition-colors"
          :class="[
            areaCodePath.length > 0 ? 'cursor-pointer hover:bg-[--gl-2]' : '',
            parentArea ? 'bg-[--color-brand-1]' : '',
          ]"
          @click="step = 0"
        >
          <div
            :class="[
              'size-5 rounded-full flex items-center justify-center text-xs border shrink-0',
              parentArea
                ? 'bg-[--color-brand-3] text-white border-[--color-brand-3]'
                : 'bg-[--gl-2] text-[--gl-6] border-[--gl-3]',
            ]"
          >
            <span v-if="parentArea">✓</span>
            <span v-else>1</span>
          </div>
          <span
            class="text-xs text-center w-full truncate"
            :class="[parentArea ? 'text-[--color-brand-7]' : 'text-[--gl-6]']"
          >
            {{ parentArea?.name || 'Region' }}
          </span>
        </div>

        <!-- 连接线 -->
        <div class="flex items-center shrink-0">
          <div class="w-4 h-px" :class="[childArea ? 'bg-[--color-brand-3]' : 'bg-[--gl-3]']" />
        </div>

        <!-- 步骤 2: 选择子区域 -->
        <div
          class="flex-1 min-w-0 flex flex-col items-center gap-1 py-1 px-1.5 rounded-md transition-colors"
          :class="[childArea ? 'bg-[--color-brand-1]' : '']"
        >
          <div
            :class="[
              'size-5 rounded-full flex items-center justify-center text-xs border shrink-0',
              childArea
                ? 'bg-[--color-brand-3] text-white border-[--color-brand-3]'
                : parentArea
                  ? 'bg-[--gl-1] text-[--color-brand-7] border-[--color-brand-3]'
                  : 'bg-[--gl-2] text-[--gl-6] border-[--gl-3]',
            ]"
          >
            <span v-if="childArea">✓</span>
            <span v-else>2</span>
          </div>
          <span
            class="text-xs text-center w-full truncate"
            :class="[childArea ? 'text-[--color-brand-7]' : 'text-[--gl-6]']"
          >
            {{ childArea?.name || 'Area' }}
          </span>
        </div>
      </div>

      <!-- 折叠情况下显示最终选择的地区 tag -->
      <div v-else-if="targetArea" class="px-2.5 pt-0.5 pb-2.5">
        <div
          :class="[
            'hover-clip w-fit p-1 py-1.5 rounded-full flex items-center gap-1 px-2 bg-[--color-brand-1] text-[--color-brand-7]',
            'hover:bg-[--color-brand-2] active:bg-[--color-brand-1]',
          ]"
          @click.stop=""
        >
          <div class="leading-4">{{ targetArea.name }}</div>
        </div>
      </div>
    </template>

    <template #default>
      <div class="h-50dvh bg-[--gl-2] border border-[--gl-3] rounded m-1">
        <ListSelect
          v-show="step === 0"
          v-model="areaCodePath[0]"
          v-slot="{ label, item, value, selected }"
          class="h-full overflow-auto py-0.5"
          :options="parentAreaList"
          :get-label="(area) => area.name ?? ''"
          :get-value="(area) => area.code ?? ''"
        >
          <AreaSelectItem
            :label="label"
            :code="value"
            :item="item"
            :selected="selected"
            @select="step = 1"
          />
        </ListSelect>

        <ListSelect
          v-show="step === 1"
          v-model="areaCodePath[1]"
          v-slot="{ label, item, value, selected }"
          class="h-full overflow-auto py-0.5"
          :options="childAreaList"
          :get-label="(item) => item.name ?? ''"
          :get-value="(item) => item.code ?? ''"
        >
          <AreaSelectItem
            :label="label"
            :code="value"
            :item="item"
            :selected="selected"
            @select="selecTargetArea"
          />
        </ListSelect>
      </div>
    </template>
  </FilterItem>
</template>
