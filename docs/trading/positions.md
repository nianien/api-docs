---
id: positions
title: Positions & Account Risk
---

import Link from '@docusaurus/Link';

Positions API 提供账户当前头寸与风险视图。

典型用途：

- 构建实时风险看板
- 为策略引擎提供「当前持仓」输入
- 统计多账户风险敞口

对应 OpenAPI 文档：

- [Positions API](/api/trading/ba_position)

---

## 1. 请求示例

> 实际路径与参数请以 OpenAPI 为准，这里给出典型调用结构。

```http
GET /blackarrow/api/v1/positions
Authorization: Bearer <access_token>
Content-Type: application/json
```

常见查询参数：

- `accountId` / `subAccountId`：账户或子账户
- 分页参数：`pageNo`, `pageSize`

---

## 2. 响应示例（简化）

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

具体字段含义请参考 API Reference 中的 Position 模型。

---

## 3. 分页与过滤建议

- 控制 `pageSize` 在合理范围（如 50/100）
- 多账户场景下建议按账户维度分页查询
- 如果后续引入 Webhook / 推送，可使用 Positions 作为「状态兜底」，Webhook 作为增量更新

---

## 4. 使用建议

- **风控看板**：周期性拉取全部持仓（如每 5–10 秒）
- **策略引擎**：在启动 / 策略切换时获取一次当前持仓状态
- **报表系统**：可以将某个时间点的 Positions 快照写入 Data Warehouse，用于事后分析
