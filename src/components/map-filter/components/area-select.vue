<script setup lang="ts">
// 地区选择器组件
import { useRequest } from 'alova/client'
import Api from '@/api'
import type { AreaVo } from '@/api/services/main/globals'
import { useIcon } from '@/hooks/use-icon'
import { RegularLocation } from '@/ui/g-icons'
import AreaSelectPanel from './area-select-panel.vue'

const parentAreaId = ref<number>()
const childAreaId = ref<number>()
const isExpanded = ref(false)

// 选择态中的临时值
const pendingParentId = ref<number>()
const pendingChildId = ref<number>()

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

const parentAreaList = computed(() => {
  return areaSource.value.filter(({ parentId: pid }) => {
    return pid === undefined || pid < 0
  })
})

const childAreaList = computed(() => {
  const pid = pendingParentId.value
  if (pid === undefined) {
    return []
  }
  return areaSource.value.filter(({ isFinal, parentId }) => {
    return isFinal && parentId === pid
  })
})

const selectedParent = computed(() => areaSource.value.find((a) => a.id === parentAreaId.value))

const selectedChild = computed(() => areaSource.value.find((a) => a.id === childAreaId.value))

const { url: childIconUrl } = useIcon(computed(() => selectedChild.value?.iconId))

const parentFirstChildId = computed(() => childAreaList.value[0]?.id)

// 跳过下次父级变更时的子级自动切换（用于初始化或用户主动选择父级时）
let skipParentWatch = false

watch(pendingParentId, () => {
  if (skipParentWatch) {
    skipParentWatch = false
    return
  }
  pendingChildId.value = parentFirstChildId.value
})

function expand() {
  skipParentWatch = true
  pendingParentId.value = parentAreaId.value
  pendingChildId.value = childAreaId.value ?? parentFirstChildId.value
  isExpanded.value = true
}

function collapse() {
  isExpanded.value = false
}
const toggle = () => {
  return isExpanded.value ? collapse() : expand()
}

function selectParent(area: AreaVo) {
  if (pendingParentId.value === area.id) return
  pendingParentId.value = area.id
  // 同步更新子地区选择，避免依赖 watch 异步更新导致的延迟
  pendingChildId.value = childAreaList.value[0]?.id
}

function selectChild(area: AreaVo) {
  pendingChildId.value = area.id
  parentAreaId.value = pendingParentId.value
  childAreaId.value = area.id
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
  <div :class="['relative shrink-0 select-none', 'text-[--gl-6]']">
    <!-- 回显态 -->
    <div
      v-if="!isExpanded"
      :style="{
        'view-transition-name': `area-display-${id}`,
      }"
      :class="[
        'p-2.5 mb-1 rounded-xl',
        'flex items-center gap-3',
        'border border-[--gl-3]/60 cursor-pointer',
        'hover:border-[--color-brand-3] hover:shadow-md',
        'active:bg-[--gl-1]',
        'transition-all duration-200',
        'bg-gradient-to-br from-[--gl-0] via-transparent to-[--gl-0]/50',
      ]"
      @click="toggleExpand"
    >
      <!-- 子地区图标 -->
      <div
        class="size-16 shrink-0 rounded-xl bg-[--gl-1] overflow-hidden relative shadow-inner border border-[--gl-2]/50"
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
        <div v-else class="absolute inset-0 flex items-center justify-center text-[--gl-4]">
          <RegularLocation class="size-8" />
        </div>
      </div>

      <!-- 文本信息 -->
      <div class="min-w-0 flex-1">
        <div class="text-base font-semibold truncate text-[--gl-6]">
          <template v-if="selectedParent && selectedChild">
            {{ selectedParent.name }} <span class="text-[--gl-4] mx-1 font-normal">|</span>
            {{ selectedChild.name }}
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
      v-else
      :parent-area-list="parentAreaList"
      :child-area-list="childAreaList"
      :loading="areaLoading"
      :pending-parent-id="pendingParentId"
      :pending-child-id="pendingChildId"
      @select-parent="selectParent"
      @select-child="selectChild"
      @cancel="toggleExpand"
    />
  </div>
</template>
