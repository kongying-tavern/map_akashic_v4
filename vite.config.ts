import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { styleText as style } from 'node:util'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv, type PluginOption, type ProxyOptions } from 'vite'
import VueRouter from 'vue-router/vite'
import * as z from 'zod'
import { zhCN } from 'zod/locales'
import { envSchema } from './envs/schema'
import { Logger } from './infrastructure/logger'
import { version } from './package.json' with { type: 'json' }

z.config(zhCN())

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  Logger.info(`current mode is: ${mode}`)

  const env = loadEnv(mode, path.resolve('envs')) as unknown as ImportMetaEnv
  const { error } = envSchema.safeParse(env)
  if (error) {
    throw new Error(`环境变量校验失败: ${error.message}`)
  }
  Logger.success('环境变量校验通过')

  const proxyList = [
    {
      name: '主服务',
      match: env.VITE_SERVICE_MAIN_URL,
      proxy: env.VITE_SERVICE_MAIN_PROXY,
    },
    {
      name: '配置服务',
      match: env.VITE_SERVICE_CONFIG_URL,
      proxy: env.VITE_SERVICE_CONFIG_PROXY,
    },
    {
      name: '资源服务',
      match: env.VITE_SERVICE_RESOURCE_URL,
      proxy: env.VITE_SERVICE_RESOURCE_PROXY,
    },
  ]

  const proxy = proxyList.reduce(
    (acc, item) => {
      if (!item.proxy) return acc
      Logger.info(`${item.name}代理已启用`)
      acc[item.match] = {
        target: item.proxy,
        changeOrigin: true,
        rewrite: (path) => path.replace(item.match, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (_proxyReq, { url = '' }) => {
            const rewritten = url.replace(item.match, '')
            Logger.info(`${url}\n${style('green', '------√------->')} ${item.proxy}${rewritten}`)
          })
          proxy.on('error', (err, { url = '' }) => {
            const rewritten = url.replace(item.match, '')
            Logger.info(
              `${url}\n${style('red', '------×------->')} ${item.proxy}${rewritten} ${style('red', err.message)}`,
            )
          })
        },
      }
      return acc
    },
    {} as Record<string, ProxyOptions>,
  )

  return {
    envDir: path.resolve(__dirname, 'envs'),

    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(version),
    },

    server: {
      // 原神上线于 2020 年 9 月 28 日
      port: 20928,
      proxy,
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
