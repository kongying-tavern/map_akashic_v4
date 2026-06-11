/**
 * 考虑到此系列接口会被高频调用，基于极致性能考虑，当前模块不接入到 alova 控制流中。
 */
const BASE_URL = import.meta.env.VITE_SERVICE_RESOURCE_URL

const context = {
  root: null as Promise<FileSystemDirectoryHandle> | null,
  folderHandles: new Map<string, Promise<FileSystemDirectoryHandle>>(),
}

const getUrlMeta = (url: string) => {
  // 移除协议头 (https://)，然后按 / 分割
  const path = url.replace(/^https?:\/\//, '')

  // 正则解析：
  // ([^/]+) 匹配所有非斜杠字符
  // (?=/|$) 断言后面跟着斜杠或者是字符串末尾
  const parts = path.match(/[^/]+/g)

  if (!parts) {
    throw new Error(`无法匹配缓存目录: "${url}"`)
  }

  return {
    foldername: parts.slice(0, -1).join('&'), // 除了最后一个都是文件夹
    filename: parts[parts.length - 1], // 最后一个是文件名
  }
}

const getRoot = () => {
  if (!context.root) {
    context.root = navigator.storage.getDirectory()
  }
  return context.root
}

/** 获取 tile 图片资源 */
export const getTile = async (
  query: {
    pathId: string
    x: number
    y: number
    z: number
    zMapping?: number
    extension?: string
  },
  signal?: AbortSignal,
) => {
  signal?.throwIfAborted()

  const { pathId, x, y, z, zMapping = 0, extension = 'png' } = query
  const url = `${BASE_URL}/tiles_${pathId}/${z + zMapping}/${x}_${y}.${extension}`

  // 优先检查缓存
  const { foldername, filename } = getUrlMeta(url)
  if (!context.folderHandles.has(foldername)) {
    // 缓存 tileset 目录句柄，缓存量级不会超过 100 个，因此不做清理。
    // 目前不超过 10 个地图，每地图只有 4 个 level 层级目录。
    // 未来来看不会超过 100 个独立地图，假设句柄占 1KB 内存，即使缓存 400 个句柄也不会对内存和性能形成客观影响。
    // 而缓存句柄的收益远超每次请求都重新获取句柄。
    const root = await getRoot()
    context.folderHandles.set(foldername, root.getDirectoryHandle(foldername, { create: true }))
  }
  const folder = await context.folderHandles.get(foldername)!
  const fileHandle = await folder.getFileHandle(filename).catch(() => null)

  if (fileHandle) {
    const file = await fileHandle.getFile()
    // 文件大于 0 表示写入了有效的图片文件，直接返回
    if (file.size > 0) {
      return createImageBitmap(file)
    }
  }

  // 缓存 miss 的情况
  const res = await fetch(url, {
    mode: 'cors',
    method: 'GET',
    signal,
  })
  // 请求失败直接不走缓存
  if (!res.ok) throw new Error(res.statusText || '请求失败')

  const blob = await res.blob()
  signal?.throwIfAborted()

  // 不需要等待缓存写入
  folder
    .getFileHandle(filename, { create: true })
    .then((handle) => handle.createWritable())
    .then((stream) => stream.write(blob).then(stream.close).catch(stream.abort))

  return createImageBitmap(blob)
}

/** 缓存优先的资源请求 */
export const getCacheableAsset = async (url: string, signal?: AbortSignal) => {
  signal?.throwIfAborted()

  const { foldername, filename } = getUrlMeta(url)
  if (!context.folderHandles.has(foldername)) {
    const root = await getRoot()
    context.folderHandles.set(foldername, root.getDirectoryHandle(foldername, { create: true }))
  }
  const folder = await context.folderHandles.get(foldername)!
  const fileHandle = await folder.getFileHandle(filename).catch(() => null)
  if (fileHandle) {
    const file = await fileHandle.getFile()
    // 文件大于 0 表示写入了有效的图片文件，直接返回
    if (file.size > 0) {
      return file
    }
  }

  // 缓存 miss 的情况
  const res = await fetch(url, {
    mode: 'cors',
    method: 'GET',
    signal,
  })
  // 请求失败直接不走缓存
  if (!res.ok) throw new Error(res.statusText || '请求失败')

  const blob = await res.blob()
  signal?.throwIfAborted()

  // 不需要等待缓存写入
  folder
    .getFileHandle(filename, { create: true })
    .then((handle) => handle.createWritable())
    .then((stream) => stream.write(blob).then(stream.close).catch(stream.abort))

  return blob
}
