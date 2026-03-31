import { z } from 'zod'

// ======================== 核心 Zod Schema 定义 ========================

/**
 * 头像配置 Schema
 */
const ConfigAvatarSchema = z
  .object({
    label: z.string().optional(),
    url: z.string().optional(),
  })
  .describe('头像配置')

/**
 * 名片配置 Schema
 */
const ConfigNameCardSchema = z
  .object({
    label: z.string().optional().describe('名片名称'),
    icon: z.string().optional().describe('名片图标'),
    strip: z.string().optional().describe('好友列表的长条背景'),
    bg: z.string().optional().describe('名片背景图'),
    desc: z.string().optional().describe('名片描述'),
  })
  .describe('名片配置')

/**
 * 字体资源配置 Schema
 */
const ConfigFontResourcesSchema = z
  .object({
    url: z.string().optional().describe('字体资源地址'),
    type: z.string().optional().describe('字体资源类型'),
  })
  .describe('字体资源配置')

/**
 * 泛型字典配置 Schema（对应 ConfigDict<T>）
 * @param valueSchema 值的 Zod Schema
 */
const ConfigDictSchema = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z
    .object({
      label: z.string().optional(),
      value: valueSchema.optional(),
    })
    .describe('字典配置项')

/**
 * 带子项的字典配置 Schema（用于 2_8_island/underground 等）
 */
const ConfigDictWithChildrenSchema = <T extends z.ZodTypeAny>(valueSchema: T) =>
  ConfigDictSchema(valueSchema)
    .extend({
      children: z.array(ConfigDictSchema(valueSchema)).optional(),
    })
    .describe('带子项的字典配置项')

/**
 * 图层配置 Schema
 */
const ConfigTileLayerSchema = z
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
  .describe('图层配置')

/**
 * 坐标范围 Schema（对应 ConfigBounds）
 * 格式：[[xMin, yMin], [xMax, yMax]]
 */
const ConfigBoundsSchema = z
  .tuple([
    z.tuple([z.number(), z.number()]), // 最小坐标
    z.tuple([z.number(), z.number()]), // 最大坐标
  ])
  .describe('坐标范围')

/**
 * 1.6 海岛版本配置 Schema
 */
const ConfigExtra16IslandSchema = z
  .object({
    stages: z.array(ConfigDictSchema(z.string())).optional(),
  })
  .describe('1.6 海岛版本配置（早期设计，不再更改）')

/**
 * 2.8 海岛版本配置 Schema
 */
const ConfigExtra28IslandSchema = z
  .object({
    stages: z.array(ConfigDictWithChildrenSchema(z.string())),
  })
  .describe('2.8 海岛版本配置（早期设计，不再更改）')

/**
 * 附加层级配置 Schema
 */
const ConfigExtraUndergroundSchema = z
  .object({
    useDetail: z.boolean().optional(),
    levels: z.array(ConfigDictWithChildrenSchema(z.string())).optional().describe('可用的附加层级'),
  })
  .describe('附加层级配置（由于早期设计失误，暂时不更改字段名称）')

/**
 * 额外配置 Schema（对应 ConfigExtra）
 */
const ConfigExtraSchema = z
  .object({
    '1_6_island': ConfigExtra16IslandSchema.optional(),
    '2_8_island': ConfigExtra28IslandSchema.optional(),
    underground: ConfigExtraUndergroundSchema.optional(),
  })
  .describe('额外配置')

/**
 * 叠加图层子项 Schema
 */
const ConfigPluginOverlayItemSchema = z
  .object({
    label: z.string().optional().describe('叠加图层名称'),
    value: z.string().optional().describe('叠加图层值'),
    multiple: z.boolean().optional().describe('是否支持多选'),
    role: z
      .union([z.literal('tile'), z.literal('overlay')])
      .optional()
      .describe('叠加图层类型'),
    bounds: ConfigBoundsSchema.optional().describe('叠加图层范围'),
    children: z
      .array(
        ConfigDictSchema(z.string()).extend({
          chunks: z
            .array(
              ConfigDictSchema(z.string()).extend({
                bounds: ConfigBoundsSchema.optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional()
      .describe('子项列表'),
  })
  .describe('叠加图层子项配置')

/**
 * 叠加图层配置 Schema
 */
const ConfigPluginOverlayConfigSchema = z
  .object({
    panelIcon: z.string().optional().describe('面板图标，支持 mdi 图标和 FontAwesome 图标'),
    panelIconColor: z.string().optional().describe('面板图标颜色'),
    urlTemplate: z.string().optional().describe('叠加图层 URL 模板'),
    overlays: z.array(ConfigPluginOverlayItemSchema).describe('叠加图层列表'),
  })
  .describe('叠加图层配置')

/**
 * 插件配置 Schema（对应 ConfigPlugin）
 */
const ConfigPluginSchema = z
  .object({
    extra: z.array(z.keyof(ConfigExtraSchema)).optional().describe('启用的额外配置 key 列表'),
    extraConfig: ConfigExtraSchema.optional().describe(
      '额外配置表（key 与 `extra` 中的 key 对应）',
    ),
    overlay: z.boolean().optional().describe('是否启用叠加图层'),
    overlayConfig: ConfigPluginOverlayConfigSchema.optional().describe('叠加图层配置'),
  })
  .describe('插件配置')

/**
 * 主配置 Schema（对应 DadianConfig）
 */
export const DadianConfigSchema = z
  .object({
    application: z
      .object({
        avatar: z.array(ConfigAvatarSchema).optional().describe('可用头像列表'),
        nameCard: z.array(ConfigNameCardSchema).optional().describe('可用名片列表'),
      })
      .optional()
      .describe('应用配置'),
    editor: z
      .object({
        fontResources: z
          .record(z.string(), ConfigFontResourcesSchema)
          .describe('字体资源（key 样例 `HYWenHei-55S`）'),
        quickInputSnippets: z.array(z.string()).optional().describe('快速输入片段'),
        refreshTimeSpecial: z
          .array(ConfigDictSchema(z.number()))
          .optional()
          .describe('刷新时间字典列表'),
      })
      .optional()
      .describe('编辑器配置'),
    tiles: z
      .record(z.string(), ConfigTileLayerSchema)
      .optional()
      .describe('公测图层配置（key 样例 `A:APPLE:1_6`）'),
    tilesNeigui: z
      .record(z.string(), ConfigTileLayerSchema)
      .optional()
      .describe('内测图层配置（key 样例 `提瓦特-base0`）'),
    plugins: z.record(z.string(), ConfigPluginSchema).optional().describe('公测插件配置'),
    pluginsNeigui: z.record(z.string(), ConfigPluginSchema).optional().describe('内测插件配置'),
  })
  .describe('配置主结构')
