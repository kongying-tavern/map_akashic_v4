import type { Viewport } from '@deck.gl/core'
import type {
  ChildTileSlot,
  ResolvedTileset,
  TileExtent,
  TileGridData,
  TileSublayerProps,
} from '../../types/tile-layer'

export const loadTileImage = async (url: string, signal?: AbortSignal) => {
  const res = await fetch(url, {
    mode: 'cors',
    method: 'GET',
    signal,
  })
  if (res.status !== 200) {
    throw new Error(`failed to load tile: ${url}, ${res.statusText}.`)
  }
  const blob = await res.blob()
  // cache the blob, no need to wait
  const bmp = await createImageBitmap(blob)
  return { bmp, blob }
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
  } as TileExtent
}

export const clampTileZoom = (
  zoom: number,
  minZoom: number,
  maxZoom: number,
  zoomOffset: number,
) => {
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
  return [
    targetX - halfWidth,
    targetY - halfHeight,
    targetX + halfWidth,
    targetY + halfHeight,
  ] as const
}

export const createTileGridData = ({
  extent,
  viewportBounds,
  step,
  z,
}: {
  extent: { xmin: number; ymin: number; xmax: number; ymax: number }
  viewportBounds?: readonly [number, number, number, number]
  step: number
  z: number
}) => {
  const { xmin, ymin, xmax, ymax } = extent
  const [localMinX, localMinY, localMaxX, localMaxY] = viewportBounds ?? [xmin, ymin, xmax, ymax]
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

export const buildTileAddress = ({
  baseUrl,
  pathId,
  extension,
  zoomMapping,
  z,
  x,
  y,
}: {
  baseUrl: string
  pathId: string
  extension: string
  zoomMapping: number
  z: number
  x: number
  y: number
}) => {
  const level = z + zoomMapping
  const name = `${x}_${y}.${extension}`
  return {
    url: `${baseUrl}${pathId}/${level}/${name}`,
    cacheId: `${pathId}_${level}_${name}`,
  }
}

export const computePreRenderMinZoom = ({
  tilesAtMinZoom,
  extent,
  minZoom,
  maxZoom,
  tileSize,
}: {
  tilesAtMinZoom: TileGridData[]
  extent: TileExtent
  minZoom: number
  maxZoom: number
  tileSize: number
}) => {
  let currentTiles = tilesAtMinZoom
  let currentZoom = minZoom
  while (currentTiles.length > 1) {
    const nextZoom = currentZoom - 1
    const step = tileSize * 2 ** (maxZoom - nextZoom)
    const nextTiles = createTileGridData({
      extent,
      step,
      z: nextZoom,
    })
    if (nextTiles.length === currentTiles.length) {
      break
    }
    currentZoom = nextZoom
    currentTiles = nextTiles
    if (currentTiles.length <= 1) {
      break
    }
  }
  return currentZoom
}

export const computeTileCanvasLayout = ({
  tiles,
  tileSize,
}: {
  tiles: Pick<TileGridData, 'x' | 'y'>[]
  tileSize: number
}) => {
  const minTileX = Math.min(...tiles.map((tile) => tile.x))
  const minTileY = Math.min(...tiles.map((tile) => tile.y))
  const maxTileX = Math.max(...tiles.map((tile) => tile.x))
  const maxTileY = Math.max(...tiles.map((tile) => tile.y))
  const tileCols = maxTileX - minTileX + 1
  const tileRows = maxTileY - minTileY + 1
  return {
    minTileX,
    minTileY,
    maxTileX,
    maxTileY,
    tileCols,
    tileRows,
    canvasWidth: tileCols * tileSize,
    canvasHeight: tileRows * tileSize,
  }
}

export const computeTileDrawOffset = ({
  x,
  y,
  minTileX,
  minTileY,
  tileSize,
}: {
  x: number
  y: number
  minTileX: number
  minTileY: number
  tileSize: number
}) => {
  return {
    dx: (x - minTileX) * tileSize,
    dy: (y - minTileY) * tileSize,
  }
}

export const buildTileKey = ({ x, y }: { x: number; y: number }) => {
  return `${x}_${y}`
}

export const computeChildTileSlots = ({
  x,
  y,
  tileSize,
}: {
  x: number
  y: number
  tileSize: number
}) => {
  const half = tileSize / 2
  const slots: ChildTileSlot[] = []
  for (let childXOffset = 0; childXOffset <= 1; childXOffset += 1) {
    for (let childYOffset = 0; childYOffset <= 1; childYOffset += 1) {
      const childX = x * 2 + childXOffset
      const childY = y * 2 + childYOffset
      slots.push({
        childX,
        childY,
        childKey: buildTileKey({ x: childX, y: childY }),
        dx: childXOffset * half,
        dy: childYOffset * half,
        dSize: half,
      })
    }
  }
  return slots
}
