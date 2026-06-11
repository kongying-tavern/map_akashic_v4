export const decompress = async <T = unknown>(res: unknown) => {
  if (!(res instanceof Response)) throw new Error('Not a Response')
  const ds = new DecompressionStream('gzip')
  const response = new Response(res.body?.pipeThrough(ds))
  const text = await response.text()
  return JSON.parse(text) as T
}
