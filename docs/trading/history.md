---
id: history
title: Trading History & Reports
---

import Link from '@docusaurus/Link';

Trading History API（亦可作为 IB Portal 数据源）提供账户历史交易记录，用于：

- 生成客户对账单与交易报表  
- 计算策略收益 / 回撤等绩效指标  
- IB / 代理返佣核算（如响应中包含 IB 维度信息）  

对应 OpenAPI 文档：

- [Trading History API](/api/trading/ib_portal_api)

> 建议先阅读 [Trading Overview](/docs/trading/overview) 与  
> [Authentication & Security](/docs/overview/authentication)。

---

## 1. 接口概览

**HTTP 方法**

```http
POST /ib/api/v1/listTradingHistory
```

> 实际路径和版本号以 OpenAPI 文档为准，这里使用示例路径 `/ib/api/v1/...`。

**认证方式**

- Header：`Authorization: Bearer <access_token>`

**典型请求示例**

```bash
curl -X POST "https://api-sandbox.zeromarkets.com/ib/api/v1/listTradingHistory" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "123456",
    "from": "2024-03-01T00:00:00Z",
    "to": "2024-03-31T23:59:59Z",
    "pageNo": 1,
    "pageSize": 100
  }'
```

---

## 2. 请求参数

### 2.1 Body 字段（示例）

| 字段名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| accountId | string | 是 | 账户 ID |
| subAccountId | string | 否 | 子账户 / 策略账户（如支持） |
| from | string | 是 | 开始时间（ISO8601），例如 `2024-03-01T00:00:00Z` |
| to | string | 是 | 结束时间（ISO8601），例如 `2024-03-31T23:59:59Z` |
| pageNo | integer | 否 | 页码，从 1 开始，默认 1 |
| pageSize | integer | 否 | 每页条数，默认 100，建议范围 50–500 |
| symbol | string | 否 | 按品种过滤，如 `EURUSD` |
| side | string | 否 | 方向过滤：`BUY` / `SELL`（如支持） |

> 实际字段以 [API Reference](/api/trading/ib_portal_api) Schema 为准。

---

## 3. 响应结构

### 3.1 顶层结构（分页）

```json
{
  "items": [ /* Trade 对象数组 */ ],
  "pageNo": 1,
  "pageSize": 100,
  "total": 42
}
```

### 3.2 Trade 对象示例

```json
{
  "ticket": "100001",
  "accountId": "123456",
  "subAccountId": "123456-01",
  "symbol": "EURUSD",
  "side": "BUY",
  "volume": 10000,
  "openTime": "2024-03-10T09:30:00Z",
  "closeTime": "2024-03-10T10:05:00Z",
  "openPrice": 1.08600,
  "closePrice": 1.08720,
  "profit": 12.0,
  "commission": -3.0,
  "swap": -0.5,
  "comment": "strategy#alpha",
  "regulator": "ASIC"
}
```

### 3.3 字段说明（可根据真实 schema 调整）

| 字段名 | 类型 | 说明 |
|--------|------|------|
| ticket | string | 成交编号 / 交易唯一标识 |
| accountId | string | 账户 ID |
| subAccountId | string | 子账户 / 策略账户 ID |
| symbol | string | 交易品种，如 `EURUSD`、`XAUUSD` |
| side | string | `BUY` / `SELL` |
| volume | number | 手数 / 数量 |
| openTime | string | 开仓时间（ISO8601） |
| closeTime | string | 平仓时间（ISO8601），市价平仓/止损/止盈等 |
| openPrice | number | 开仓价 |
| closePrice | number | 平仓价 |
| profit | number | 此笔交易的净盈亏（可能已包含手续费/利息，视设计而定） |
| commission | number | 手续费 |
| swap | number | 掉期费 / 隔夜利息 |
| comment | string | 策略标记 / 备注（如有） |
| regulator | string | 监管归属（如 `ASIC` / `FCA`） |

---

## 4. 错误与边界条件

- 时间窗口通常会限制，例如：单次查询不超过 3 个月
- 若 `from > to`，返回参数错误（400）
- 查询结果超过最大条数时需要通过分页逐页拉取

常见 HTTP 状态码：

| 状态码 | 说明 | 常见原因 |
|--------|------|----------|
| 200 | 成功 | |
| 400 | 参数错误 | 时间范围非法，分页参数超限制 |
| 401 | 认证失败 | token 缺失 / 过期 / 无效 |
| 403 | 无权限 | 无权访问对应账户或维度 |
| 429 | 请求过于频繁 | 批量拉取或定时任务触发限流 |
| 500 | 服务器内部错误 | 短期故障，建议稍后重试 |

详细错误码说明请参考 [Error Codes & Conventions](/docs/overview/errors)。

---

## 5. 使用场景与最佳实践

### 5.1 报表与对账单

- 按月或按周拉取交易历史
- 将数据写入内部数据库或报表系统
- 使用 `ticket` 作为主键，保证幂等写入

### 5.2 策略分析与业绩评估

- 基于 `openTime` / `closeTime` 构建收益曲线
- 分策略（`comment`）拆解业绩
- 结合 Positions 快照构建每日 NAV / 风险指标

### 5.3 IB / 代理结算

- 如果响应中包含 IB 维度（如 `ibCode`、`rebateAmount`），可直接按周期聚合生成返佣报表
- 建议将 Zero Markets 明细作为"原始事实表"，在内部按自身逻辑合成报表

---

## 6. 性能与存储建议

- 对历史交易数据，应尽量进行本地持久化和增量更新，而不是每次从头查询
- 对大体量账户建议：
  - 首次拉取"全量历史"（按时间窗口分批）
  - 后续按时间增量拉取（例如每天定时拉前一日数据）
  - 对同一时段重复查询，可使用缓存层（如 Redis / 内部 API 网关缓存）减轻压力
