import { alovaInstance } from './alovaInstance'
import type { LoginRequest, LoginResponse } from './schema'

export const login = async (data: LoginRequest) => {
  return alovaInstance.Post<LoginResponse>(
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
