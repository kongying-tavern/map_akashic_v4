import { Dexie } from 'dexie'

class AppDatabase extends Dexie {
  declare settings: Dexie.Table<Database.Settings, number>

  constructor() {
    super('app-database')
    this.version(1).stores({
      settings: '++id, userId, settingKey',
    })

    // v2: 为 (userId, settingKey) 增加复合索引，避免 .and() 的内存过滤
    this.version(2)
      .stores({
        settings: '++id, [userId+settingKey], userId, settingKey',
      })
      .upgrade(async (tx) => {
        // 没有数据迁移需求：仅新增索引
        await tx.table('settings').toCollection().sortBy('id')
      })
  }
}

export const db = new AppDatabase()
