import en from './en'
import enUS from './en-US'
import zhCN from './zh-CN'

export const messages = {
  'en': en,
  'zh-CN': zhCN,
  'en-US': enUS,
} satisfies Record<I18nType.Locale, I18nType.Message>
