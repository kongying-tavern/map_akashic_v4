import { defineStore } from 'pinia'
import { useRequest } from 'alova/client'
import Api from '@/api'
import type { AreaVo } from '@/api/services/main/globals'

export const useAreaStore = defineStore('area', () => {
  const { data: areaSource, loading } = useRequest(
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

  const getAreaByCode = (code: string | undefined) => {
    if (!code) return
    return areaCodeMap.value.get(code)
  }

  const getParentArea = (code: string | undefined) => {
    if (!code) return
    const [_, zone] = code.split(':')
    const parentCode = `C:${zone}`
    return areaCodeMap.value.get(parentCode)
  }

  return {
    areaSource,
    loading,
    areaCodeMap,
    getAreaByCode,
    getParentArea,
  }
})
