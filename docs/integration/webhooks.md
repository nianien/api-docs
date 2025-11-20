---
id: webhooks
title: Webhooks (Planned)
---

当前 Zero Markets API 主要通过：

- REST 接口提供查询能力
- WebSocket 提供行情推送

Webhook 能力处于规划阶段，本章节用于预留设计与后续扩展说明。

---

## 1. 设计目标（规划）

未来 Webhook 预计支持下列事件：

- 订单 / 成交事件（根据 Trading History 模型推送）
- 持仓 / 风险变化事件
- 风控事件（强平、追加保证金提醒等）

---

## 2. 典型 Webhook 事件结构（示意）

```json
{
  "eventType": "ORDER_FILLED",
  "eventId": "8dd6c1ad-0b7b-4a8d-9e6b-1234567890ab",
  "occurredAt": "2024-03-01T09:30:01Z",
  "accountId": "123456",
  "order": {
    "ticket": "100001",
    "symbol": "EURUSD",
    "side": "BUY",
    "volume": 10000,
    "openPrice": 1.08600,
    "closePrice": 1.08720,
    "profit": 12.0
  }
}
```

---

## 3. 安全与幂等性

当 Webhook 正式开放时，将遵循以下原则：

- 使用签名头（例如 `X-ZM-SIGNATURE`）校验消息来源
- 每个事件拥有唯一 `eventId`，client 需自己做幂等控制
- 支持重试机制（失败时按退避策略重发）

---

实际上线时间与支持范围请关注 [Changelog](/docs/changelog) 或相关公告。

