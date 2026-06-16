import { useIconStore } from '@/stores'

export const useIcon = (iconId: MaybeRef<number | undefined>) => {
  const iconStore = useIconStore()

  const url = computed(() => {
    const id = toValue(iconId)
    if (!id) return undefined
    return iconStore.idMap.get(id)?.url
  })

  return {
    url,
  }
}
