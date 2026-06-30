/**
 * 统一的 Worker 消息通信协议类型
 */
export type WorkerMessage<Input, Output> =
  | {
      type: 'request'
      id: string
      data: Input
    }
  | {
      type: 'response'
      id: string
      error: false
      result: Output
    }
  | {
      type: 'response'
      id: string
      error: true
      message: string
    }

export interface InvokeWorkerOptions {
  /** 超时时间（毫秒），默认不超时 */
  timeout?: number
}

/**
 * 与 Worker 进行一次性异步交互的纯函数（主线程调用）
 */
export function invokeWorker<Input, Output>(
  worker: Worker,
  payload: Input,
  options?: InvokeWorkerOptions,
): Promise<Output> {
  return new Promise<Output>((resolve, reject) => {
    const requestId = crypto.randomUUID()
    let timer: ReturnType<typeof setTimeout> | undefined

    const handler = ({
      data,
    }: MessageEvent<Extract<WorkerMessage<Input, Output>, { type: 'response' }>>) => {
      if (data.type !== 'response' || requestId !== data.id) return

      if (data.error) {
        reject(new Error(data.message))
      } else {
        resolve(data.result)
      }

      worker.removeEventListener('message', handler)
      if (timer) clearTimeout(timer)
    }

    worker.addEventListener('message', handler)

    if (options?.timeout) {
      timer = setTimeout(() => {
        worker.removeEventListener('message', handler)
        reject(new Error(`Worker 调用超时（${options.timeout}ms）`))
      }, options.timeout)
    }

    worker.postMessage({
      type: 'request',
      id: requestId,
      data: payload,
    } satisfies Extract<WorkerMessage<Input, Output>, { type: 'request' }>)
  })
}

/**
 * 监听并处理 Worker 请求的通用纯函数（Worker 线程调用）
 */
export function handleRequest<Input, Output>(
  handler: (data: Input, send: (result: Output, transfer?: Transferable[]) => void) => void,
) {
  globalThis.addEventListener(
    'message',
    async (event: MessageEvent<Extract<WorkerMessage<Input, Output>, { type: 'request' }>>) => {
      const msg = event.data

      if (!msg || msg.type !== 'request') return
      const { id, data } = msg

      // 标记是否已经发送过响应，防止重复发送
      let isSent = false

      const send = (result: Output, transfer?: Transferable[]) => {
        if (isSent) return
        isSent = true
        globalThis.postMessage(
          {
            type: 'response',
            id,
            error: false,
            result,
          } satisfies Extract<WorkerMessage<Input, Output>, { type: 'response'; error: false }>,
          transfer ?? [],
        )
      }

      try {
        // 使用 Promise.resolve 包裹，完美兼容同步/异步函数，并确保能 catch 到所有异步错误
        const returnedResult = await handler(data, send)

        // 如果用户没有通过 send 显式发送，且函数有明确的返回值，则自动帮他发送
        if (!isSent && returnedResult !== undefined) {
          send(returnedResult as Output)
        }
      } catch (err) {
        globalThis.postMessage({
          type: 'response',
          id,
          error: true,
          message: err instanceof Error ? err.message : String(err),
        } satisfies Extract<WorkerMessage<Input, Output>, { type: 'response'; error: true }>)
      }
    },
  )
}
