import { canvasToBlob } from '@/utils/canvas'
import { loadTileImage } from './tile-utils'

export class TileCache {
  #handleMap = new Map<string, FileSystemDirectoryHandle>()
  #cacheGetPromiseMap = new Map<string, Promise<ImageBitmap | null>>()
  #cacheSetPromiseMap = new Map<string, Promise<void>>()
  #cacheInflightMap = new Map<string, Promise<ImageBitmap>>()
  #cacheMemoryMap = new Map<string, { bmp: ImageBitmap; byteLength: number }>()
  #cacheMemoryUsage = 0
  #getMaxCacheMemoryMB: () => number

  constructor(options?: { getMaxCacheMemoryMB?: () => number }) {
    this.#getMaxCacheMemoryMB = options?.getMaxCacheMemoryMB ?? (() => 512)
  }

  #getCacheHandle = async (pathId: string) => {
    const cacheHandle = this.#handleMap.get(pathId)
    if (cacheHandle) {
      return cacheHandle
    }
    const root = await navigator.storage.getDirectory()
    const handle = await root.getDirectoryHandle(`cache_tile_${pathId}`, { create: true })
    this.#handleMap.set(pathId, handle)
    return handle
  }

  #getMaxCacheMemoryBytes = () => {
    const mb = this.#getMaxCacheMemoryMB()
    if (!Number.isFinite(mb) || mb <= 0) {
      return 0
    }
    return mb * 1024 * 1024
  }

  #setMemoryCache = (id: string, bmp: ImageBitmap, byteLength: number) => {
    const maxBytes = this.#getMaxCacheMemoryBytes()
    if (maxBytes <= 0 || byteLength > maxBytes) {
      return
    }
    const existed = this.#cacheMemoryMap.get(id)
    if (existed) {
      this.#cacheMemoryMap.delete(id)
      this.#cacheMemoryUsage -= existed.byteLength
    }
    this.#cacheMemoryMap.set(id, { bmp, byteLength })
    this.#cacheMemoryUsage += byteLength
    while (this.#cacheMemoryUsage > maxBytes && this.#cacheMemoryMap.size > 0) {
      const oldestId = this.#cacheMemoryMap.keys().next().value as string | undefined
      if (!oldestId) {
        break
      }
      const oldestCache = this.#cacheMemoryMap.get(oldestId)
      if (!oldestCache) {
        continue
      }
      this.#cacheMemoryMap.delete(oldestId)
      this.#cacheMemoryUsage -= oldestCache.byteLength
    }
  }

  get = async (pathId: string, id: string) => {
    const memoryCache = this.#cacheMemoryMap.get(id)
    if (memoryCache) {
      // 命中内存缓存时刷新其最近使用顺序（LRU）
      this.#cacheMemoryMap.delete(id)
      this.#cacheMemoryMap.set(id, memoryCache)
      return memoryCache.bmp
    }
    const cachePromise = this.#cacheGetPromiseMap.get(id)
    if (cachePromise) {
      return cachePromise
    }
    const promise = (async () => {
      try {
        const cacheHandle = await this.#getCacheHandle(pathId)
        const fileHandle = await cacheHandle.getFileHandle(id).catch(() => null)
        if (!fileHandle) {
          return null
        }
        const file = await fileHandle.getFile()
        const bmp = await createImageBitmap(file)
        this.#setMemoryCache(id, bmp, bmp.width * bmp.height * 4)
        return bmp
      } catch (error) {
        console.error(`failed to get cache: ${id}.`, error)
        return null
      } finally {
        this.#cacheGetPromiseMap.delete(id)
      }
    })()
    this.#cacheGetPromiseMap.set(id, promise)
    return promise
  }

  set = async (pathId: string, id: string, blob: Blob) => {
    const cachePromise = this.#cacheSetPromiseMap.get(id)
    if (cachePromise) {
      return cachePromise
    }
    const promise = (async () => {
      try {
        const cacheHandle = await this.#getCacheHandle(pathId)
        const fileHandle = await cacheHandle.getFileHandle(id, { create: true })
        const writer = await fileHandle.createWritable()
        await writer.write(blob)
        await writer.close()
      } catch (error) {
        console.error(`failed to set cache: ${id}.`, error)
      } finally {
        this.#cacheSetPromiseMap.delete(id)
      }
    })()
    this.#cacheSetPromiseMap.set(id, promise)
    return promise
  }

  getOrLoad = async (pathId: string, id: string, url: string) => {
    const cached = await this.get(pathId, id)
    if (cached) {
      return cached
    }
    const inflight = this.#cacheInflightMap.get(id)
    if (inflight) {
      return inflight
    }
    const promise = (async () => {
      const { bmp, blob } = await loadTileImage(url)
      this.#setMemoryCache(id, bmp, bmp.width * bmp.height * 4)
      this.set(pathId, id, blob)
      return bmp
    })()
    this.#cacheInflightMap.set(id, promise)
    try {
      return await promise
    } finally {
      this.#cacheInflightMap.delete(id)
    }
  }

  cacheGeneratedTile = async (
    pathId: string,
    cacheId: string,
    canvas: OffscreenCanvas | HTMLCanvasElement,
  ) => {
    const useOffscreen = typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas
    const blob = await canvasToBlob(canvas, useOffscreen, 'image/png')
    const bmp = await createImageBitmap(blob)
    this.#setMemoryCache(cacheId, bmp, bmp.width * bmp.height * 4)
    await this.set(pathId, cacheId, blob)
    return bmp
  }

  dispose = () => {
    this.#handleMap.clear()
    this.#cacheGetPromiseMap.clear()
    this.#cacheSetPromiseMap.clear()
    this.#cacheInflightMap.clear()
    for (const { bmp } of this.#cacheMemoryMap.values()) {
      bmp.close()
    }
    this.#cacheMemoryMap.clear()
    this.#cacheMemoryUsage = 0
  }
}
