import { useRequest } from 'alova/client'
import { defineStore } from 'pinia'
import Api from '@/api'

export interface MarkerThin {
  id: string
  name: string
  pos: readonly [x: number, y: number]
}

export const useMarkerStore = defineStore('item', () => {
  const { data } = useRequest(Api.main.marker_doc.listMarkersByBinary(), {
    initialData: {
      markers: [],
      users: {},
    },
  })

  const markerSet = computed(() => {
    const { markers: source } = data.value
    const { length } = source
    const indexArray = new Array(length) as Array<MarkerThin>
    const indexMap = new Map<string, MarkerThin>()
    for (let i = 0; i < length; i++) {
      const marker = source[i]
      const id = marker.id as unknown as string
      const [x, y] = marker.position?.split(',') ?? []
      const pos = [Number(x), Number(y)] as const
      const thin: MarkerThin = {
        id,
        pos,
        name: marker.markerTitle ?? '',
      }
      indexMap.set(id, thin)
      indexArray[i] = thin
    }
    return { indexArray, indexMap }
  })

  return {
    indexList: computed(() => toRaw(markerSet.value.indexArray)),
    indexMap: computed(() => toRaw(markerSet.value.indexMap)),
  }
})
