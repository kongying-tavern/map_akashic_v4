import * as z from 'zod'

export const enum SettingsKey {
  THEME = 'app.theme',
}

export const themeSchema = z.enum(['light', 'dark', 'auto']).default('auto')

export const settingsSchema = z.object({
  [SettingsKey.THEME]: themeSchema,
})
