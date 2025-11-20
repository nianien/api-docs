---
id: market-data-price-history
title: Historical Price & Candles
sidebar_label: Price History
---

Price History API 提供历史价格 / K 线数据。  
典型用途：

- 回测与策略优化
- 绘制行情图表
- 统计特征计算（波动率、均线等）

---

## 1. 请求概览（示意）

```http
GET /gaia/api/v1/price-history
Authorization: Bearer <token>
Content-Type: application/json
```

常见查询参数：

- `symbol`: 品种，如 EURUSD
- `period`: 周期，如 M1, M5, H1, D1
- `from`, `to`: 时间范围（可选）
- 或 `countBack`: 从最新向前回溯 N 根

---

## 2. 响应示例（简化）

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

字段名称与周期表示请严格以 `price_history.yaml` 定义为准。

---

## 3. 查询限制与错误

- 单次请求最大 `countBack` / 最大时间跨度有限制，超出可能返回错误（例如 400 / 41900）
- 建议按时间窗口切片请求，而不是一次性拉取多年数据
- 如果需要批量导出大量历史数据，建议联系技术支持获取离线数据方案

---

## 4. 使用建议

- 回测环境中，可将历史数据落地到本地或数据库，避免重复拉取
- 实时系统中，可通过 WebSocket 获取实时 tick，再用 Price History 做「冷启动」或补历史

---

## 5. API 参考文档

完整的 API 接口文档、请求参数、响应字段和周期说明，请查看：

👉 **[Price History API 完整参考](/api/market-data/price-history)**

