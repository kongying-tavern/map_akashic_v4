<script setup lang="ts">
// 地区选择器组件
import type { AreaVo } from '@/api/services/main/globals'
import { useIcon } from '@/hooks/use-icon'
import { RegularLocation } from '@/ui/g-icons'
import AreaSelectPanel from './area-select-panel.vue'

const isExpanded = ref(false)
const selectedAreaCode = defineModel<string | undefined>('modelValue', {
  required: false,
  default: '',
})

const props = defineProps<{
  areaSource: AreaVo[]
  loading: boolean
}>()

const selectedParent = defineModel<AreaVo | undefined>('selectedParent', {
  required: false,
})

const selectedChild = defineModel<AreaVo | undefined>('selectedChild', {
  required: false,
})

const { url: childIconUrl } = useIcon(computed(() => selectedChild.value?.iconId))
const { url: parentIconUrl } = useIcon(computed(() => selectedParent.value?.iconId))

const expand = () => {
  isExpanded.value = true
}

const collapse = () => {
  isExpanded.value = false
}
const toggle = () => {
  return isExpanded.value ? collapse() : expand()
}

const handleSelectChild = (area: AreaVo) => {
  selectedAreaCode.value = area.code
  toggle()
}
</script>

<template>
  <div class="relative shrink-0 select-none text-[--gl-7]">
    <!-- 回显态 -->
    <div
      :class="[
        'p-2.5 mb-1 rounded-xl flex items-center gap-3',
        'cursor-pointer hover:bg-[--gl-0] active:bg-[--gl-2]',
        // selectedChild ? 'text-[--color-brand-5]' : 'text-[--gl-6]',
      ]"
      @click="toggle"
    >
      <!-- 子地区图标 -->
      <div class="size-16 shrink-0 rounded-lg bg-[--gl-1] overflow-hidden relative">
        <div
          v-if="childIconUrl || parentIconUrl"
          class="absolute inset-0 bg-current"
          :style="{
            mask: `url(${childIconUrl ?? parentIconUrl})`,
            maskSize: 'contain',
          }"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <RegularLocation class="size-8" />
        </div>
      </div>

      <!-- 文本信息 -->
      <div class="min-w-0 flex-1">
        <div class="text-base font-semibold truncate">
          <template v-if="selectedParent && selectedChild">
            <span>
              {{ selectedParent.name }}
            </span>
            <span class="mx-1 font-normal">|</span>
            <span>
              {{ selectedChild.name }}
            </span>
          </template>
          <template v-else>
            <span class="font-normal">选择地区</span>
          </template>
        </div>
        <div class="text-sm truncate mt-0.5">
          {{ selectedChild?.code ?? '---' }}
        </div>
      </div>
    </div>

    <!-- 选择态 -->
    <AreaSelectPanel
      :open="isExpanded"
      :area-source="props.areaSource"
      :loading="props.loading"
      :selected-parent="selectedParent"
      :selected-child="selectedChild"
      @cancel="toggle"
      @select-child="handleSelectChild"
    />
  </div>
</template>
