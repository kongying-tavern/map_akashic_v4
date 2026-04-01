import type { Viewport } from '@deck.gl/core'
import type { ResolvedTileset, TileSublayerProps } from '../types'

export type TileGridData = {
  x: number
  y: number
  z: number
  path: [number, number][]
}

export const createBmpProps = (url: string, bmp: ImageBitmap): TileSublayerProps => {
  return {
    byteLength: bmp.width * bmp.height * 4, // RGBA
    image: bmp,
    url,
  }
}

export const getExtent = (data: ResolvedTileset) => {
  const {
    size: { 0: w, 1: h },
    tilesOffset: { 0: ox, 1: oy },
  } = data
  return {
    xmin: ox,
    xmax: w + ox,
    ymin: oy,
    ymax: h + oy,
  }
}

export const clampTileZoom = (zoom: number, minZoom: number, maxZoom: number, zoomOffset: number) => {
  // Align with Deck.GL TileLayer (Tileset2D#getTileIndices):
  // For non-geospatial viewport, z = ceil(viewport.zoom) + zoomOffset.
  const z = Math.ceil(zoom) + zoomOffset
  return Math.min(maxZoom, Math.max(minZoom, z))
}

export const getViewportBounds = (viewport: Viewport) => {
  const zoom = viewport.zoom ?? 0
  const scale = 2 ** zoom
  const halfWidth = (viewport.width ?? 0) / (2 * scale)
  const halfHeight = (viewport.height ?? 0) / (2 * scale)
  const targetX = viewport.center?.[0] ?? 0
  const targetY = viewport.center?.[1] ?? 0
  return [targetX - halfWidth, targetY - halfHeight, targetX + halfWidth, targetY + halfHeight] as const
}

export const createTileGridData = (
  extent: { xmin: number; ymin: number; xmax: number; ymax: number },
  viewportBounds: readonly [number, number, number, number],
  step: number,
  z: number,
) => {
  const { xmin, ymin, xmax, ymax } = extent
  const [localMinX, localMinY, localMaxX, localMaxY] = viewportBounds
  // Align with Deck.GL getBoundingBox + getIdentityTileIndices:
  // clamp bounds into extent, then iterate [floor(min), max) on tile coordinates.
  const boundedMinX = Math.max(Math.min(localMinX, xmax), xmin)
  const boundedMinY = Math.max(Math.min(localMinY, ymax), ymin)
  const boundedMaxX = Math.min(Math.max(localMaxX, xmin), xmax)
  const boundedMaxY = Math.min(Math.max(localMaxY, ymin), ymax)

  const minX = boundedMinX / step
  const minY = boundedMinY / step
  const maxX = boundedMaxX / step
  const maxY = boundedMaxY / step

  const tileGridData: TileGridData[] = []
  for (let x = Math.floor(minX); x < maxX; x += 1) {
    const left = x * step
    const right = (x + 1) * step
    for (let y = Math.floor(minY); y < maxY; y += 1) {
      const bottom = (y + 1) * step
      const top = y * step
      tileGridData.push({
        x,
        y,
        z,
        path: [
          [left, top],
          [left, bottom],
          [right, bottom],
          [right, top],
          [left, top],
        ],
      })
    }
  }
  return tileGridData
}
