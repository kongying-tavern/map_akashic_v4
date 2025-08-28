import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import { version } from './package.json'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve('envs')) as unknown as ImportMetaEnv
  return {
    base: './',

    envDir: path.resolve(__dirname, 'envs'),

    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },

    server: {
      // 原神上线于 2020 年 9 月 28 日
      port: 20928,
      proxy: {
        [env.VITE_API_BASE]: {
          target: env.VITE_API_TARGET,
          changeOrigin: true,
          rewrite: (path) => {
            console.log('[target]', path.replace(env.VITE_API_BASE, ''))
            return path.replace(env.VITE_API_BASE, '')
          },
        },
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    plugins: [
      Vue(),
      UnoCSS(),
      AutoImport({
        dts: path.resolve(__dirname, 'types/auto-import.d.ts'),
        imports: ['vue'],
      }),
    ],
  }
})
