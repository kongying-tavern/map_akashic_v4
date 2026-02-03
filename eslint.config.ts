import defineConfig from '@antfu/eslint-config'

export default defineConfig({
  ignores: [
    '.vscode',
    'dist',
    'node_modules',
    'api/global.d.ts',
  ],

  stylistic: {
    indent: 2,
    quotes: 'single',
    jsx: false,
    semi: false,
  },

  typescript: {
    overrides: {
      // 一般情况下不允许使用 any
      'ts/no-explicit-any': 'warn',

      // 命名规范
      'ts/naming-convention': [
        'error',
        // TS interface 只允许大驼峰
        {
          selector: 'interface',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
        },
        // TS Type 只允许大驼峰
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
        },
        // 变量只允许大小驼峰、全大写下划线、全小写下划线
        {
          selector: 'variable',
          format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
      ],

      // 禁止未使用的值
      'ts/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },

  vue: {
    overrides: {
      // 组件名称至少由 2 个单词组成
      'vue/multi-word-component-names': 'error',

      // 组件定义名称只允许大驼峰
      'vue/component-definition-name-casing': ['error', 'PascalCase'],

      // 组件属性名称只允许小驼峰
      'vue/prop-name-casing': ['error', 'camelCase'],

      // 允许在相同作用域范围从对象获取响应值
      'vue/no-ref-object-reactivity-loss': 'off',

      // 禁止未使用的值
      'vue/no-unused-vars': [
        'error',
        {
          ignorePattern: '^_',
        },
      ],
    },
  },

  rules: {
    // 顶层函数允许使用箭头函数
    'antfu/top-level-function': 'off',

    // 断行符号使用 LF
    'style/linebreak-style': ['error', 'unix'],

    // 文件末尾保留空行
    'style/eol-last': 'error',

    'eslint-comments/no-unlimited-disable': ['off'],
  },
})
