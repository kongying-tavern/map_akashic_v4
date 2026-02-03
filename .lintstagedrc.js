export default {
  '*.{vue,js,ts}': [
    () => 'pnpm check:type',
  ],
  '*.{vue,js,ts,json,html}': [
    'pnpm lint:fix',
  ],
}
