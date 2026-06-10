import { useRequest } from 'alova/client'
import { defineStore } from 'pinia'
import Api from '@/api'

export const useIconStore = defineStore('icon', () => {
  const { data: iconList } = useRequest(
    Api.main.icon_doc.listAllIconBinary({
      transform: async (data) => {
        const blob = data as unknown as Blob
        const ds = new DecompressionStream('gzip')
        const response = new Response(blob.stream().pipeThrough(ds))
        const text = await response.text()
        return JSON.parse(text)
      },
    }),
  )

  return {
    iconList: computed(() => toRaw(iconList.value)),
  }
})
