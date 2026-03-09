<script setup lang="ts">
import type { UnwrapedTileConfig } from '@/stores'
import { BitmapLayer, Deck, OrbitController, OrthographicView, PathLayer, TileLayer } from 'deck.gl'

const props = defineProps<{
  config: UnwrapedTileConfig
}>()

const deckRef = shallowRef<Deck<OrthographicView>>()
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

const ZOOM_MAPPING = 13

interface TileData {
  byteLength: number
  image: ImageBitmap
  url: string
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return

  const {
    id,
    tilesId,
    center: [cx, cy] = [0, 0],
    size: [w, h] = [0, 0],
    tilesOffset: [ox, oy] = [0, 0],
    extension = 'png',
    settings: {
      zoom: initZoom = 0,
    } = {},
  } = props.config

  const tileLayerBaseUrl = `${import.meta.env.VITE_TILE_ASSETS_BASE}/tiles_${tilesId}`

  const tileLayer = new TileLayer<TileData | null>({
    id,
    tileSize: 256,
    data: undefined,
    minZoom: -3, // 固定值，对应服务端存储底图的 level 10
    maxZoom: 0, // 固定值，对应服务端存储底图的 level 13
    extent: [ox, h + oy, w + ox, oy],
    getTileData: async ({ index, signal }) => {
      if (signal?.aborted)
        return null
      const url = `${tileLayerBaseUrl}/${index.z + ZOOM_MAPPING}/${index.x}_${index.y}.${extension || 'png'}`
      try {
        const res = await fetch(url, { mode: 'cors', method: 'GET' })
        const blob = await res.blob()
        const bmp = await createImageBitmap(blob)
        return {
          byteLength: blob.size,
          image: bmp,
          url,
        } satisfies TileData
      }
      catch {
        return null
      }
    },
    renderSubLayers: (props) => {
      const [[xmin, ymin], [xmax, ymax]] = props.tile.boundingBox
      if (!props.data) {
        return null
      }
      const { url, image } = props.data
      return new BitmapLayer({
        id: url,
        image,
        bounds: [xmin, ymax, xmax, ymin],
      })
    },
  })

  const borderLayer = new PathLayer({
    getWidth: 20,
    getColor: () => [255, 0, 0],
    data: [
      {
        name: 'bounds',
        path: [
          [ox, h + oy],
          [w + ox, h + oy],
          [w + ox, oy],
          [ox, oy],
          [ox, h + oy],
        ],
      },
    ],
  })

  const deck = new Deck<OrthographicView>({
    canvas,
    views: new OrthographicView({
      controller: OrbitController,
    }),
    initialViewState: {
      target: [cx, cy],
      zoom: initZoom,
    },
    layers: [
      tileLayer,
      borderLayer,
    ],
  })

  deckRef.value = deck
})

onUnmounted(() => {
  const deck = deckRef.value
  if (!deck)
    return
  deck.finalize()
})
</script>

<template>
  <div class="relative w-full h-full overflow-hidden relative">
    <canvas ref="canvasRef" />

    <div class="absolute left-4 top-4 text-sm">
      {{ `ID: ${$props.config.id}` }}
    </div>
  </div>
</template>
