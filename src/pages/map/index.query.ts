import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as z from 'zod'

const searchParamsSchema = z.object({
  area: z.string().optional().meta({ description: '地区代码' }),
})

export const useRouteQuery = () => {
  const route = useRoute()
  const router = useRouter()

  if (route.path !== '/map') {
    throw new Error('This useRouteQuery only works on /map route')
  }

  const query = computed(() => {
    // 1. 解析当前的路由参数
    const parsed = searchParamsSchema.parse(route.query)

    // 2. 返回一个 Proxy 拦截对属性的写操作
    return new Proxy(parsed, {
      get(target, prop) {
        return Reflect.get(target, prop)
      },
      set(target, prop, value) {
        // 合并新值并校验
        const nextQuery = { ...target, [prop]: value }
        const validated = searchParamsSchema.parse(nextQuery)

        // 触发路由更新，路由变了，依赖 route.query 的 computed 就会自动更新
        router.replace({
          query: validated as Record<string, string>,
        })
        return true
      },
    })
  })

  return query
}
