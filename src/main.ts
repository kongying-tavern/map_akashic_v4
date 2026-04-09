import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { messages } from '@/locales'
import './api'
import 'virtual:uno.css'
import App from './App.vue'
import { router } from './router'

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
