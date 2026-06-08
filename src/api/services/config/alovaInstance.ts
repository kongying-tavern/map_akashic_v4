import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { createKvCache } from '../../utils/kv-cache'

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_SERVICE_CONFIG_URL,
  timeout: 15000,
  statesHook: VueHook,
  l2Cache: createKvCache('config-service'),
  cacheFor: {
    GET: {
      mode: 'restore',
      expire: 30 * 60 * 1000,
    },
  },
  requestAdapter: fetchAdapter(),
  responded: async (res, method) => {
    if (!res.ok) {
      throw new Error(res.statusText || `status ${res.status}`)
    }
    const contentType = res.headers.get('content-type')
    if (!contentType?.startsWith('application/json')) {
      return res
    }

    const json = await res.json()
    if (!method.meta?.responseSchema) {
      return json
    }

    const { data, error } = method.meta.responseSchema.safeParse(json)
    if (error) {
      throw new Error(error.message)
    }

    return data
  },
})
