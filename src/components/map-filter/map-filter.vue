<script setup lang="ts">
import { useAreaStore } from '@/stores'
import AreaSelect from './components/area-select-composite/area-select.vue'
import FilterModeSelector from './components/filter-mode-selector.vue'
import ItemSelect from './components/item-select-composite/item-select.vue'

const areaStore = useAreaStore()

const selectedAreaCode = defineModel<string | undefined>('areaCode', {
  required: false,
  default: '',
})

const selectedParent = computed(() => areaStore.getParentArea(selectedAreaCode.value))
const selectedChild = computed(() => areaStore.getAreaByCode(selectedAreaCode.value))

const selectedFilterModeIndex = ref(0)
</script>

<template>
  <div
    :class="[
      'map-filter',
      'w-96 h-120 p-1 rounded-lg flex flex-col bg-[--bg] shadow-lg text-[--text-color]',
    ]"
  >
    <!-- 筛选类型 -->
    <FilterModeSelector v-model:selected-index="selectedFilterModeIndex" />

    <!-- 地区选择器 -->
    <AreaSelect
      v-model="selectedAreaCode"
      :area-source="areaStore.areaSource"
      :loading="areaStore.loading"
      v-model:selected-parent="selectedParent"
      v-model:selected-child="selectedChild"
    />

    <!-- 物品选择器（含类型） -->
    <ItemSelect :area-id-list="selectedChild ? [selectedChild.id!] : []" />
  </div>
</template>

<style lang="css" scoped>
.map-filter {
  --bg: light-dark(oklch(0.99 0 0), oklch(0.31 0.02 251.5));
  --text-color: light-dark(oklch(0.38 0.02 269.72), oklch(0.92 0.02 83.06));
}
</style>
