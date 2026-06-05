<script setup lang="ts">
import { useRequest } from 'alova/client'
import { ListboxRoot, ListboxContent, ListboxVirtualizer, ListboxItem } from 'reka-ui'
import Api from '@/api'
import FilterItem from './filter-item.vue'

const { data, onSuccess } = useRequest(
  Api.main.area.listArea({
    data: {
      isTraverse: false,
    },
  }),
)
onSuccess((res) => {
  console.log({ res })
})
</script>

<template>
  <FilterItem class="m-3 mt-0">
    <template #default>
      <div class="h-50dvh bg-[--gl-2] border border-[--gl-3] rounded m-1">
        <ListboxRoot class="h-full overflow-auto" style="scrollbar-width: none">
          <ListboxContent>
            <ListboxVirtualizer
              :options="data?.data ?? []"
              :estimate-size="60"
              :text-content="(item) => item.name ?? ''"
            >
              <template #default="{ option }">
                <ListboxItem :value="option.id ?? ''" class="w-full h-15 px-1 py-1 bg-transparent">
                  <div class="rounded-md w-full h-full bg-[--gl-3]">{{ option.name }}</div>
                </ListboxItem>
              </template>
            </ListboxVirtualizer>
          </ListboxContent>
        </ListboxRoot>
      </div>
    </template>
  </FilterItem>
</template>
