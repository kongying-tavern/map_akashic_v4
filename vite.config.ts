import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import VueRouter from 'vue-router/vite'
import { envSchema } from './envs/schema'
import { version } from './package.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve('envs')) as unknown as ImportMetaEnv
  try {
    envSchema.parse(env)
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error)
    throw new Error(`[Vite] 启动失败, 缺失关键环境变量: ${message}`)
  }

  return {
    envDir: path.resolve(__dirname, 'envs'),

    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },

    server: {
      // 原神上线于 2020 年 9 月 28 日
      port: 20928,
      proxy: {
        [env.VITE_API_BASE]: {
          target: env.VITE_API_BASE_PROXY,
          changeOrigin: true,
          rewrite: (path) => {
            const rewritten = path.replace(env.VITE_API_BASE, '')
            console.log('[proxy]', `${path} -> ${env.VITE_API_BASE_PROXY}${rewritten}`)
            return rewritten
          },
        },
        [env.VITE_APP_CONFIG_URL]: {
          target: env.VITE_APP_CONFIG_URL_PROXY,
          changeOrigin: true,
          rewrite: (path) => {
            const rewritten = path.replace(env.VITE_APP_CONFIG_URL, '')
            console.log('[proxy]', `${path} -> ${env.VITE_APP_CONFIG_URL_PROXY}${rewritten}`)
            return rewritten
          },
        },
      },
    },

    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueRouter({
        dts: path.resolve(__dirname, 'types/router.d.ts'),
      }),
      Vue() as PluginOption,
      UnoCSS(),
      AutoImport({
        dts: path.resolve(__dirname, 'types/auto-import.d.ts'),
        imports: ['vue'],
      }),
    ],
  }
})
