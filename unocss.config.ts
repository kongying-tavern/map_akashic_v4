import { defineConfig, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [presetWind4()],
  rules: [
    [
      'scrollbar-hide',
      {
        'scrollbar-width': 'none',
      },
    ],
  ],
})
