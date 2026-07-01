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

export const formatPerformanceTime = (ms: number) => {
  if (typeof ms !== 'number' || isNaN(ms)) return '0 ms'
  if (ms === 0) return '0 ms'

  // 定义单位阶梯，基准是毫秒 (1 ms)
  const units = [
    { name: 's', value: 1000 },
    { name: 'ms', value: 1 },
    { name: 'µs', value: 1 / 1000 },
    { name: 'ns', value: 1 / 1000000 },
  ]

  // 绝对值处理，确保支持负数耗时（比如计算时间差时）
  const absMs = Math.abs(ms)

  // 寻找最适合的单位：数值比单位基准大，或者已经是最小的纳秒单位
  const unit = units.find((u) => absMs >= u.value) || units[units.length - 1]

  // 计算转换后的数值
  const convertedValue = ms / unit.value

  // 格式化输出：保留 2 位小数。如果是整数则不带小数点
  const formattedNumber = Number(convertedValue.toFixed(2))

  return `${formattedNumber} ${unit.name}`
}
