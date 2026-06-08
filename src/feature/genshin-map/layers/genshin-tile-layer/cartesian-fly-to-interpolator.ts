/**
 * 笛卡尔坐标系兼容的 FlyToInterpolator
 *
 * 基于 deck.gl 的 FlyToInterpolator（van Wijk & Nuij "Smooth and efficient
 * zooming and panning" 算法），将 Web Mercator 投影替换为笛卡尔坐标系直通。
 *
 * 核心区别：
 * - Web Mercator 版本使用 lngLatToWorld/worldToLngLat 进行墨卡托投影转换
 * - 本版本直接使用 OrthographicView 的 target: [x, y] 作为世界坐标，无需投影
 * - zoom 的含义不变：scale = 2^zoom
 */

import { TransitionInterpolator } from 'deck.gl'

const EPSILON = 0.01

const DEFAULT_OPTS = {
  curve: 1.414,
  speed: 1.2,
}

export interface CartesianFlyToOptions {
  /** 缩放曲线曲率，默认 1.414 */
  curve?: number
  /** 平均速度（相对于 curve），默认 1.2 */
  speed?: number
  /** 以屏幕像素/秒为单位的平均速度，指定后 speed 会被忽略 */
  screenSpeed?: number
  /** 最大过渡时长（ms），超出则返回 0 */
  maxDuration?: number
}

function zoomToScale(zoom: number): number {
  return 2 ** zoom
}

function scaleToZoom(scale: number): number {
  return Math.log2(scale)
}

function getCartesianFlyToParams(
  startTarget: [number, number],
  startZoom: number,
  endTarget: [number, number],
  endZoom: number,
  width: number,
  height: number,
  opts: Required<Pick<CartesianFlyToOptions, 'curve' | 'speed'>> &
    Omit<CartesianFlyToOptions, 'curve' | 'speed'>,
) {
  const rho = opts.curve
  const startScale = zoomToScale(startZoom)
  const zoomDelta = endZoom - startZoom
  const scale = zoomToScale(zoomDelta)

  // 直接使用笛卡尔坐标作为世界坐标（无需 lngLatToWorld 投影）
  const startCenterXY = startTarget
  const endCenterXY = endTarget

  const dx = endCenterXY[0] - startCenterXY[0]
  const dy = endCenterXY[1] - startCenterXY[1]

  const w0 = Math.max(width, height)
  const w1 = w0 / scale
  const u1 = Math.sqrt(dx * dx + dy * dy) * startScale

  const _u1 = Math.max(u1, EPSILON)

  // van Wijk & Nuij 论文公式 (9)
  const rho2 = rho * rho
  const b0 = (w1 * w1 - w0 * w0 + rho2 * rho2 * _u1 * _u1) / (2 * w0 * rho2 * _u1)
  const b1 = (w1 * w1 - w0 * w0 - rho2 * rho2 * _u1 * _u1) / (2 * w1 * rho2 * _u1)
  const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0)
  const r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1)
  const S = (r1 - r0) / rho

  return {
    startZoom,
    startCenterXY,
    dx,
    dy,
    w0,
    u1,
    S,
    rho,
    rho2,
    r0,
  }
}

export class CartesianFlyToInterpolator extends TransitionInterpolator {
  opts: Required<CartesianFlyToOptions>

  constructor(opts: CartesianFlyToOptions = {}) {
    super({
      compare: ['target', 'zoom'],
      extract: ['width', 'height', 'target', 'zoom'],
      required: ['width', 'height', 'target', 'zoom'],
    })
    this.opts = { ...DEFAULT_OPTS, ...opts } as Required<CartesianFlyToOptions>
  }

  interpolateProps(
    startProps: Record<string, any>,
    endProps: Record<string, any>,
    t: number,
  ): Record<string, any> {
    const startTarget = startProps.target as [number, number]
    const endTarget = endProps.target as [number, number]
    const startZoom = startProps.zoom as number
    const endZoom = endProps.zoom as number
    const width = (startProps.width ?? endProps.width) as number
    const height = (startProps.height ?? endProps.height) as number

    const params = getCartesianFlyToParams(
      startTarget,
      startZoom,
      endTarget,
      endZoom,
      width,
      height,
      this.opts,
    )

    const { startZoom: sz, startCenterXY, dx, dy, w0, u1, S, rho, rho2, r0 } = params

    // 距离太小时退化为线性插值
    if (u1 < EPSILON) {
      return {
        target: [
          startTarget[0] + (endTarget[0] - startTarget[0]) * t,
          startTarget[1] + (endTarget[1] - startTarget[1]) * t,
        ] as [number, number],
        zoom: startZoom + (endZoom - startZoom) * t,
      }
    }

    // van Wijk & Nuij 论文公式 (9)
    const s = t * S
    const w = Math.cosh(r0) / Math.cosh(r0 + rho * s)
    const u = (w0 * ((Math.cosh(r0) * Math.tanh(r0 + rho * s) - Math.sinh(r0)) / rho2)) / u1

    const scaleIncrement = 1 / w
    const newZoom = sz + scaleToZoom(scaleIncrement)

    // 在世界坐标中插值位置（无需 worldToLngLat 反投影）
    const newTarget: [number, number] = [startCenterXY[0] + dx * u, startCenterXY[1] + dy * u]

    return {
      target: newTarget,
      zoom: newZoom,
    }
  }

  getDuration(startProps: Record<string, any>, endProps: Record<string, any>): number {
    let { transitionDuration } = endProps as any
    if (transitionDuration === 'auto') {
      const startTarget = startProps.target as [number, number]
      const endTarget = endProps.target as [number, number]
      const width = (startProps.width ?? endProps.width) as number
      const height = (startProps.height ?? endProps.height) as number

      const { S, rho } = getCartesianFlyToParams(
        startTarget,
        startProps.zoom as number,
        endTarget,
        endProps.zoom as number,
        width,
        height,
        this.opts,
      )

      const length = 1000 * S
      const { screenSpeed, speed, maxDuration } = this.opts
      if (Number.isFinite(screenSpeed)) {
        transitionDuration = length / (screenSpeed! / rho)
      } else {
        transitionDuration = length / speed
      }
      if (Number.isFinite(maxDuration) && transitionDuration > maxDuration!) {
        return maxDuration!
      }
    }
    return transitionDuration
  }
}
