<script lang="ts">
export interface AreaSelectPanelProps {
  areaSource: AreaVo[]
  loading?: boolean
  open?: boolean
}
</script>

<script setup lang="ts">
// 地区选择面板组件
import { ListboxRoot, ListboxContent, ListboxVirtualizer, ListboxItem } from 'reka-ui'
import type { AreaVo } from '@/api/services/main/globals'
import { useIconStore } from '@/stores'
import { RegularWorld, RegularLocation } from '@/ui/g-icons'
import AreaSelectItem from './area-select-item.vue'

const props = defineProps<AreaSelectPanelProps>()

const emits = defineEmits<{
  selectParent: [area: AreaVo]
  selectChild: [area: AreaVo]
  cancel: []
}>()

const iconStore = useIconStore()

const pendingParentId = ref<number>()
const pendingChildId = ref<number>()

const parentAreaList = computed(() => {
  return props.areaSource.filter(({ parentId: pid }) => {
    return pid === undefined || pid < 0
  })
})

const childAreaList = computed(() => {
  const pid = pendingParentId.value
  if (pid === undefined) {
    return []
  }
  return props.areaSource.filter(({ isFinal, parentId }) => {
    return isFinal && parentId === pid
  })
})

const handleSelectParent = (area: AreaVo) => {
  pendingParentId.value = area.id
  emits('selectParent', area)
}

const handleSelectChild = (area: AreaVo) => {
  pendingChildId.value = area.id
  emits('selectChild', area)
}

const handleCancel = () => {
  emits('cancel')
}

const getIconUrl = (iconId?: number) => {
  if (!iconId) return undefined
  return iconStore.idMap.get(iconId)?.url
}
</script>

<template>
  <div
    v-show="open"
    :class="[
      'absolute left-0 top-0 z-1',
      'w-full mb-1 rounded-xl overflow-hidden',
      'border border-[--gl-3]/50',
      'shadow-lg',
      'bg-[--gl-0]',
    ]"
  >
    <div class="flex h-[50dvh] max-h-[50dvh]">
      <!-- 左侧：父级地区列表 -->
      <div class="flex-1 min-w-0 flex flex-col border-r border-[--gl-3]/50">
        <div class="shrink-0 px-3 py-2 text-xs font-medium">地区</div>
        <template v-if="loading">
          <div v-for="i in 6" :key="i" class="h-12 flex items-center gap-2 px-3">
            <div class="size-6 shrink-0 rounded bg-[--gl-2] animate-pulse" />
            <div class="h-4 flex-1 rounded bg-[--gl-2] animate-pulse" />
          </div>
        </template>
        <ListboxRoot v-else class="flex-1 overflow-hidden">
          <ListboxContent class="h-full">
            <ListboxVirtualizer
              :options="parentAreaList"
              :estimate-size="48"
              :text-content="(item) => item.name ?? ''"
            >
              <template #default="{ option }">
                <ListboxItem
                  :value="option.id!"
                  class="w-full"
                  @select="() => handleSelectParent(option)"
                >
                  <AreaSelectItem
                    :area="option"
                    :icon-url="getIconUrl(option.iconId)"
                    :selected="option.id === pendingParentId"
                  >
                    <template #fallbackIcon>
                      <RegularWorld class="size-3.5" />
                    </template>
                  </AreaSelectItem>
                </ListboxItem>
              </template>
            </ListboxVirtualizer>
          </ListboxContent>
        </ListboxRoot>
      </div>

      <!-- 右侧：子级地区列表 -->
      <div class="flex-1 min-w-0 flex flex-col bg-[--gl-2]/20">
        <div class="shrink-0 px-3 py-2 text-xs font-medium">子地区</div>
        <template v-if="loading">
          <div v-for="i in 6" :key="i" class="h-12 flex items-center gap-2 px-3">
            <div class="size-6 shrink-0 rounded bg-[--gl-2] animate-pulse" />
            <div class="h-4 flex-1 rounded bg-[--gl-2] animate-pulse" />
          </div>
        </template>
        <ListboxRoot v-else class="flex-1 overflow-hidden">
          <ListboxContent class="h-full">
            <ListboxVirtualizer
              :options="childAreaList"
              :estimate-size="48"
              :text-content="(item) => item.name ?? ''"
            >
              <template #default="{ option }">
                <ListboxItem
                  :value="option.id!"
                  class="w-full"
                  @select="() => handleSelectChild(option)"
                >
                  <AreaSelectItem
                    :area="option"
                    :icon-url="getIconUrl(option.iconId)"
                    :selected="option.id === pendingChildId"
                  >
                    <template #fallbackIcon>
                      <RegularLocation class="size-3.5" />
                    </template>
                  </AreaSelectItem>
                </ListboxItem>
              </template>
            </ListboxVirtualizer>
          </ListboxContent>
        </ListboxRoot>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="shrink-0 flex items-center justify-end gap-2 px-3 py-1.5 border-t border-[--gl-2]">
      <button
        :class="[
          'px-3 py-1 text-xs rounded-md',
          'hover:bg-[--gl-1] active:bg-[--gl-2]',
          'transition-colors',
        ]"
        @click="handleCancel"
      >
        取消
      </button>
    </div>
  </div>
</template>
