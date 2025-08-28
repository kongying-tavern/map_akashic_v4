import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { useUserStore } from '@/stores'
import { createApis, mountApis, withConfigType } from './createApis'

const { onAuthRequired } = createClientTokenAuthentication({
  assignToken: (req) => {
    const { token } = useUserStore()
    if (token)
      req.config.headers.Authorization = token
  },
})

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE,
  requestAdapter: fetchAdapter(),
  beforeRequest: onAuthRequired(),
  statesHook: VueHook,
  responded: (res) => {
    return res.json()
  },
})

export const $$userConfigMap = withConfigType({})

const Apis = createApis(alovaInstance, $$userConfigMap)

mountApis(Apis)

export default Apis
