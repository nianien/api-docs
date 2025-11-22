---
id: webhooks
title: Webhooks (Planned)
---

当前 Zero Markets API 主要通过：

- REST 接口提供查询能力
- WebSocket 提供实时行情推送

Webhook 能力处于规划阶段，本章节用于预留设计与后续扩展说明。

---

## 1. 设计目标（规划中）

预计未来 Webhook 将支持以下事件类型：

- 订单 / 成交事件  
- 持仓 / 风险变化事件  
- 风控事件（如强平、追加保证金提醒等）

---

## 2. 事件数据结构示例（草案）

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

## 3. 安全与幂等原则（规划中）

- 使用签名头（如 X-ZM-SIGNATURE）校验消息来源
- 每个事件拥有全局唯一 eventId，客户端需自行保证幂等消费
- Webhook 接口返回非 2xx 时会按退避策略重试

---

Webhook 的正式上线范围与时间请关注 [Changelog](/docs/changelog) 或官方公告。
