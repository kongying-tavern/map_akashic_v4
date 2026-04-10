declare namespace Database {
  /** 设置项 */
  interface Settings {
    id?: number
    userId: number
    settingKey: string
    settingValue: unknown
    updatedAt: number
    createdAt: number
  }
}
