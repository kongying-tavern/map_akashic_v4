<script setup lang="ts">
import { SettingsKey } from '@/database/schemas/settings'
import { themeSchema } from '@/database/schemas/settings'
import { useAsyncSettingValue } from '@/hooks/use-async-setting-value'
import WinuiSegmented from '@/ui/winui/winui-segmented.vue'

const { modelValue: theme } = useAsyncSettingValue(SettingsKey.THEME, themeSchema, 'auto')
watch(theme, () => {
  document.documentElement.classList.toggle('light', theme.value === 'light')
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
  document.documentElement.classList.toggle('auto', theme.value === 'auto')
})

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

const normalizeHue = (h: number) => {
  const x = h % 360
  return x < 0 ? x + 360 : x
}

const hexToRgb01 = (hex: string) => {
  const v = hex.trim().replace(/^#/, '')
  if (!/^[0-9a-fA-F]{6}$/.test(v)) return null
  const r = parseInt(v.slice(0, 2), 16) / 255
  const g = parseInt(v.slice(2, 4), 16) / 255
  const b = parseInt(v.slice(4, 6), 16) / 255
  return { r, g, b }
}

const rgb01ToHue = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  if (d === 0) return 0
  let h: number
  switch (max) {
    case r:
      h = ((g - b) / d) % 6
      break
    case g:
      h = (b - r) / d + 2
      break
    default:
      h = (r - g) / d + 4
      break
  }
  return normalizeHue(h * 60)
}

// 固定 S/L 仅用于给原生 color input 展示；实际存储仅 hue。
const hueToHex = (hue: number) => {
  const h = normalizeHue(hue) / 60
  const c = 1 // S=100%, L=50% -> chroma = 1
  const x = c * (1 - Math.abs((h % 2) - 1))
  const [r1, g1, b1] =
    h < 1
      ? [c, x, 0]
      : h < 2
        ? [x, c, 0]
        : h < 3
          ? [0, c, x]
          : h < 4
            ? [0, x, c]
            : h < 5
              ? [x, 0, c]
              : [c, 0, x]
  const toHex = (v: number) =>
    Math.round(clamp(v, 0, 1) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`
}

const brandHue = ref<number>(48)
const brandHex = computed(() => hueToHex(brandHue.value))

const onBrandInput = (e: Event) => {
  const next = (e.target as HTMLInputElement | null)?.value
  if (!next) return
  const rgb = hexToRgb01(next)
  if (!rgb) return
  brandHue.value = rgb01ToHue(rgb)
}

const syncBrandToRoot = () => {
  document.body.style.setProperty('--brand', String(Math.round(normalizeHue(brandHue.value))))
}

const loadBrandFromRoot = () => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim()
  const n = Number.parseFloat(raw)
  if (Number.isFinite(n)) brandHue.value = normalizeHue(n)
}

onMounted(() => {
  loadBrandFromRoot()
  syncBrandToRoot()
})

watch(brandHue, () => {
  syncBrandToRoot()
})

const themeOptions = [
  { label: '跟随系统', value: 'auto' },
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
] as const
</script>

<template>
  <div class="">
    <div class="mx-2">主题色</div>
    <div class="m-2 flex items-center gap-2">
      <input
        class="h-8 w-12 cursor-pointer rounded"
        type="color"
        :value="brandHex"
        @input="onBrandInput"
      />
      <div class="text-sm opacity-70">H: {{ Math.round(brandHue) }}</div>
    </div>
    <div class="mx-2">颜色模式</div>
    <WinuiSegmented class="m-2" v-model="theme" :options="[...themeOptions]" />
  </div>
</template>
