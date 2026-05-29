import { styleText as style } from 'node:util'

const now = () => {
  return Temporal.Now.plainTimeISO().toString({
    smallestUnit: 'seconds',
  })
}

export class Logger {
  static info = (msg: string) => {
    console.log(style('dim', now()), style('bold', style('cyan', '[vite]')), msg)
  }

  static success = (msg: string) => {
    console.log(style('dim', now()), style('bold', style('cyan', '[vite]')), style('green', msg))
  }
}
