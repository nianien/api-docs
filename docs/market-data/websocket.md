---
id: websocket
title: Realtime Market Data WebSocket
---

import Link from '@docusaurus/Link';

Realtime Market Data WebSocket 提供实时行情推送能力，适用于：

- 前端行情展示  
- 高频 / 低延迟策略执行  
- 风险监控与价格告警  

对应协议 / OpenAPI 文档：

- [WebSocket API](/api/market-data/market_data)

---

## 1. 连接与认证

### 1.1 连接地址

```text
wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1
```

实盘环境地址请以运维提供为准。

### 1.2 认证方式

典型方式：在连接时通过 Header 携带 Bearer Token：

```
GET wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1
Authorization: Bearer <access_token>
```

Node.js 示例：

```javascript
import WebSocket from "ws";

const ws = new WebSocket("wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1", {
  headers: {
    Authorization: `Bearer <access_token>`,
  },
});
```

认证细节参考 [Authentication & Security](/docs/overview/authentication)。

---

## 2. 消息协议（示意）

> 实际字段与格式请以 [API Reference](/api/market-data/market_data) 中的定义为准。

### 2.1 订阅请求示例

```json
{
  "op": "subscribe",
  "args": [
    { "channel": "tick", "symbol": "EURUSD" },
    { "channel": "tick", "symbol": "XAUUSD" }
  ]
}
```

- `op`：操作类型，例如 `subscribe` / `unsubscribe`
- `args`：订阅参数数组

### 2.2 退订请求示例

```json
{
  "op": "unsubscribe",
  "args": [
    { "channel": "tick", "symbol": "EURUSD" }
  ]
}
```

### 2.3 tick 推送示例

```json
{
  "channel": "tick",
  "symbol": "EURUSD",
  "bid": 1.08650,
  "ask": 1.08655,
  "timestamp": 1712034567890
}
```

如支持更多频道（如 `depth`、`orderBook` 等），请参考 API Reference 中的详细定义。

---

## 3. 心跳、连接状态与重连

### 3.1 心跳机制（示意）

服务端可能会定期发送心跳包，例如：

```json
{ "type": "ping" }
```

客户端应回复：

```json
{ "type": "pong" }
```

或按协议要求回复自定义字段。

### 3.2 重连建议

- 监听 `close` 和 `error` 事件
- 使用指数退避策略重连（例如 1s -> 2s -> 4s -> 8s）
- 重连成功后重新发送订阅请求（基于本地缓存的订阅列表）

Node.js 简易伪代码：

```javascript
function createMarketDataClient() {
  let ws;
  let reconnectDelay = 1000;
  const subs = [];

  function connect() {
    ws = new WebSocket(WS_URL, { headers: { Authorization: `Bearer ${TOKEN}` } });

    ws.on("open", () => {
      reconnectDelay = 1000;
      subs.forEach((msg) => ws.send(JSON.stringify(msg)));
    });

    ws.on("close", () => {
      setTimeout(connect, reconnectDelay);
      reconnectDelay = Math.min(reconnectDelay * 2, 30000);
    });
  }

  return {
    connect,
    subscribeTick(symbol) {
      const msg = { op: "subscribe", args: [{ channel: "tick", symbol }] };
      subs.push(msg);
      ws?.readyState === WebSocket.OPEN && ws.send(JSON.stringify(msg));
    },
  };
}
```

---

## 4. 限流与订阅限制

典型限制（视实际实现而定）：

- 每个连接可订阅的**最大 symbol 数量**有上限
- 订阅频率和消息吞吐可能受到限流约束
- 如需大规模订阅（上百 / 上千品种），建议：
  - 使用多个连接进行拆分
  - 或联系 Zero Markets 技术支持评估专用通道

当超过限制时，可能返回错误消息，或直接断开连接。

---

## 5. 客户端封装建议

建议为 WebSocket 行情单独实现一个 `MarketDataWsClient`：

- **统一处理**：
  - 连接 / 重连
  - 订阅 / 退订
  - 心跳 / 掉线重连
- **对外提供简化接口**：
  - `subscribeTick(symbol: string)`
  - `onTick(callback)`
  - `onError(callback)`

配合 [Historical Price & Candles](/docs/market-data/price-history)，可以构建完整的：

- 冷启动历史数据
- 实时更新行情
- 回放和回测环境
