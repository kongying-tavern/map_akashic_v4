import { from, mergeMap, Subject } from 'rxjs'

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type AsyncTask<TArgs extends unknown[], TResult> = {
  args: TArgs
  resolve: (value: TResult) => void
  reject: (reason?: unknown) => void
}

/**
 * 创建一个异步操作并发控制函数。
 *
 * @example
 * const fetchUser = createAsyncConcurrencyFactory(
 *   async (id: string) => {
 *     const response = await fetch(`/api/users/${id}`)
 *     return response.json()
 *   },
 *   3,
 * )
 *
 * const users = await Promise.all([
 *   fetchUser('1'),
 *   fetchUser('2'),
 *   fetchUser('3'),
 *   fetchUser('4'),
 * ])
 *
 * fetchUser.destroy()
 */
export const createAsyncConcurrencyFactory = <TArgs extends unknown[], TResult>(
  worker: (...args: TArgs) => Promise<TResult>,
  concurrency = 1,
) => {
  const queue$ = new Subject<AsyncTask<TArgs, TResult>>()

  const subscription = queue$
    .pipe(
      mergeMap((task) => from(worker(...task.args).then(task.resolve, task.reject)), concurrency),
    )
    .subscribe()

  const run = (...args: TArgs) => {
    return new Promise<TResult>((resolve, reject) => {
      queue$.next({ args, resolve, reject })
    })
  }

  run.destroy = () => {
    subscription.unsubscribe()
    queue$.complete()
  }

  return run
}
