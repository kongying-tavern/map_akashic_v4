import { clampRgb, converter, formatHex, parse } from 'culori'
import { computed, type Ref } from 'vue'

export function useOklchHex(l: Ref<number>, c: Ref<number>, h: Ref<number>) {
  const toOklch = converter('oklch')

  const hex = computed({
    get: () => formatHex(clampRgb({ mode: 'oklch' as const, l: l.value, c: c.value, h: h.value })),
    set: (val: string) => {
      const parsed = parse(val)
      if (!parsed) return
      const oklch = toOklch(parsed)
      if (!oklch || oklch.l === undefined) return
      l.value = oklch.l
      c.value = oklch.c ?? 0
      h.value = (((oklch.h ?? 0) % 360) + 360) % 360
    },
  })

  return { hex }
}
