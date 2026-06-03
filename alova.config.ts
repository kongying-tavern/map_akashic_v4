import path from 'node:path'
import { defineConfig, type GeneratorConfig, type UserConfig } from '@alova/wormhole'
import { loadEnv } from 'vite'

export default defineConfig(() => {
  const envDir = path.resolve(__dirname, 'envs')
  const env = loadEnv('development', envDir) as unknown as ImportMetaEnv

  const generator: GeneratorConfig[] = []
  if (env.VITE_SERVICE_MAIN_OPENAPI_URL) {
    generator.push({
      input: env.VITE_SERVICE_MAIN_OPENAPI_URL,
      output: path.resolve(__dirname, 'src/api/services/main'),
    })
  }

  return {
    autoUpdate: false,
    generator,
  } satisfies UserConfig
})
