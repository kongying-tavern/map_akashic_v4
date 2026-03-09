# 图标数据

`TDD-7`

---

图标数据，在地区、物品、点位等功能中广泛使用，用于在多种场景下显示图片。

## 图标模型 {#icon-model}

此章节中，非重要字段将被省略。

``` typescript
interface IconVo {
  id: number;               // 图标ID

  // 基础信息
  tag: string;              // 图标标签

  // 图标地址
  url: string;              // 基础图标地址
  urlVariants: Record<string, string>;
                            // 变体图标地址
}
```

- `图标ID`：与具体使用的功能中的图标ID一致。
- `图标标签`：简短的，可理解的文本标记。
- `基础图标地址`：基础的图标图片地址，可用于常规的图标渲染。
- `变体图标地址`：在一些特殊情况下，需要忽略基础图标而使用变体图标。此字段为键值对，详见 [图标变体][tdd-7-icon_variants]。

[tdd-7-icon_variants]: #icon-variants

## 图标变体 {#icon-variants}

- 图标变体用于在一些特殊情况下显示与基础图标不同的图标，同时支持在不同状态、不同场景下显示不同的图标。
- 图标变体字段为键值对，键名为图标使用场景的标识，键值为图标图片地址。
- 在不同场景下，图标变体的键名和使用方法都不同。

### 变体：地区 {#icon-vars-area}

> 此功能仍在开发中。

### 变体：物品分类 {#icon-vars-item-type}

> 此功能仍在开发中。

### 变体：物品 {#icon-vars-item}

- 可用键名：
  - `active`：物品中点位被标记后，显示的图标。
  - `inactive`：物品中点位未被标记时，显示的图标。
- 在 [`TDD-2` 数据模型 - 物品模型][tdd-2-item_model] 中，仅【特殊图标】渲染可以使用物品变体。
- 渲染物品变体图标时，规则如下：
  - 当物品中点位被标记时，显示 `active` 图标。若 `active` 不存在，则按照 `inactive`、基础图标的顺序，显示第一个可渲染的图标。
  - 当物品中点位未被标记时，显示 `inactive` 图标。若 `inactive` 不存在，则显示基础图标。

[tdd-2-item_model]: ./2-data-models.md#item-model
