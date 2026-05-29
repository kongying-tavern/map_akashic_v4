import common from './common.json' with { type: 'json' }
import feature from './feature.json' with { type: 'json' }

export default {
  ...common,
  ...feature,
} satisfies I18nType.Message
