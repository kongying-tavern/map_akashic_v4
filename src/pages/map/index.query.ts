import { useUrlSearchParams } from '@vueuse/core'
import { useRoute } from 'vue-router'
import * as z from 'zod'

const searchParamsSchame = z.object({
  area: z.string().optional().meta({ description: '地区代码' }),
})
type SearchParams = z.infer<typeof searchParamsSchame>

export const useRouteQuery = () => {
  const route = useRoute()
  if (route.path !== '/map') {
    throw new Error('useQuery only works on /map route')
  }
  const searchParams = useUrlSearchParams<SearchParams>('history')
  return searchParams
}
