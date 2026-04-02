export type Point = { x: number; y: number }

export type SquircleGeometry = {
  w: number
  h: number
  strokeWidth: number
  r: number
  n: number
  samples: number
  precision: number
}

/**
 * 计算超椭圆曲率图形参数
 */
export const getSquircleGeometry = (input: {
  w?: number
  h?: number
  r?: number
  n?: number
  samples?: number
  strokeWidth?: number
  precision?: number
}): SquircleGeometry => {
  const w = Math.max(0, Number(input.w) || 0)
  const h = Math.max(0, Number(input.h) || 0)
  const strokeWidth = Math.max(0, Number(input.strokeWidth) || 0)

  // 路径必须内缩半个描边宽度，才能保证整个 SVG 不被裁切
  const hw = Math.max(0, (w - strokeWidth) / 2)
  const hh = Math.max(0, (h - strokeWidth) / 2)

  // 为了让“外圆角”符合预期，路径半径应为：用户半径 - 0.5 * 描边
  const maxR = Math.min(hw, hh)
  const safeR = Math.max(0, Number(input.r) || 0)
  const adjustedR = safeR - strokeWidth / 2
  const r = Math.min(maxR, Math.max(0, adjustedR))

  const n = Math.max(1e-6, Number(input.n) || 5)
  const samples = Math.max(2, Math.trunc(Number(input.samples) || 16))
  const precision = Math.max(0, Math.trunc(Number(input.precision) || 2))

  return { w, h, strokeWidth, r, n, samples, precision }
}

export const getSquircleCornerPoints = (input: {
  r: number
  n: number
  samples: number
}): Point[] => {
  const { r, n, samples } = input
  const points: Point[] = []

  // r=0 时仍返回稳定长度，避免 path 逻辑分支复杂化
  if (r <= 0) {
    for (let i = 0; i <= samples; i++) points.push({ x: 0, y: 0 })
    return points
  }

  const exponent = 2 / n
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * (Math.PI / 2)
    const cosT = Math.cos(t)
    const sinT = Math.sin(t)
    points.push({
      x: r * Math.pow(cosT, exponent),
      y: r * Math.pow(sinT, exponent),
    })
  }

  return points
}

export const getSquirclePath = (geometry: SquircleGeometry): string => {
  const { w, h, strokeWidth, r, n, samples, precision } = geometry
  if (w <= 0 || h <= 0) return ''

  const m = 10 ** precision
  const roundN = (v: number) => Math.round(v * m) / m

  const corners = getSquircleCornerPoints({ r, n, samples })
  const last = corners.length - 1

  // 边界坐标（已内缩描边）
  const halfStroke = strokeWidth / 2
  const left = halfStroke
  const right = w - halfStroke
  const top = halfStroke
  const bottom = h - halfStroke

  const segs: string[] = []

  // 起点：右上角第一点（t=0）
  segs.push(`M ${roundN(right - r + corners[0].x)} ${roundN(top + r - corners[0].y)}`)

  // 右上角（0..S）
  for (let i = 0; i <= last; i++) {
    const p = corners[i]
    segs.push(` L ${roundN(right - r + p.x)} ${roundN(top + r - p.y)}`)
  }

  // 左上角（S..0）
  for (let i = last; i >= 0; i--) {
    const p = corners[i]
    segs.push(` L ${roundN(left + r - p.x)} ${roundN(top + r - p.y)}`)
  }

  // 左下角（0..S）
  for (let i = 0; i <= last; i++) {
    const p = corners[i]
    segs.push(` L ${roundN(left + r - p.x)} ${roundN(bottom - r + p.y)}`)
  }

  // 右下角（S..0）
  for (let i = last; i >= 0; i--) {
    const p = corners[i]
    segs.push(` L ${roundN(right - r + p.x)} ${roundN(bottom - r + p.y)}`)
  }

  segs.push(' Z')
  return segs.join('')
}
