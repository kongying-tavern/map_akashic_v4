/**
 * 此类型模块用于声明当前未被广泛支持的实验性 API 的类型
 * - 请注意，所有受限 API 应当被声明为可选类型，并在检测到不支持时进行全局提醒
 * - 应用不能依赖受限 API 进行初始化
 */
export {}

interface ShowOpenFilePicker {
  (): Promise<FileSystemFileHandle>
}

declare global {
  interface Window {
    showOpenFilePicker?: ShowOpenFilePicker
  }
}
