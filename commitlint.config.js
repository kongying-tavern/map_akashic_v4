import { defineConfig } from 'czg'

export default defineConfig({
  extends: ['@commitlint/config-conventional'],

  /** @see https://commitlint.js.org/reference/rules.html */
  rules: {
    /**
     * type[scope]: [function] description
     *
     * ^^^^^^^^^^^^^^ empty line.
     * - Something here
     */
    'body-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description
     *
     * - something here
     *
     * ^^^^^^^^^^^^^^
     */
    'footer-leading-blank': [1, 'always'],
    /**
     * type[scope]: [function] description [No more than 72 characters]
     *      ^^^^^
     */
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      1,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    /**
     * type[scope]: [function] description
     * ^^^^
     * 与当前配置中的 `prompt.types[number].value` 的值对应
     */
    'type-enum': [2, 'always', [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'build',
      'ci',
      'revert',
      'chore',
      'deps',
      'init',
    ]],
  },

  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: '✨ feat:       新增功能', emoji: ':sparkles:' },
      { value: 'fix', name: '🐛 fix:        修复缺陷', emoji: ':bug:' },
      { value: 'docs', name: '📝 docs:       文档更新', emoji: ':memo:' },
      { value: 'style', name: '💄 style:      代码格式', emoji: ':lipstick:' },
      { value: 'refactor', name: '♻️  refactor:   代码重构', emoji: ':recycle:' },
      { value: 'perf', name: '⚡️ perf:       性能提升', emoji: ':zap:' },
      { value: 'test', name: '✅ test:       测试相关', emoji: ':white_check_mark:' },
      { value: 'build', name: '💚 build:      构建相关', emoji: ':green_heart:' },
      { value: 'ci', name: '🚀 ci:         持续集成', emoji: ':rocket:' },
      { value: 'revert', name: '⏪️ revert:     回退代码', emoji: ':rewind:' },
      { value: 'chore', name: '🔥 chore:      其他修改', emoji: ':fire:' },
      { value: 'deps', name: '📦️ deps:       依赖更新', emoji: ':package:' },
      { value: 'init', name: '🎉 init:       创世提交', emoji: ':tada:' },
    ],
    scopes: [
      'api',
      'components',
      'hooks',
      'modules',
      'shared',
      'stores',
      'styles',
      'utils',
    ],
    useEmoji: true,
    emojiAlign: 'center',
    customScopesAlias: '以上都不是？我要自定义',
    allowEmptyScopes: true,
    emptyScopesAlias: '跳过',
    issuePrefixes: [
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
    ],
    emptyIssuePrefixAlias: '跳过',
    customIssuePrefixAlias: '自定义前缀',
  },
})
