import zhCNCommon from './zh-CN/common'

export type MessageSchema = typeof zhCNCommon

declare module 'vue-i18n' {
  // vue-i18n v11: 用 DefineLocaleMessage 让 $t / t 拥有 key 提示
  export interface DefineLocaleMessage extends MessageSchema {}
}

declare global {
  namespace I18nType {
    type Message = MessageSchema
    type Locale = 'zh-CN' | 'en-US'
  }
}
