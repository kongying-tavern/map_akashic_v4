export const decompress = async <T = unknown>(res: unknown) => {
  if (!(res instanceof Response)) throw new Error('Not a Response')
  const ds = new DecompressionStream('gzip')
  const response = new Response(res.body?.pipeThrough(ds))
  return response.json() as T
}
