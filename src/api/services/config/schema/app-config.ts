import { z } from 'zod'

// ======================== 工具 Schema 函数定义 ========================

const createConfigDictSchema = <T extends z.ZodTypeAny>(valueSchema: T) => {
  return z
    .object({
      label: z.string().optional(),
      value: valueSchema.optional(),
    })
    .meta({ description: '字典配置项' })
}

const createConfigDictWithChildrenSchema = <T extends z.ZodTypeAny>(valueSchema: T) => {
  return createConfigDictSchema(valueSchema)
    .extend({
      children: z.array(createConfigDictSchema(valueSchema)).optional(),
    })
    .meta({ description: '带子项的字典配置项' })
}

// ======================== 核心 Zod Schema 定义 ========================
/** 地区底图配置 */
const configTilesetSchema = z
  .object({
    center: z.tuple([z.number(), z.number()]).optional(),
    code: z.string().optional(),
    extend: z.string().optional(),
    extension: z.string().optional(),
    name: z.string().optional(),
    settings: z
      .object({
        center: z.tuple([z.number(), z.number()]).optional(),
        zoom: z.number().optional(),
      })
      .optional(),
    size: z.tuple([z.number(), z.number()]).optional(),
    tilesOffset: z.tuple([z.number(), z.number()]).optional(),
  })
  .meta({ description: '图层配置' })
/** tiles 集合 */
export type ConfigTileset = z.infer<typeof configTilesetSchema>

/**
 * 坐标范围
 * 格式：[[xMin, yMin], [xMax, yMax]]
 */
const configBoundsSchema = z
  .tuple([
    z.tuple([z.number(), z.number()]), // 最小坐标
    z.tuple([z.number(), z.number()]), // 最大坐标
  ])
  .meta({ description: '坐标范围' })
/** 坐标范围 */
export type ConfigBounds = z.infer<typeof configBoundsSchema>

/** 1.6 海岛版本配置 */
const configExtra16IslandSchema = z
  .object({
    stages: z.array(createConfigDictSchema(z.string())).optional(),
  })
  .meta({ description: '1.6 海岛版本配置（早期设计，不再更改）' })
/** 1.6 海岛版本配置 */
export type ConfigExtra16Island = z.infer<typeof configExtra16IslandSchema>

/** 2.8 海岛版本配置 */
const configExtra28IslandSchema = z
  .object({
    stages: z.array(createConfigDictWithChildrenSchema(z.string())),
  })
  .meta({ description: '2.8 海岛版本配置（早期设计，不再更改）' })
/** 2.8 海岛版本配置 */
export type ConfigExtra28Island = z.infer<typeof configExtra28IslandSchema>

/** 附加层级配置 */
const configExtraUndergroundSchema = z
  .object({
    useDetail: z.boolean().optional(),
    levels: z
      .array(createConfigDictWithChildrenSchema(z.string()))
      .optional()
      .meta({ description: '可用的附加层级' }),
  })
  .meta({ description: '附加层级配置（由于早期设计失误，暂时不更改字段名称）' })
/** 附加层级配置 */
export type ConfigExtraUnderground = z.infer<typeof configExtraUndergroundSchema>

/** 附加配置 */
const configExtraSchema = z
  .object({
    '1_6_island': configExtra16IslandSchema.optional(),
    '2_8_island': configExtra28IslandSchema.optional(),
    underground: configExtraUndergroundSchema.optional(),
  })
  .meta({ description: '附加配置' })
/** 附加配置 */
export type ConfigExtra = z.infer<typeof configExtraSchema>

/** 叠加图层子项配置 */
const configPluginOverlayItemSchema = z
  .object({
    label: z.string().optional().meta({ description: '叠加图层名称' }),
    value: z.string().optional().meta({ description: '叠加图层值' }),
    multiple: z.boolean().optional().meta({ description: '是否支持多选' }),
    role: z
      .union([z.literal('tile'), z.literal('overlay')])
      .optional()
      .meta({ description: '叠加图层类型' }),
    bounds: configBoundsSchema.optional().meta({ description: '叠加图层范围' }),
    children: z
      .array(
        createConfigDictSchema(z.string()).extend({
          chunks: z
            .array(
              createConfigDictSchema(z.string()).extend({
                bounds: configBoundsSchema.optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional()
      .meta({ description: '子项列表' }),
  })
  .meta({ description: '叠加图层子项配置' })
/** 叠加图层子项配置 */
export type ConfigPluginOverlayItem = z.infer<typeof configPluginOverlayItemSchema>

/** 叠加图层配置 */
const configPluginOverlayConfigSchema = z
  .object({
    panelIcon: z
      .string()
      .optional()
      .meta({ description: '面板图标，支持 mdi 图标和 FontAwesome 图标' }),
    panelIconColor: z.string().optional().meta({ description: '面板图标颜色' }),
    urlTemplate: z.string().optional().meta({ description: '叠加图层 URL 模板' }),
    overlays: z.array(configPluginOverlayItemSchema).meta({ description: '叠加图层列表' }),
  })
  .meta({ description: '叠加图层配置' })
/** 叠加图层配置 */
export type ConfigPluginOverlayConfig = z.infer<typeof configPluginOverlayConfigSchema>

/** 地区插件配置 */
const configPluginSchema = z
  .object({
    extra: z
      .array(z.keyof(configExtraSchema))
      .optional()
      .meta({ description: '启用的额外配置 key 列表' }),
    extraConfig: configExtraSchema.optional().meta({ description: '额外配置表' }),
    overlay: z.boolean().optional().meta({ description: '是否启用叠加图层' }),
    overlayConfig: configPluginOverlayConfigSchema.optional().meta({ description: '叠加图层配置' }),
  })
  .meta({ description: '插件配置' })
/** 插件配置 */
export type ConfigPlugin = z.infer<typeof configPluginSchema>

/** 网页应用配置 */
export const configWebSchema = z
  .object({
    blockArea: z.array(z.string()).optional().meta({ description: '禁止显示的地区代码' }),
  })
  .meta({ description: '专用于网页应用的配置' })

/** 应用主配置 */
export const appConfigSchema = z
  .object({
    tiles: z
      .record(z.string(), configTilesetSchema)
      .optional()
      .meta({ description: '公测图层配置' }),
    plugins: z
      .record(z.string(), configPluginSchema)
      .optional()
      .meta({ description: '公测插件配置' }),
    webMap: configWebSchema.optional(),
  })
  .meta({ description: '应用主配置' })
/** 应用主配置 */
export type AppConfig = z.infer<typeof appConfigSchema>
