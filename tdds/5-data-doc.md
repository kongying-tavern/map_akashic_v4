# 数据压缩方案

`TDD-5`

---

## 数据压缩 {#data-compress}

为了节约后端性能，降低网络传输压力，部分数据存在使用 `bzip` 压缩算法压缩的 JSON 数据接口，此类接口返回的数据包，被称为压缩数据，此类接口被称为压缩数据接口。

## 压缩数据接口 {#doc-api}

压缩数据一般包含两类接口：

1. MD5 接口
2. 压缩数据包接口

同时，压缩数据存在两种格式：

1. 单一压缩数据
2. 分片压缩数据

## MD5 数据模型 {#md5-model}

``` typescript
interface BinaryMD5Vo {
  md5: string;  // MD5值
  time: number; // 生成时间戳
}
```

- `MD5值`：数据的 MD5 值，可用于获取对应分片。
- `生成时间戳`：单位为毫秒的时间戳，用于判定数据是否重新生成过。

### 单一压缩数据 {#unique-doc}

单一压缩数据不分片，一般为整体数据量不大，且没有分片需求的业务实体列表。

单一压缩数据的 MD5 接口，具有以下特征：

- 返回的数据类型为 `BinaryMD5Vo`。

单一压缩数据的数据接口，具有以下特征：

- 无需使用 MD5 值即可获取全部数据。
- 返回的数据，解压之后为 **完整的** `T[]` 列表。

以下功能，存在单一压缩数据：

- [`TDD-7` 图标数据][tdd-7]
- [`TDD-4` 点位关联][tdd-4]

[tdd-4]: ./4-marker-linkage.md
[tdd-7]: ./7-icon-data.md

### 分片压缩数据 {#chunked-doc}

分片压缩数据会将完整的数据分为多个分片，通常会因为以下原因分片：

- 完整的数据，数据量过大。
- 业务实体存在 [可见性权限][tdd-2-hidden_flag]。

[tdd-2-hidden_flag]: ./2-data-models.md#hidden-flag

分片压缩数据的 MD5 接口，具有以下特征：

- 返回的数据类型为 `BinaryMD5Vo[]`。

分片压缩数据的数据接口，具有以下特征：

- 需要使用 MD5 值获取数据。
- 返回的数据，解压之后为 **部分** `T[]` 列表。

以下功能，存在分片压缩数据：

- [`TDD-2` 物品][tdd-2-item_model]
- [`TDD-2` 点位][tdd-2-marker_model]

[tdd-2-item_model]: ./2-data-models.md#item-model
[tdd-2-marker_model]: ./2-data-models.md#marker-model
