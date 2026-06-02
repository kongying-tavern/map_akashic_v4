/**
 * 考虑到此系列接口会被高频调用，基于极致性能考虑，当前模块不接入到 alova 控制流中。
 */
const BASE_URL = import.meta.env.VITE_SERVICE_RESOURCE_URL

const context = {
  dir: null as Promise<FileSystemDirectoryHandle> | null,
  tilesetDirs: new Map<string, Promise<FileSystemDirectoryHandle>>(),
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

/** 获取 tile 图片资源 */
export const getTile = async (query: {
  pathId: string
  x: number
  y: number
  z: number
  zMapping?: number
  extension?: string
}) => {
  const { pathId, x, y, z, zMapping = 0, extension = 'png' } = query
  const url = `${BASE_URL}/tiles_${pathId}/${z + zMapping}/${x}_${y}.${extension}`

  // 优先检查缓存
  if (!context.dir) {
    context.dir = navigator.storage.getDirectory()
  }
  const dir = await context.dir
  const { foldername, filename } = getUrlMeta(url)
  if (!context.tilesetDirs.has(foldername)) {
    // 缓存 tileset 目录句柄，缓存量级不会超过 100 个，因此不做清理。
    // 目前不超过 10 个地图，每地图只有 4 个 level 层级目录。
    // 未来来看不会超过 100 个独立地图，假设句柄占 1KB 内存，即使缓存 400 个句柄也不会对内存和性能形成客观影响。
    // 而缓存句柄的收益远超每次请求都重新获取句柄。
    context.tilesetDirs.set(foldername, dir.getDirectoryHandle(foldername, { create: true }))
  }
  const folder = await context.tilesetDirs.get(foldername)!
  const fileHandle = await folder.getFileHandle(filename, { create: true })
  const file = await fileHandle.getFile()

  // 文件大于 0 表示写入了有效的图片文件，直接返回
  if (file.size > 0) {
    return createImageBitmap(file)
  }

  // 缓存 miss 的情况
  const res = await fetch(url, {
    mode: 'cors',
    method: 'GET',
  })
  // 请求失败直接不走缓存
  if (!res.ok) throw new Error(res.statusText || '请求失败')

  const blob = await res.blob()

  // 不需要等待缓存写入
  fileHandle
    .createWritable()
    .then((writable) => writable.write(blob).finally(() => writable.close()))

  return createImageBitmap(blob)
}
