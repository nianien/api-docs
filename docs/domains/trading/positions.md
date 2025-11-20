---
id: trading-positions
title: Positions & Account Risk
sidebar_label: Positions
---

Positions API 提供账户当前头寸与风险视图。  
典型用途：

- 构建内部风控看板
- 给策略引擎提供「当前仓位」输入
- 统计多账户风险敞口

---

## 1. 请求概览

> 具体路径与参数以实际 OpenAPI 为准，这里只给出典型结构示意。

```http
GET /blackarrow/api/v1/positions
Authorization: Bearer <token>
Content-Type: application/json
```

常见查询参数：

- `accountId` / `subAccountId`
- 分页参数：`pageNo`, `pageSize`

---

## 2. 响应结构示例

```json
{
  "items": [
    {
      "accountId": "123456",
      "subAccountId": "123456-01",
      "symbol": "EURUSD",
      "side": "LONG",
      "volume": 30000,
      "avgPrice": 1.08600,
      "currentPrice": 1.08750,
      "unrealizedPnl": 45.3,
      "realizedPnl": 12.0,
      "swap": -1.2,
      "commission": -3.0,
      "marginUsed": 300.0,
      "regulator": "ASIC"
    }
  ],
  "pageNo": 1,
  "pageSize": 50,
  "total": 1
}
```

关键字段解释可以按你实际 schema 展开（略）。

---

## 3. 分页与过滤

- 页码参数：`pageNo`, `pageSize`
- 建议合理控制 `pageSize`，避免一次性拉取过大数据集
- 如需按品种、方向等过滤，可使用：
  - `symbol`
  - `side`（LONG / SHORT）

---

## 4. 使用建议

- 若用于风控看板，推荐定期轮询（例如每 5 秒）或使用后续的推送机制（未来 Webhook/WS）
- 若用于策略引擎，只在需要重新计算风险时拉取持仓即可，避免频繁拉取增加延迟与负载

> 上面内容你可以根据 `ba_position.yaml` 的真实字段，把字段说明表补上。

---

## 5. API 参考文档

完整的 API 接口文档、请求参数、响应字段和错误码说明，请查看：

👉 **[Positions API 完整参考](/api/trading/positions)**

