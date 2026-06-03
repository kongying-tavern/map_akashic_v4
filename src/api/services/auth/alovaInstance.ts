import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'

const basicAuth = `Basic ${window.btoa(import.meta.env.VITE_SERVICE_MAIN_BASIC_AUTH)}`

/** 主服务实例 */
export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_SERVICE_MAIN_URL,
  timeout: 15000,
  statesHook: VueHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: (method) => {
    method.config.headers['Authorization'] = basicAuth
  },
  responded: (res) => {
    const clone = res.clone()
    if (!clone.ok) {
      throw new Error(res.statusText || `status ${res.status}`)
    }
    const contentType = clone.headers.get('content-type')
    if (contentType?.startsWith('application/json')) {
      return clone.json()
    }
    return clone
  },
})
