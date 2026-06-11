import { useRequest } from 'alova/client'
import { defineStore } from 'pinia'
import Api from '@/api'
import type { IconVo } from '@/api/services/main/globals'

export const useIconStore = defineStore('icon', () => {
  const { data: iconList, loading: iconListLoading } = useRequest(
    Api.main.icon_doc.listAllIconBinary(),
    {
      initialData: [],
    },
  )

  const iconIdMap = computed(() => {
    const map = new Map<number | undefined, IconVo>()
    const { length } = iconList.value
    for (let i = 0; i < length; i++) {
      const icon = iconList.value[i]
      map.set(icon.id, icon)
    }
    return map
  })

  return {
    list: computed(() => toRaw(iconList.value)),
    idMap: iconIdMap,
    loading: computed(() => iconListLoading.value),
  }
})
