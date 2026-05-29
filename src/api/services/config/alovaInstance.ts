import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_SERVICE_CONFIG_URL,
  timeout: 15000,
  statesHook: VueHook,
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
