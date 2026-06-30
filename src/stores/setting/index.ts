import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { z } from 'zod'

const settingSchema = z.object({})
export type Setting = z.infer<typeof settingSchema>

export const useSettingStore = defineStore('setting', () => {
  const setting = useLocalStorage<Setting>('kongying-tavern:web-map:setting', {})

  return {
    setting,
  }
})
