import { defineConfig } from 'oxlint'

export default defineConfig({
  ignorePatterns: [
    'node_modules',
    'dist',
    'src/api/apiDefinitions.ts',
    'src/api/globals.d.ts',
    'src/api/createApis.ts',
    'pnpm-lock.yaml',
    '*.md',
  ],
  plugins: ['import', 'vue'],
})
