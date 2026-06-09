<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { converter, formatHex, parse, clampRgb } from 'culori'
import WinuiSegmented from '@/ui/winui/winui-segmented.vue'

// ─── culori 转换器 ─────────────────────────────
const toOklch = converter('oklch')

// ─── 基础工具 ───────────────────────────────────
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
const normalizeHue = (h: number) => ((h % 360) + 360) % 360

// ─── oklch ↔ hex 转换 ─────────────────────────
const oklchToHex = (L: number, C: number, H: number) => {
  const color = { mode: 'oklch' as const, l: L, c: C, h: H }
  return formatHex(clampRgb(color))
}

const hexToOklch = (hex: string) => {
  const parsed = parse(hex)
  if (!parsed) return null
  const oklch = toOklch(parsed)
  if (!oklch || oklch.l === undefined) return null
  return { L: oklch.l, C: oklch.c ?? 0, H: oklch.h ?? 0 }
}

// ─── 解析 CSS oklch() 字符串 ───────────────────
const parseOklch = (str: string) => {
  const parsed = parse(str)
  if (!parsed) return null
  const oklch = toOklch(parsed)
  if (!oklch || oklch.l === undefined) return null
  return { L: oklch.l, C: oklch.c ?? 0, H: oklch.h ?? 0 }
}

// ─── 主题切换 ──────────────────────────────────
const isDark = useDark({})
watch(
  isDark,
  (dark) => {
    document.documentElement.classList.toggle('dark', dark)
  },
  { immediate: true },
)

const theme = computed({
  get: () => (isDark.value ? 'dark' : 'light'),
  set: (v) => {
    isDark.value = v === 'dark'
  },
})

const themeOptions = [
  { label: '跟随系统', value: 'auto' },
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
] as const

// ─── 品牌色状态 (oklch 三通道) ─────────────────
const brandL = ref(0.6)
const brandC = ref(0.1)
const brandH = ref(48)

const brandHex = computed(() => oklchToHex(brandL.value, brandC.value, brandH.value))

const onBrandInput = (e: Event) => {
  const next = (e.target as HTMLInputElement | null)?.value
  if (!next) return
  const oklch = hexToOklch(next)
  if (!oklch) return
  brandL.value = oklch.L
  brandC.value = oklch.C
  brandH.value = oklch.H
}

// ─── 色阶生成 ─────────────────────────────────
/** 色阶参数表：每级定义浅色/深色模式的目标亮度与色度比例 */
const PALETTE_TABLE = [
  { lightL: 0.96, darkL: 0.2, lightCR: 0.2, darkCR: 0.4 },
  { lightL: 0.9, darkL: 0.28, lightCR: 0.4, darkCR: 0.6 },
  { lightL: 0.82, darkL: 0.36, lightCR: 0.7, darkCR: 0.8 },
  { lightL: 0.74, darkL: 0.44, lightCR: 0.9, darkCR: 1.0 },
  { lightL: 0.64, darkL: 0.52, lightCR: 1.1, darkCR: 1.2 },
  { lightL: 0.54, darkL: 0.6, lightCR: 1.1, darkCR: 1.4 },
  { lightL: 0.46, darkL: 0.72, lightCR: 1.2, darkCR: 1.1 },
  { lightL: 0.35, darkL: 0.84, lightCR: 1.0, darkCR: 0.8 },
  { lightL: 0.24, darkL: 0.94, lightCR: 0.8, darkCR: 0.4 },
] as const

const MAX_CHROMA = 0.4

const generatePalette = (C: number, H: number) => {
  const root = document.body.style
  for (let i = 0; i < PALETTE_TABLE.length; i++) {
    const lv = PALETTE_TABLE[i]
    const lightC = clamp(C * lv.lightCR, 0, MAX_CHROMA)
    const darkC = clamp(C * lv.darkCR, 0, MAX_CHROMA)
    const light = `oklch(${(lv.lightL * 100).toFixed(0)}% ${lightC.toFixed(4)} ${H.toFixed(1)})`
    const dark = `oklch(${(lv.darkL * 100).toFixed(0)}% ${darkC.toFixed(4)} ${H.toFixed(1)})`
    root.setProperty(`--color-brand-${i + 1}`, `light-dark(${light}, ${dark})`)
  }
}

// ─── 同步到 CSS 变量 ──────────────────────────
const syncBrandToRoot = () => {
  const L = brandL.value
  const C = brandC.value
  const H = normalizeHue(brandH.value)
  document.body.style.setProperty(
    '--brand',
    `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(4)} ${H.toFixed(1)})`,
  )
  generatePalette(C, H)
}

const loadBrandFromRoot = () => {
  const raw = getComputedStyle(document.body).getPropertyValue('--brand').trim()
  const oklch = parseOklch(raw)
  if (oklch) {
    brandL.value = oklch.L
    brandC.value = oklch.C
    brandH.value = normalizeHue(oklch.H)
  }
}

onMounted(() => {
  loadBrandFromRoot()
  syncBrandToRoot()
})

watch([brandL, brandC, brandH], () => {
  syncBrandToRoot()
})
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
      <div class="text-sm opacity-70">
        L: {{ (brandL * 100).toFixed(0) }}% C: {{ brandC.toFixed(2) }} H:
        {{ Math.round(brandH) }}
      </div>
    </div>
    <div class="mx-2">颜色模式</div>
    <WinuiSegmented class="m-2" v-model="theme" :options="[...themeOptions]" />
  </div>
</template>
