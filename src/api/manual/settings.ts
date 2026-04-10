import type * as z from 'zod'
import { db } from '@/database'

const LOCAL_USER_ID = -1

type AnyKey = string

const findSettingRow = async (userId: number, settingKey: AnyKey) => {
  return db.settings.where('[userId+settingKey]').equals([userId, settingKey]).first()
}

export const getSetting = async <T>(
  userId: number,
  settingKey: AnyKey,
  schema: z.ZodSchema<T>,
): Promise<{ id: number | null; value: T } | null> => {
  const row = await findSettingRow(userId, settingKey)
  if (!row) return null
  return {
    id: row.id ?? null,
    value: schema.parse(row.settingValue),
  }
}

export const upsertSetting = async <T>(
  userId: number,
  settingKey: AnyKey,
  value: T,
  id: number | null,
): Promise<number> => {
  const now = Date.now()
  return db.settings.put({
    id: id ?? undefined,
    userId,
    settingKey,
    settingValue: value,
    updatedAt: now,
    createdAt: now,
  })
}

/**
 * 登录后：若当前用户没有该 setting，则将匿名用户的 setting 复制过去（一次性迁移）。
 * 返回是否发生迁移。
 */
export const migrateAnonymousSettingToUserIfNeeded = async <T>(
  userId: number,
  settingKey: AnyKey,
  schema: z.ZodSchema<T>,
): Promise<boolean> => {
  if (userId === LOCAL_USER_ID) return false

  const existed = await findSettingRow(userId, settingKey)
  if (existed) return false

  const local = await findSettingRow(LOCAL_USER_ID, settingKey)
  if (!local) return false

  const parsed = schema.parse(local.settingValue)
  await upsertSetting(userId, settingKey, parsed, null)
  return true
}
