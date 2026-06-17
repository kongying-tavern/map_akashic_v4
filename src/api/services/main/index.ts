import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { kongying } from '@/protobuf'
import { useUserStore } from '@/stores'
import { decompress } from '../../utils/decompress-gzip'
import { createKvCache } from '../../utils/kv-cache'
import auth from '../auth'
import { createApis, withConfigType } from './createApis'
import type * as ApiTypes from './globals'

const { onAuthRequired } = createClientTokenAuthentication({})

const toUpperFirst = (str: string) => str.replace(/\b\w/g, (c) => c.toUpperCase())

const isDev = import.meta.env.DEV

/** 主服务实例 */
export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_SERVICE_MAIN_URL,
  statesHook: VueHook,
  cacheFor: {
    GET: {
      mode: 'restore',
      expire: isDev
        ? 1440 * 60 * 1000 // 降低开发服务器负荷
        : 30 * 60 * 1000, // cache 30 minutes in indexedDB
    },
    POST: {
      mode: 'memory',
      expire: 5 * 60 * 1000, // cache 5 minutes in memory
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
  responded: async (res) => {
    const clone = res.clone()
    if (!clone.ok) {
      throw new Error(clone.statusText)
    }
    const contentType = clone.headers.get('content-type')
    if (!contentType?.startsWith('application/json')) {
      return res
    }
    const json = (await clone.json()) as ApiTypes.RBoolean & { data: unknown }
    if (json.error) {
      throw new Error(json.message || res.statusText || `请求失败: ${res.status}`)
    }
    return json
  },
})

export const $$userConfigMap = withConfigType({
  'area.listArea': {
    cacheFor: {
      mode: 'restore',
      expire: 60 * 60 * 1000,
    },
  },
  'icon_doc.listAllIconBinary': {
    transform: (res) => decompress<ApiTypes.IconVo[]>(res),
  },
  'item_doc.listPageItemByBinary': {
    transform: (res) => decompress<ApiTypes.ItemVo[]>(res),
  },
  'marker_doc.listMarkersByBinary': {
    transform: async (originResponse) => {
      const res = originResponse as unknown as Response
      const ds = new DecompressionStream('gzip')
      const bytes = await new Response(res.body?.pipeThrough(ds)).bytes()
      const value = kongying.MarkerVoList.decode(bytes).toJSON() as {
        markers: ApiTypes.MarkerVo[]
        users: Record<string, ApiTypes.SysUserSmallVo>
      }
      return value
    },
  },
})

const Apis = createApis(alovaInstance, $$userConfigMap)

export default Apis

export { ApiTypes }
