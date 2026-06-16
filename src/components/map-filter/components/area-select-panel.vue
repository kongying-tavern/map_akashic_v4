<script setup lang="ts">
// 地区选择面板组件
import { ListboxRoot, ListboxContent, ListboxVirtualizer, ListboxItem } from 'reka-ui'
import type { AreaVo } from '@/api/services/main/globals'
import { useIconStore } from '@/stores'
import { RegularWorld, RegularLocation } from '@/ui/g-icons'

interface Props {
  parentAreaList: AreaVo[]
  childAreaList: AreaVo[]
  loading?: boolean
  pendingParentId?: number
  pendingChildId?: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  selectParent: [area: AreaVo]
  selectChild: [area: AreaVo]
  cancel: []
}>()

function handleSelectParent(area: AreaVo) {
  emit('selectParent', area)
}

function handleSelectChild(area: AreaVo) {
  emit('selectChild', area)
}

function handleCancel() {
  emit('cancel')
}

const iconStore = useIconStore()

function getIconUrl(iconId?: number) {
  if (!iconId) return undefined
  return iconStore.idMap.get(iconId)?.url
}

const id = useId()
</script>

<template>
  <div
    :style="{
      'view-transition-name': `area-expanded-${id}`,
    }"
    :class="[
      'mb-1 rounded-lg overflow-hidden',
      'border border-[--gl-3]/50',
      'shadow-lg',
      'bg-[--gl-0]',
    ]"
  >
    <div class="flex h-[50dvh] max-h-[50dvh]">
      <!-- 左侧：父级地区列表 -->
      <div class="flex-1 min-w-0 flex flex-col border-r border-[--gl-3]/50">
        <div class="shrink-0 px-3 py-2 text-xs font-medium text-[--gl-5] border-b border-[--gl-2]">
          地区
        </div>
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
                <ListboxItem :value="option.id!" class="w-full" @click="handleSelectParent(option)">
                  <div
                    :class="[
                      'h-12 flex items-center gap-2 px-3 cursor-pointer',
                      'outline-none transition-colors',
                      pendingParentId === option.id
                        ? 'bg-[--color-brand-1] text-[--color-brand-7]'
                        : 'hover:bg-[--gl-1] active:bg-[--gl-2]',
                    ]"
                  >
                    <div class="size-6 shrink-0 rounded overflow-hidden relative">
                      <div
                        v-if="getIconUrl(option.iconId)"
                        class="absolute inset-0 bg-contain bg-center bg-no-repeat"
                        :style="{
                          backgroundImage: `url(${getIconUrl(option.iconId)})`,
                        }"
                      />
                      <div
                        v-else
                        class="absolute inset-0 flex items-center justify-center text-[--gl-4]"
                      >
                        <RegularWorld class="size-3.5" />
                      </div>
                    </div>
                    <span class="text-sm truncate">{{ option.name }}</span>
                  </div>
                </ListboxItem>
              </template>
            </ListboxVirtualizer>
          </ListboxContent>
        </ListboxRoot>
      </div>

      <!-- 右侧：子级地区列表 -->
      <div class="flex-1 min-w-0 flex flex-col">
        <div class="shrink-0 px-3 py-2 text-xs font-medium text-[--gl-5] border-b border-[--gl-2]">
          子地区
        </div>
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
                <ListboxItem :value="option.id!" class="w-full" @click="handleSelectChild(option)">
                  <div
                    :class="[
                      'h-12 flex items-center gap-2 px-3 cursor-pointer',
                      'outline-none transition-colors',
                      pendingChildId === option.id
                        ? 'bg-[--color-brand-1] text-[--color-brand-7]'
                        : 'hover:bg-[--gl-1] active:bg-[--gl-2]',
                    ]"
                  >
                    <div class="size-6 shrink-0 rounded bg-[--gl-1] overflow-hidden relative">
                      <div
                        v-if="getIconUrl(option.iconId)"
                        class="absolute inset-0 bg-contain bg-center bg-no-repeat"
                        :style="{
                          backgroundImage: `url(${getIconUrl(option.iconId)})`,
                          backgroundColor: 'var(--gl-6)',
                          backgroundBlendMode: 'multiply',
                        }"
                      />
                      <div
                        v-else
                        class="absolute inset-0 flex items-center justify-center text-[--gl-4]"
                      >
                        <RegularLocation class="size-3.5" />
                      </div>
                    </div>
                    <span class="text-sm truncate">{{ option.name }}</span>
                  </div>
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
          'text-[--gl-6] hover:bg-[--gl-1] active:bg-[--gl-2]',
          'transition-colors',
        ]"
        @click="handleCancel"
      >
        取消
      </button>
    </div>
  </div>
</template>
