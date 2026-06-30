import { useRequest } from 'alova/client'
import { defineStore } from 'pinia'
import { acceptHMRUpdate } from 'pinia'
import Api from '@/api'
import type { IconVo } from '@/api/services/main/globals'
import type { RenderResult } from './render.worker'
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

  const render = (iconList: IconVo[]) => {
    return new Promise<ImageBitmap>((resolve, reject) => {
      if (!worker) worker = new RenderWorker({ name: 'markerTextureRender' })
      const scopedWorker = worker
      const requestId = crypto.randomUUID()
      const handler = ({ data }: MessageEvent<RenderResult>) => {
        if (requestId !== data.id) return
        if (data.error) reject(new Error(data.message))
        else resolve(data.result)
        scopedWorker.removeEventListener('message', handler)
      }
      scopedWorker.addEventListener('message', handler)
      scopedWorker.postMessage({
        id: requestId,
        data: iconList,
      })
    })
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
