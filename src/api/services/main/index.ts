import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { useUserStore } from '@/stores'
import { createApis, withConfigType } from './createApis'
import type * as ApiTypes from './globals'

const { onAuthRequired } = createClientTokenAuthentication({
  assignToken: () => {},
})

/** 主服务实例 */
export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_SERVICE_MAIN_URL,
  statesHook: VueHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: onAuthRequired((method) => {
    const { token } = useUserStore()
    if (!token) {
      throw new Error('token is not found')
    }
    method.config.headers['Authorization'] = `Bearer ${token}`
    console.log('[headers]', method.config.headers)
    return method
  }),
  responded: (res) => {
    const clone = res.clone()
    if (!clone.ok) {
      throw new Error(clone.statusText)
    }
    const contentType = clone.headers.get('content-type')
    if (contentType?.startsWith('application/json')) {
      return clone.json()
    }
    return clone
  },
})

export const $$userConfigMap = withConfigType({})

const Apis = createApis(alovaInstance, $$userConfigMap)

export default Apis

export { ApiTypes }
