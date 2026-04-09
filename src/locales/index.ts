import enUSCommon from './en-US/common.json'
import enUSFeature from './en-US/feature.json'
import zhCNCommon from './zh-CN/common.json'
import zhCNFeature from './zh-CN/feature.json'

export const messages = {
  'zh-CN': { ...zhCNCommon, ...zhCNFeature },
  'en-US': { ...enUSCommon, ...enUSFeature },
} as const satisfies Record<I18nType.Locale, I18nType.Message>

