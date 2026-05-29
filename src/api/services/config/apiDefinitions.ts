import { alovaInstance } from './alovaInstance'
import { appConfigSchema, type AppConfig } from './schema'

/** 获取应用主配置 */
export const getAppConfig = () => {
  return alovaInstance.Get<AppConfig>('/webapp.json', {
    meta: {
      responseSchema: appConfigSchema,
    },
    headers: {
      'Content-Type': null, // 避免触发预检请求
    },
  })
}
