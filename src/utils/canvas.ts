export const createCanvas2D = (width: number, height: number) => {
  const useOffscreen = typeof OffscreenCanvas !== 'undefined'
  const canvas = useOffscreen
    ? new OffscreenCanvas(width, height)
    : Object.assign(document.createElement('canvas'), {
        width,
        height,
      })
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to create 2D context.')
  }
  return { canvas, ctx, useOffscreen }
}

export const canvasToBlob = async (
  canvas: OffscreenCanvas | HTMLCanvasElement,
  useOffscreen: boolean,
  type = 'image/png',
) => {
  if (useOffscreen) {
    return (canvas as OffscreenCanvas).convertToBlob({ type })
  }
  return new Promise<Blob>((resolve, reject) => {
    ;(canvas as HTMLCanvasElement).toBlob((result) => {
      if (!result) {
        reject(new Error('Failed to export canvas blob.'))
        return
      }
      resolve(result)
    }, type)
  })
}
