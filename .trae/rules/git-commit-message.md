---
alwaysApply: true
scene: git_message
---

在此处编写规则，自定义 AI 生成提交信息的风格。

1. 在提交标签之后以及 commit 信息之前基于如下规则生成 emoji:
```
[
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
]
```
example:
```
refactor(auth): ♻️ 替换原有登录接口为访客登录接口
```

2. 除专有名词外，必须生成中文的提交信息。
3. 必须遵循中英、中外或数字混排规则, 在中文和英文、中文和阿拉伯数字之间需保留一个半角空格。
