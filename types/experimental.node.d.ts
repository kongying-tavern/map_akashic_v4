import { Temporal as BuiltinTemporal } from '@js-temporal/polyfill'

declare global {
  const Temporal: typeof BuiltinTemporal
}
