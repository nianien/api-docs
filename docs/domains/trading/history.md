---
id: trading-history
title: Trading History & Reports
sidebar_label: History
---

Trading History / IB Portal API 提供账户历史交易与报表相关数据。  
典型用途：

- 生成客户对账单
- 计算策略盈亏与回撤
- IB / 代理返佣核算

---

## 1. 请求概览（示意）

```http
POST /v1/listTradingHistory
Authorization: Bearer <token>
Content-Type: application/json
```

请求体示例：

```json
{
  "accountId": "123456",
  "from": "2024-03-01T00:00:00Z",
  "to": "2024-03-31T23:59:59Z",
  "pageNo": 1,
  "pageSize": 100
}
```

---

## 2. 响应示例（简化）

```json
{
  "items": [
    {
      "ticket": "100001",
      "accountId": "123456",
      "symbol": "EURUSD",
      "side": "BUY",
      "volume": 10000,
      "openTime": "2024-03-10T09:30:00Z",
      "closeTime": "2024-03-10T10:05:00Z",
      "openPrice": 1.08600,
      "closePrice": 1.08720,
      "profit": 12.0,
      "commission": -3.0,
      "swap": -0.5
    }
  ],
  "pageNo": 1,
  "pageSize": 100,
  "total": 42
}
```

可以参考 `ib_portal_api.yaml` 中的实际字段，把盈亏、返佣、货币单位等补充清楚。

---

## 3. 查询窗口与性能

- 某些实现会限制单次查询时间窗口（例如最多 3 个月）
- 建议：
  - 小时间窗口 + 分页
  - 为定期对账 / 报表构建离线存储（Data Warehouse）

---

## 4. 与 IB / 返佣的关系

如果该 API 同时用于 IB Portal：

- 会包含 IB 关系、返佣金额等字段
- 建议区分：
  - 纯交易视角（成交细节，策略分析）
  - IB 结算视角（返佣相关字段）

使用时按照不同业务场景过滤字段即可。

---

## 5. API 参考文档

完整的 API 接口文档、请求参数、响应字段和错误码说明，请查看：

👉 **[Trading History API 完整参考](/api/trading/history)**

