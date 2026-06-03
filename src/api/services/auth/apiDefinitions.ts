import { alovaInstance } from './alovaInstance'
import type { LoginResponse } from './schema'

/** 访客授权 */
export const visitorLogin = () => {
  return alovaInstance.Post<LoginResponse>(
    '/oauth/token',
    {},
    {
      params: {
        scope: 'all',
        grant_type: 'client_credentials',
      },
    },
  )
}
