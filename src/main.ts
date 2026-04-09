import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import enUSCommon from '@/locales/en-US/common.json'
import './api'
import 'virtual:uno.css'
import zhCNCommon from '@/locales/zh-CN/common.json'
import App from './App.vue'
import { router } from './router'

const messages = {
  'zh-CN': zhCNCommon,
  'en-US': enUSCommon,
} as const

const i18n = createI18n<[I18nType.Message], I18nType.Locale>({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
