import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { createApis, mountApis, withConfigType } from './createApis'
// import { useUserStore } from '@/stores'

const { onAuthRequired } = createClientTokenAuthentication({
  assignToken: () => {},
})

export const alovaInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE,
  statesHook: VueHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: onAuthRequired((method) => {
    console.log('[headers]', method.config)
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

mountApis(Apis)

export default Apis
export * as config from './manual/config'

export type {
  ConfigAvatar,
  ConfigBounds,
  ConfigDict,
  ConfigExtra,
  ConfigFontResources,
  ConfigNameCard,
  ConfigPlugin,
  ConfigTileLayer,
  MapConfig,
} from './manual/config'
