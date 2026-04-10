import type * as z from 'zod'
import {
  getSetting,
  migrateAnonymousSettingToUserIfNeeded,
  upsertSetting,
} from '@/api/manual/settings'
import type { SettingsKey } from '@/database/schemas/settings'
import { useUserStore } from '@/stores'

const LOCAL_USER_ID = -1

/**
 * ## 异步设置 hook
 * 1. 持久化能力，数据与用户绑定（未登录用户存储在本地）
 * 2. 双向同步，乐观更新：先更新 UI 再更新数据库
 * 3. 错误回退处理：如果更新失败，则回退 UI 状态
 * 4. 并发限制：避免重复更新导致数据不一致
 */
export const useAsyncSettingValue = <T>(
  settingKey: SettingsKey,
  schema: z.ZodSchema<T>,
  initialValue: T,
) => {
  const userStore = useUserStore()

  const settingId = ref<number | null>(null)

  const settingValue = shallowRef<T>(initialValue)

  const initLoading = ref(true)
  const pendingWrites = ref(0)

  const userIdRef = computed(() => userStore.info?.id ?? LOCAL_USER_ID)

  // 写入串行化 + “最后一次写入生效”
  let writeSeq = 0
  let writeQueue: Promise<void> = Promise.resolve()

  const loadFromStorage = async () => {
    initLoading.value = true
    try {
      const userId = userIdRef.value
      const setting = await getSetting(userId, settingKey, schema)
      if (!setting) {
        settingId.value = null
        settingValue.value = initialValue
        return
      }

      settingId.value = setting.id
      settingValue.value = setting.value
    } catch (error) {
      console.error(`[useSettingValue] initialize "${settingKey}" failed:`, error)
    } finally {
      initLoading.value = false
    }
  }

  const modelValue = computed({
    get: () => {
      return settingValue.value as T
    },
    set: (newValue) => {
      if (initLoading.value) {
        console.warn(`[useSettingValue] "${settingKey}" is initializing, update ignored`)
        return
      }

      const parsed = schema.safeParse(newValue)
      if (!parsed.success) {
        console.warn(
          `[useSettingValue] "${settingKey}" validation failed, update ignored`,
          parsed.error,
        )
        return
      }

      const nextValue = parsed.data
      const seq = ++writeSeq

      let oldValue: T
      try {
        // structuredClone 失败时回退为引用（对象场景下回退不保证深度一致，但比直接崩溃好）
        oldValue = structuredClone(settingValue.value)
      } catch {
        oldValue = settingValue.value
      }

      // 乐观更新 UI
      settingValue.value = nextValue

      pendingWrites.value += 1
      writeQueue = writeQueue
        .then(async () => {
          const userId = userIdRef.value
          // 仅处理“当前最新写入”，较旧写入直接跳过（避免后写先落库/回退覆盖）
          if (seq !== writeSeq) return

          // “远程持久化适配”：当前统一写到本地（按 userId 隔离），未来替换成真实 API
          const id = await upsertSetting(userId, settingKey, nextValue, settingId.value)
          settingId.value = id
        })
        .catch((error) => {
          // 只有当仍是最新写入时才回退，避免覆盖更新后的新值
          if (seq === writeSeq) {
            settingValue.value = oldValue
          }
          console.error(`[useSettingValue] persist "${settingKey}" failed:`, error)
        })
        .finally(() => {
          pendingWrites.value = Math.max(0, pendingWrites.value - 1)
        })
    },
  })

  // 初始化时从持久化数据源中读取数据
  onMounted(loadFromStorage)

  // 登录态变化时自动重载对应用户设置
  watch(
    () => userIdRef.value,
    async (userId, prevUserId) => {
      // 从匿名 -> 登录：若新用户尚无该设置，则迁移匿名设置
      if (prevUserId === LOCAL_USER_ID && userId !== LOCAL_USER_ID) {
        try {
          await migrateAnonymousSettingToUserIfNeeded(userId, settingKey, schema)
        } catch (error) {
          console.error(`[useSettingValue] migrate "${settingKey}" failed:`, error)
        }
      }
      await loadFromStorage()
    },
  )

  return {
    /** 加载状态，包括写入和读取 */
    loading: computed(() => initLoading.value || pendingWrites.value > 0),
    /** 双向绑定的值 */
    modelValue,
  }
}
