import { useRequest } from 'alova/client'
import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'
import Api from '@/api'
import type { IconVo } from '@/api/services/main/globals'
import { invokeWorker } from '@/utils/worker'
import type { RenderRequest, RenderResult } from './render.worker'
// oxlint-disable-next-line import/default
import RenderWorker from './render.worker?worker'

let worker: Worker | null = null

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

  const render = async (
    iconList: IconVo[],
    onProgress?: (value: number, message?: string) => void,
  ) => {
    if (!worker) {
      worker = new RenderWorker({ name: 'markerTextureRender' })
    }
    const sendList: { id: number; url: string }[] = []
    const { length } = iconList
    for (let i = 0; i < length; i++) {
      const { id, url } = iconList[i]
      if (id === undefined || !url) continue
      sendList.push({ id, url })
    }
    const res = await invokeWorker<RenderRequest, RenderResult>(
      worker,
      {
        data: sendList,
      },
      { onProgress },
    )
    return res
  }

  return {
    list: computed(() => toRaw(iconList.value)),
    idMap: iconIdMap,
    loading: computed(() => iconListLoading.value),
    render,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIconStore, import.meta.hot))
}
