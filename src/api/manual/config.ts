import { createAlova } from 'alova'
import fetchAdapter from 'alova/fetch'
import VueHook from 'alova/vue'

export const configInstance = createAlova({
  baseURL: import.meta.env.VITE_APP_CONFIG_URL,
  requestAdapter: fetchAdapter(),
  statesHook: VueHook,
  responded: (res) => {
    return res.json()
  },
})

interface ConfigAvatar {
  label?: string
  url?: string
}

interface ConfigNameCard {
  /**
   * 名片名称
   * @example '原神·印象'
   */
  label?: string
  /**
   * 名片图标
   * @example 'https://tiles.yuanshen.site/d/res/nmcard/UI_NameCardIcon_0.png'
   */
  icon?: string
  /**
   * 好友列表的长条背景
   * @example 'https://tiles.yuanshen.site/d/res/nmcard/UI_NameCardPic_0_Alpha.png'
   */
  strip?: string
  /**
   * 名片背景图
   * @example 'https://tiles.yuanshen.site/d/res/nmcard/UI_NameCardPic_0_P.png'
   */
  bg?: string
  /**
   * 名片描述
   * @example '「欢迎来到提瓦特。」'
   */
  desc?: string
}

interface ConfigFontResources {
  /**
   * 字体资源地址
   * @example 'https://tiles.yuanshen.site/d/res/font/HYWenHei-55S.woff2'
   */
  url?: string
  /**
   * 字体资源类型
   * @example 'woff2'
   */
  type?: string
}

interface ConfigDict<T> {
  label?: string
  value?: T
}

interface ConfigTileLayer {
  center?: [x: number, y: number]
  code?: string
  extend?: string
  extension?: string
  name?: string
  settings?: {
    center?: [x: number, y: number]
    zoom?: number
  }
  size?: [width: number, height: number]
  tilesOffset?: [x: number, y: number]
}

interface ConfigExtra {
  /**
   * 1.6 海岛版本
   * @note 早期设计，不再更改
   */
  '1_6_island'?: {
    stages?: ConfigDict<string>[]
  }
  /**
   * 2.8 海岛版本
   * @note 早期设计，不再更改
   */
  '2_8_island'?: {
    stages: (ConfigDict<string> & { children?: ConfigDict<string>[] })[]
  }
  /**
   * 附加层级，不只限于地下
   * @note 由于早期设计失误，这里暂时不更改字段名称
   */
  'underground'?: {
    useDetail?: boolean
    /**
     * 可用的附加层级
     */
    levels?: (ConfigDict<string> & { children?: ConfigDict<string>[] })[]
  }
}

type ConfigBounds = [
  [xMin: number, yMin: number],
  [xMax: number, yMax: number],
]

interface ConfigPlugin {
  /**
   * 启用的额外配置 key 列表
   * @example ['1_6_island']
   */
  extra?: (keyof ConfigExtra)[]
  /**
   * 额外配置表
   *
   * key 与 `extra` 中的 key 对应
   */
  extraConfig?: ConfigExtra
  /**
   * 是否启用叠加图层
   */
  overlay?: boolean
  /**
   * 叠加图层配置
   */
  overlayConfig: {
    /**
     * 面板图标，支持 mdi 图标和 FontAwesome 图标
     * @example 'mdi-island'
     * @deprecated 仅在旧版地图中使用
     */
    panelIcon?: string
    /**
     * 面板图标颜色
     * @example '#2196f3'
     * @deprecated 仅在旧版地图中使用
     */
    panelIconColor?: string
    /**
     * 叠加图层 URL 模板
     * @example 'https://assets.yuanshen.site/tiles_qd16/overlay/{{itemValue}}.jpg'
     */
    urlTemplate?: string
    /**
     * 叠加图层列表
     */
    overlays: {
      /**
       * 叠加图层名称
       * @example '金苹果群岛'
       */
      label?: string
      /**
       * 叠加图层值
       * @example '*GOLDEN_APPLE_ISLAND_1_6'
       */
      value?: string
      /**
       * 是否支持多选
       */
      multiple?: boolean
      /**
       * 叠加图层类型
       */
      role?: 'tile' | 'overlay'
      /**
       * 叠加图层范围
       */
      bounds?: ConfigBounds
      /**
       * 子项列表
       */
      children?: (ConfigDict<string> & {
        chunks?: (ConfigDict<string> & {
          bounds?: ConfigBounds
        })[]
      })[]
    }[]
  }
}

export interface DadianConfig {
  /**
   * 应用配置
   */
  application?: {
    /**
     * 可用头像列表
     */
    avatar?: ConfigAvatar[]
    /**
     * 可用名片列表
     */
    nameCard?: ConfigNameCard[]
  }
  /**
   * 编辑器配置
   */
  editor?: {
    /**
     * key 样例 `HYWenHei-55S`
     */
    fontResources: Record<string, ConfigFontResources>
    /**
     * 快速输入片段
     */
    quickInputSnippets?: string[]
    /**
     * 刷新时间字典列表
     */
    refreshTimeSpecial?: ConfigDict<number>[]
  }
  /**
   * 公测图层配置
   * key 样例 `A:APPLE:1_6`
   */
  tiles?: Record<string, ConfigTileLayer>
  /**
   * 内测图层配置
   * key 样例 `提瓦特-base0`
   */
  tilesNeigui?: Record<string, ConfigTileLayer>
  /**
   * 公测插件配置
   */
  plugins?: Record<string, ConfigPlugin>
  /**
   * 内测插件配置
   */
  pluginsNeigui?: Record<string, ConfigPlugin>
}

export const getDadianJson = () => configInstance.Get<DadianConfig | null>('/dadian.json')
