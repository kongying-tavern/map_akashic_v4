import path from 'node:path'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { version } from './package.json'

export default defineConfig(() => {
  return {
    base: './',

    envDir: path.resolve(__dirname, 'envs'),

    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },

    server: {
      // 原神上线于 2020 年 9 月 28 日
      port: 20928,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    plugins: [
      Vue(),
      Tailwindcss(),
      AutoImport({
        dts: path.resolve(__dirname, 'types/auto-import.d.ts'),
        imports: ['vue'],
      }),
    ],
  }
})
