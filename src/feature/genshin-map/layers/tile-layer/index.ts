import type { DefaultProps } from '@deck.gl/core'
import { CompositeLayer, Layer } from 'deck.gl'
import type { TileLayerFactoryConfig, TilesetLayerProps } from '../../types/tile-layer'
import { TileCache } from './tile-cache'
import {
  createBorderLayer,
  createOriginLayer,
  createTileGridLayer,
  createTileInfoLayer,
  createTileLayer,
} from './tile-factories'

const BASE_URL = import.meta.env.VITE_TILE_ASSETS_BASE
const ZOOM_MAPPING = 13
const TILE_GRID_SIZE = 256
const TILE_GRID_MIN_ZOOM = -3
const TILE_GRID_MAX_ZOOM = 0
const TILE_GRID_ZOOM_OFFSET = 0
const TILE_LAYER_FACTORY_CONFIG: TileLayerFactoryConfig = {
  baseUrl: BASE_URL,
  zoomMapping: ZOOM_MAPPING,
  tileGridSize: TILE_GRID_SIZE,
  tileGridMinZoom: TILE_GRID_MIN_ZOOM,
  tileGridMaxZoom: TILE_GRID_MAX_ZOOM,
  tileGridZoomOffset: TILE_GRID_ZOOM_OFFSET,
}

export class TilesetLayer extends CompositeLayer<TilesetLayerProps> {
  static layerName = 'TilesetLayer'

  static defaultProps: DefaultProps<TilesetLayerProps> = {
    data: { type: 'data', value: null },
    showBounds: { type: 'boolean', value: false },
    showOrigin: { type: 'boolean', value: false },
    showTileInfo: { type: 'boolean', value: false },
    maxCacheMemory: { type: 'number', value: 512 },
  }

  constructor(props: TilesetLayerProps) {
    super({
      ...props,
      id: `tileset(${props.data?.id ?? 'null'})`,
    })
    this.#tileCache = new TileCache({
      getMaxCacheMemoryMB: () => this.props.maxCacheMemory ?? 512,
    })
    Reflect.set(globalThis, 'tilesetLayer', this)
  }

  #tileCache: TileCache
  #tileLayerRevision = 0

  #getPathId = () => {
    const pathId = this.props.data?.pathId
    if (!pathId) {
      throw new Error('tile cache requires valid tileset data.')
    }
    return pathId
  }

  #getOrLoadTile = async (id: string, url: string) => {
    return this.#tileCache.getOrLoad(this.#getPathId(), id, url)
  }

  shouldUpdateState: CompositeLayer<TilesetLayerProps>['shouldUpdateState'] = ({ changeFlags }) => {
    return changeFlags.somethingChanged
  }

  renderLayers = (): (Layer | null)[] => {
    const tileLayer = createTileLayer(this.props, TILE_LAYER_FACTORY_CONFIG, {
      getOrLoadTile: this.#getOrLoadTile,
      minZoom: TILE_GRID_MIN_ZOOM,
      revision: this.#tileLayerRevision,
    })
    const tileGridLayer =
      createTileGridLayer(this.props, this.context.viewport, TILE_LAYER_FACTORY_CONFIG) ?? []
    const borderLayer = createBorderLayer(this.props)
    const originLayer = createOriginLayer(this.props)
    const tileInfoLayer = createTileInfoLayer(this.props)
    return [tileLayer, ...tileGridLayer, borderLayer, originLayer, tileInfoLayer]
  }

  finalizeState: CompositeLayer<TilesetLayerProps>['finalizeState'] = (context) => {
    super.finalizeState?.(context)
    this.#tileCache.dispose()
    this.#tileLayerRevision = 0
  }
}
