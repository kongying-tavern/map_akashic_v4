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
      type: 'command'
      id: string
      command: 'abort'
      message?: string
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
  /** 取消信号，用于中断 worker 的任务 */
  signal?: AbortSignal
}

const ABORT_MESSAGE = 'Worker 调用已取消'

const getAbortMessage = (signal?: AbortSignal) => {
  const reason = signal?.reason
  if (reason === undefined) return ABORT_MESSAGE
  if (reason instanceof Error) return reason.message
  if (reason && typeof reason === 'object' && 'message' in reason) {
    return String(reason.message)
  }
  return String(reason)
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
    const { signal } = options ?? {}
    let timer: ReturnType<typeof setTimeout> | undefined

    const cleanup = () => {
      worker.removeEventListener('message', handler)
      signal?.removeEventListener('abort', abort)
      if (timer) clearTimeout(timer)
    }

    const abort = () => {
      worker.postMessage({
        type: 'command',
        id: requestId,
        command: 'abort',
        message: getAbortMessage(signal),
      } satisfies Extract<WorkerMessage<Input, Output>, { type: 'command' }>)
    }

    const handler = ({
      data,
    }: MessageEvent<Extract<WorkerMessage<Input, Output>, { type: 'response' }>>) => {
      if (data.type !== 'response' || requestId !== data.id) return

      cleanup()

      if (data.error) {
        reject(new Error(data.message))
      } else {
        resolve(data.result)
      }
    }

    worker.addEventListener('message', handler)
    signal?.addEventListener('abort', abort, { once: true })

    if (options?.timeout) {
      timer = setTimeout(() => {
        cleanup()
        reject(new Error(`Worker 调用超时 (${options.timeout}ms)`))
      }, options.timeout)
    }

    worker.postMessage({
      type: 'request',
      id: requestId,
      data: payload,
    } satisfies Extract<WorkerMessage<Input, Output>, { type: 'request' }>)

    if (signal?.aborted) abort()
  })
}

/**
 * 监听并处理 Worker 请求的通用纯函数（Worker 线程调用）
 */
export function handleRequest<Input, Output>(
  handler: (
    data: Input,
    send: (result: Output, transfer?: Transferable[]) => void,
    signal: AbortSignal,
  ) => unknown,
) {
  let controller = new AbortController()
  const activeRequests = new Map<string, (message: string) => void>()

  const postError = (id: string, message: string) => {
    globalThis.postMessage({
      type: 'response',
      id,
      error: true,
      message,
    } satisfies Extract<WorkerMessage<Input, Output>, { type: 'response'; error: true }>)
  }

  globalThis.addEventListener(
    'message',
    async (event: MessageEvent<WorkerMessage<Input, Output>>) => {
      const msg = event.data

      if (!msg) return

      if (msg.type === 'command') {
        if (msg.command !== 'abort') return

        controller.abort()
        const message = msg.message ?? ABORT_MESSAGE
        const abortRequest = activeRequests.get(msg.id)

        if (abortRequest) {
          abortRequest(message)
        } else {
          postError(msg.id, message)
        }
        return
      }

      if (msg.type !== 'request') return
      const { id, data } = msg

      if (controller.signal.aborted) {
        controller = new AbortController()
      }

      // 标记是否已经发送过响应，防止重复发送
      let isSent = false

      const sendError = (message: string) => {
        if (isSent) return
        isSent = true
        activeRequests.delete(id)
        postError(id, message)
      }

      const send = (result: Output, transfer?: Transferable[]) => {
        if (isSent) return
        isSent = true
        activeRequests.delete(id)
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

      activeRequests.set(id, sendError)

      try {
        controller.signal.throwIfAborted()
        const returnedResult = await Promise.resolve(handler(data, send, controller.signal))

        // 如果用户没有通过 send 显式发送，且函数有明确的返回值，则自动帮他发送
        if (!isSent && returnedResult !== undefined) {
          send(returnedResult as Output)
        }
      } catch (err) {
        sendError(err instanceof Error ? err.message : String(err))
      } finally {
        if (!isSent) {
          activeRequests.delete(id)
        }
      }
    },
  )
}
