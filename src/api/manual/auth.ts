import { createAlova } from 'alova'
import { createClientTokenAuthentication } from 'alova/client'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'
import { useUserStore } from '@/stores'

const { onAuthRequired } = createClientTokenAuthentication({
  assignToken: (req) => {
    const { token } = useUserStore()
    if (token?.accessToken) {
      req.config.headers.Authorization = `${token.tokenType} ${token.accessToken}`
    } else {
      req.config.headers.Authorization = `Basic ${window.btoa(import.meta.env.VITE_API_BASE_AUTH)}`
    }
  },
})

export const authInstance = createAlova({
  baseURL: import.meta.env.VITE_API_BASE,
  statesHook: VueHook,
  requestAdapter: fetchAdapter(),
  beforeRequest: onAuthRequired((method) => {
    console.log('[headers]', method.config)
  }),
  responded: (res) => {
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const contentType = res.headers.get('content-type')
    if (contentType?.startsWith('application/json')) {
      return res.json()
    }
    return res
  },
})

export interface LoginForm {
  username: string
  password: string
}

export interface LoginResult {
  /** 访问令牌 */
  access_token: string
  /** 令牌类型 */
  token_type: string
  /** 过期时间 */
  expires_in: number
  /** 作用域 */
  scope: string
  /** 唯一标识 */
  jti: string
}

export const login = async (data: LoginForm) => {
  return authInstance.Post<LoginResult>(
    '/oauth/token',
    {
      ...data,
      grant_type: 'password',
    },
    {
      params: {
        scope: 'all',
        grant_type: 'client_credentials',
      },
    },
  )
}
