import { from, map, mergeMap, toArray } from 'rxjs'
import { getCacheableAsset } from '@/api/services/assets/apiDefinitions'
import type { IconVo } from '@/api/services/main/globals'
import { handleRequest } from '@/utils/worker'

export type RenderResult =
  | {
      id: string
      error: true
      message: string
    }
  | {
      id: string
      error: false
      result: ImageBitmap
    }

export interface RenderRequest {
  id: string
  data: IconVo[]
}

const CONCURRENCY_LIMIT = 10

const pendingRequests = new Map<string, Promise<Blob | File>>()

/** 请求去重 */
const fetchIconAsset = async (url: string): Promise<Blob | File> => {
  const existing = pendingRequests.get(url)
  if (existing) return existing

  const promise = getCacheableAsset(url)
  pendingRequests.set(url, promise)

  try {
    return await promise
  } finally {
    pendingRequests.delete(url)
  }
}

handleRequest<IconVo[], ImageBitmap>(async (icons, send) => {
  // TODO
})
