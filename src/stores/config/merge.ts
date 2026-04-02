import type { ConfigTileLayer, MapConfig } from '@/api'
import type { ResolvedTileset } from '@/feature/genshin-map/types'

// 辅助函数：判断是否为「纯对象」（排除数组、null、特殊对象）
const isPlainObject = (obj: unknown): obj is Record<string, unknown> => {
  if (obj === null || typeof obj !== 'object') {
    return false
  }
  // 确保原型链是 Object.prototype（排除 Array/Date/RegExp 等）
  const proto = Object.getPrototypeOf(obj)
  return proto === Object.prototype || proto === null
}

/**
 * 深度合并两个值，规则：
 * 1. 仅当 a 和 b 都是纯对象（{}）时，深度合并 b 到 a（直接修改 a）
 * 2. 数组/基本类型/null 等非纯对象，直接用 b 覆盖 a
 * @param a 被合并的目标值（会被直接修改）
 * @param b 合并的源值
 * @returns 合并后的 a
 */
const deepMerge = (a: unknown, b: unknown): unknown => {
  // 情况1：不是两个纯对象 → 直接用 b 覆盖 a
  if (!isPlainObject(a) || !isPlainObject(b)) {
    return b
  }

  // 遍历 b 的所有自有属性（避免遍历原型链属性）
  for (const key of Object.keys(b)) {
    if (Object.hasOwn(b, key)) {
      // 递归合并子属性，直接修改 a 的对应属性
      a[key] = deepMerge(a[key], b[key])
    }
  }

  return a
}

const mergeConfigs = (configsList: ConfigTileLayer[]) => {
  console.log('configsList', configsList)
  const tree: Record<string, ConfigTileLayer> = {}
  const { length } = configsList
  for (let i = 0; i < length; i++) {
    const current = configsList[i]
    for (const [key, value] of Object.entries(current)) {
      if (!tree[key]) {
        tree[key] = value
        continue
      }
      deepMerge(tree[key], value)
    }
  }
  return tree
}

const decodeExtend = (config: Record<string, ConfigTileLayer>) => {
  const result: ResolvedTileset[] = []
  for (const [areaCode, node] of Object.entries(config)) {
    if (node.extend) {
      deepMerge(node, config[node.extend])
    }
    result.push({
      id: areaCode,
      pathId: node.code ?? '',
      extension: node.extension ?? 'png',
      center: node.center ?? [0, 0],
      size: node.size ?? [1024, 1024],
      tilesOffset: node.tilesOffset ?? [0, 0],
      settings: node.settings,
    })
  }
  return result
}

const TILE_ID_REG = /^[AC]:[A-Z]+/

/**
 * 主函数：基于索引树处理 tiles/tilesNeigui 继承
 */
export const parseTilesConfigs = (dadianConfig: MapConfig) => {
  console.log('dadianConfig', dadianConfig)
  const tree = mergeConfigs([dadianConfig.tiles ?? {}, dadianConfig.tilesNeigui ?? {}])
  return decodeExtend(tree).filter((config) => {
    const { id } = config
    return TILE_ID_REG.test(id)
  })
}
