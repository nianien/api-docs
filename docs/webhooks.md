---
id: webhooks
title: Webhooks & Callbacks
---

Webhooks 允许 Zero Markets 在特定事件发生时，**主动向你的服务推送通知**，例如：

- 订单状态变化（成交 / 撤单 / 拒单）
- 余额或保证金变动
- 风控事件（强平、止损等）

---

## 1. 基本工作原理

1. 你在后台或 API 中配置一个 **Webhook Endpoint**（例如 `https://example.com/zm/webhook`）  
2. 当事件发生时，Zero Markets 会向该 URL 发送 `POST` 请求  
3. 你的服务返回 `2xx` 状态码表示接受成功  
4. 如遇网络异常或非 `2xx` 响应，将触发重试机制

---

## 2. 支持的事件类型

示例事件类型（`eventType`）：

- `ORDER_NEW`
- `ORDER_FILLED`
- `ORDER_PARTIALLY_FILLED`
- `ORDER_CANCELLED`
- `MARGIN_CALL`
- `POSITION_CLOSED`

你可以在后台选择仅订阅部分事件。

---

## 3. 请求示例

```http
POST /zm/webhook HTTP/1.1
Host: example.com
Content-Type: application/json
X-ZM-SIGNATURE: <signature>
X-ZM-EVENT-ID: 8dd6c1ad-0b7b-4a8d-9e6b-1234567890ab
X-ZM-EVENT-TYPE: ORDER_FILLED
X-ZM-EVENT-TIMESTAMP: 1712034567890
```

请求体示例：

```json
{
  "eventType": "ORDER_FILLED",
  "eventId": "8dd6c1ad-0b7b-4a8d-9e6b-1234567890ab",
  "occurredAt": "2024-03-01T09:30:01Z",
  "accountId": "123456",
  "order": {
    "orderId": "78910",
    "clientOrderId": "my-strategy-001",
    "symbol": "EURUSD",
    "side": "BUY",
    "type": "MARKET",
    "status": "FILLED",
    "avgFillPrice": 1.08652,
    "filledQuantity": 10000
  }
}
```

---

## 4. Webhook 签名验证

Webhook 同样使用 `X-ZM-SIGNATURE` 来校验合法性。

签名方式与 API 请求类似，你可以使用：

```
payload = <RAW_BODY> + "." + <X-ZM-EVENT-TIMESTAMP>
signature = HMAC_SHA256(apiSecret, payload)
```

伪代码（Node.js）：

```javascript
const crypto = require('crypto');

function verifySignature(rawBody, timestamp, signatureHeader, secret) {
  const payload = `${rawBody}.${timestamp}`;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signatureHeader)
  );
}
```

强烈建议使用 **原始请求体字符串** 参与签名计算，而不是 JSON 解析后的对象再 stringify，以避免空格/字段顺序导致的问题。

---

## 5. 重试与幂等性

- 若你的服务返回非 `2xx` 状态码，或超时（例如 5 秒内无响应），Zero Markets 会进行重试
- 每个事件拥有唯一 `eventId`（`X-ZM-EVENT-ID`），你应在本地持久化该 ID，用于幂等处理

伪逻辑：

```
if eventId 已处理:
  忽略
else:
  处理业务逻辑
  标记 eventId 已处理
```

---

## 6. 最佳实践与注意事项

- Webhook Endpoint 应使用 HTTPS，防止中间人攻击
- 尽量保持处理逻辑轻量，将耗时任务转交后台队列
- 一定要验证 `X-ZM-SIGNATURE`，否则任何人都能伪造事件
- 为不同环境（Sandbox / Live）配置不同的 endpoint 与密钥

如需停止接收 Webhook，可在后台禁用或删除对应配置。
