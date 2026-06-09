const INV_GAMMA = 0.4166666666666667 // 预计算 1 / 2.4
const MAX_CHROMA = 0.4

// OKLCH → sRGB (仅供 CSS 渐变使用)
export function oklchToSrgb(L: number, C: number, H: number): [number, number, number] {
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m = L - 0.1055613458 * a - 0.0638541728 * b
  const s = L - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ * l_ * l_
  const m3 = m * m * m
  const s3 = s * s * s

  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  let bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  r = r < 0 ? 0 : r > 1 ? 1 : r
  g = g < 0 ? 0 : g > 1 ? 1 : g
  bl = bl < 0 ? 0 : bl > 1 ? 1 : bl

  r = r >= 0.0031308 ? 1.055 * Math.pow(r, INV_GAMMA) - 0.055 : 12.92 * r
  g = g >= 0.0031308 ? 1.055 * Math.pow(g, INV_GAMMA) - 0.055 : 12.92 * g
  bl = bl >= 0.0031308 ? 1.055 * Math.pow(bl, INV_GAMMA) - 0.055 : 12.92 * bl

  return [Math.round(r * 255), Math.round(g * 255), Math.round(bl * 255)]
}

// Canvas 核心渲染 (极限优化版)
export function renderCanvas(canvas: HTMLCanvasElement, L: number) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return

  const w = canvas.width
  const ht = canvas.height
  const imageData = ctx.createImageData(w, ht)
  const data = imageData.data

  const widthRatio = MAX_CHROMA / (w - 1)

  // 外层循环：y轴代表 Hue (色相)
  for (let y = 0; y < ht; y++) {
    const hue = (y / (ht - 1)) * 360
    const hRad = (hue * Math.PI) / 180
    const cosH = Math.cos(hRad)
    const sinH = Math.sin(hRad)

    // 核心优化 1：提炼与 Chroma 无关的乘积系数到外层循环
    const lMult = 0.3963377774 * cosH + 0.2158037573 * sinH
    const mMult = -0.1055613458 * cosH - 0.0638541728 * sinH
    const sMult = -0.0894841775 * cosH - 1.291485548 * sinH

    let rowOffset = y * w * 4

    // 内层循环：x轴代表 Chroma (色度)
    for (let x = 0; x < w; x++) {
      const C = x * widthRatio

      const l_ = L + C * lMult
      const m = L + C * mMult
      const s = L + C * sMult

      const l3 = l_ * l_ * l_
      const m3 = m * m * m
      const s3 = s * s * s

      let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
      let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
      let bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

      r = r < 0 ? 0 : r > 1 ? 1 : r
      g = g < 0 ? 0 : g > 1 ? 1 : g
      bl = bl < 0 ? 0 : bl > 1 ? 1 : bl

      r = r >= 0.0031308 ? 1.055 * Math.pow(r, INV_GAMMA) - 0.055 : 12.92 * r
      g = g >= 0.0031308 ? 1.055 * Math.pow(g, INV_GAMMA) - 0.055 : 12.92 * g
      bl = bl >= 0.0031308 ? 1.055 * Math.pow(bl, INV_GAMMA) - 0.055 : 12.92 * bl

      // ImageData.data 是 Uint8ClampedArray，会自动进行越界裁切并自动实现 Math.round
      data[rowOffset++] = r * 255
      data[rowOffset++] = g * 255
      data[rowOffset++] = bl * 255
      data[rowOffset++] = 255
    }
  }
  ctx.putImageData(imageData, 0, 0)
}

export { MAX_CHROMA }
