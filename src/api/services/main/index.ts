import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { useUserStore } from '@/stores'
import { createKvCache } from '../../utils/kv-cache'
import auth from '../auth'
import { createApis, withConfigType } from './createApis'
import type * as ApiTypes from './globals'

const { onAuthRequired } = createClientTokenAuthentication({})

const toUpperFirst = (str: string) => str.replace(/\b\w/g, (c) => c.toUpperCase())

/** 主服务实例 */
export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_SERVICE_MAIN_URL,
  statesHook: VueHook,
  cacheFor: {
    GET: {
      mode: 'restore',
      expire: 30 * 60 * 1000, // cache 30 minutes
    },
    POST: {
      mode: 'restore',
      expire: 30 * 60 * 1000, // cache 30 minutes
    },
  },
  l2Cache: createKvCache('main-service'),
  requestAdapter: fetchAdapter(),
  beforeRequest: onAuthRequired(async (method) => {
    const userStore = useUserStore()
    const tokenValue = userStore.isTokenValid()
    if (tokenValue) {
      method.config.headers['Authorization'] =
        `${toUpperFirst(tokenValue.token_type)} ${tokenValue.access_token}`
      return
    }
    const res = await auth.visitorLogin().send()
    method.config.headers['Authorization'] = `${toUpperFirst(res.token_type)} ${res.access_token}`
    userStore.setToken(res)
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
