<script setup lang="ts">
// 地区选择器组件
import { useRequest } from 'alova/client'
import Api from '@/api'
import type { AreaVo } from '@/api/services/main/globals'
import { useIcon } from '@/hooks/use-icon'
import { RegularLocation } from '@/ui/g-icons'
import AreaSelectPanel from './area-select-panel.vue'

const isExpanded = ref(false)
const selectedAreaCode = defineModel<string | undefined>('modelValue', {
  required: false,
  default: '',
})

const { data: areaSource, loading: areaLoading } = useRequest(
  Api.main.area.listArea({
    data: {
      isTraverse: true,
    },
    transform: (res) => {
      return res.data ?? []
    },
  }),
  {
    initialData: [],
  },
)

const areaCodeMap = computed(() => {
  return areaSource.value.reduce((map, area) => {
    return map.set(area.code, area)
  }, new Map<string | undefined, AreaVo>())
})

const selectedParent = computed(() => {
  const code = selectedAreaCode.value
  if (!code) return
  const [_, zone] = code.split(':')
  const parentCode = `C:${zone}`
  return areaCodeMap.value.get(parentCode)
})

const selectedChild = computed(() => {
  const code = selectedAreaCode.value
  if (!code) return
  return areaCodeMap.value.get(code)
})

const { url: childIconUrl } = useIcon(computed(() => selectedChild.value?.iconId))

function expand() {
  isExpanded.value = true
}

function collapse() {
  isExpanded.value = false
}
const toggle = () => {
  return isExpanded.value ? collapse() : expand()
}

function handleSelectChild(area: AreaVo) {
  selectedAreaCode.value = area.code
  collapse()
}

function toggleExpand() {
  if (!document.startViewTransition) {
    toggle()
    return
  }
  document.startViewTransition(() => {
    toggle()
    return nextTick()
  })
}

const id = useId()
</script>

<template>
  <div class="relative shrink-0 select-none text-[--gl-7]">
    <!-- 回显态 -->
    <div
      class="p-2.5 mb-1 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-[--gl-0] active:bg-[--gl-2]"
      @click="toggleExpand"
    >
      <!-- 子地区图标 -->
      <div
        class="size-16 shrink-0 rounded-lg bg-[--gl-1] overflow-hidden relative border border-[--gl-2]/50"
      >
        <div
          v-if="childIconUrl"
          class="absolute inset-0 bg-contain bg-center bg-no-repeat"
          :style="{
            backgroundImage: `url(${childIconUrl})`,
            backgroundColor: 'var(--gl-6)',
            backgroundBlendMode: 'multiply',
          }"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <RegularLocation class="size-8" />
        </div>
      </div>

      <!-- 文本信息 -->
      <div class="min-w-0 flex-1">
        <div class="text-base font-semibold truncate text-[--gl-6]">
          <template v-if="selectedParent && selectedChild">
            <span>{{ selectedParent.name }}</span>
            <span class="text-[--gl-4] mx-1 font-normal">|</span>
            <span>{{ selectedChild.name }}</span>
          </template>
          <template v-else>
            <span class="text-[--gl-4] font-normal">选择地区</span>
          </template>
        </div>
        <div class="text-sm text-[--gl-5] truncate mt-0.5">
          {{ selectedChild?.code ?? '---' }}
        </div>
      </div>
    </div>

    <!-- 选择态 -->
    <AreaSelectPanel
      :open="isExpanded"
      :area-source="areaSource"
      :loading="areaLoading"
      @cancel="toggleExpand"
      @select-child="handleSelectChild"
    />
  </div>
</template>
