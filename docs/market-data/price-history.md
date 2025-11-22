---
id: price-history
title: Historical Price & Candles
---

import Link from '@docusaurus/Link';

Price History API 提供历史价格与 K 线数据，用于：

- 策略回测与优化  
- K 线与指标图表绘制  
- 统计特征计算（波动率、均线等）  

对应 OpenAPI 文档：

- [Price History API](/api/market-data/price_history)

---

## 1. 接口概览

**HTTP 方法**

```http
GET /gaia/api/v1/price-history
```

**认证方式**

- Header：`Authorization: Bearer <access_token>`

**典型请求示例**

```bash
curl -X GET "https://api-sandbox.zeromarkets.com/gaia/api/v1/price-history" \
  -H "Authorization: Bearer <access_token>" \
  -G \
  --data-urlencode "symbol=EURUSD" \
  --data-urlencode "period=M1" \
  --data-urlencode "countBack=100"
```

---

## 2. 请求参数

| 名称 | 类型 | 必填 | 说明 |
|------|------|------|------|
| symbol | string | 是 | 品种，例如 `EURUSD` |
| period | string | 是 | K 线周期，例如 `M1`, `M5`, `H1`, `D1` |
| from | string | 否 | 开始时间（ISO8601），与 `to` 搭配使用 |
| to | string | 否 | 结束时间（ISO8601） |
| countBack | integer | 否 | 从最新向前回溯 N 根，如传入则通常优先于 `from`/`to` |

> 具体优先级与时间限制以 API Reference 为准。

---

## 3. 响应结构

### 3.1 顶层结构（示例）

```json
{
  "symbol": "EURUSD",
  "period": "M1",
  "candles": [
    {
      "timestamp": 1712034540000,
      "open": 1.08600,
      "high": 1.08620,
      "low": 1.08590,
      "close": 1.08610,
      "volume": 12345
    }
  ]
}
```

### 3.2 字段说明

| 字段名 | 类型 | 说明 |
|--------|------|------|
| symbol | string | 品种名称 |
| period | string | 周期枚举，如 `M1` / `M5` / `H1` / `D1` |
| timestamp | number | 蜡烛开始时间（Unix ms 或 ISO 字符串） |
| open | number | 开盘价 |
| high | number | 最高价 |
| low | number | 最低价 |
| close | number | 收盘价 |
| volume | number | 成交量（单位视产品而定） |

---

## 4. 限制与错误

常见限制场景：

- 单次最大 `countBack`，例如 1000 或 5000
- 时间范围太大（跨年）可能返回错误或截断
- 某些品种或周期的历史数据长度有限

常见 HTTP 状态码：

| 状态码 | 说明 | 常见原因 |
|--------|------|----------|
| 200 | 成功 | |
| 400 | 参数错误 | 周期不支持、时间范围非法、缺少 symbol 等 |
| 401 | 未认证 | token 缺失 / 过期 / 无效 |
| 403 | 无权限 | 账户未授权访问该品种 / 市场 |
| 429 | 请求过于频繁 | 批量回测拉取过于集中 |
| 500 | 服务器内部错误 | 短期故障，建议稍后重试 |

详细错误码说明请参考 [Error Codes & Conventions](/docs/overview/errors)。

---

## 5. 使用建议

### 5.1 策略回测

- 建议按时间分片拉取数据，例如：
  - 按月或按季度批量拉取
  - 将数据落地为本地文件或数据库
- 建议本地持久化数据，避免回测期间反复请求 API

### 5.2 实时系统冷启动

- 系统启动时：
  - 拉取最近 N 根（例如 `countBack=500`）K 线作为"初始缓存"
  - 再基于 WebSocket 实时补数据

### 5.3 图表与监控

- 前端组件按需分页加载历史数据，避免一次性加载过大
- 可以采用"向左延伸加载"的方式，为用户提供更长历史

---

## 6. 与 WebSocket 的组合使用

典型模式：

1. 通过 Price History 拉一段最近历史 K 线
2. 启动 WebSocket，订阅 tick 或 bar 推送
3. 将 WebSocket 数据增量更新到图表 / 策略状态
4. 定期落盘 / 对账，保证状态一致性

详见：[Realtime Market Data WebSocket](/docs/market-data/websocket)。
