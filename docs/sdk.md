---
id: sdk
title: SDK & Code Examples
---

本章节提供 Zero Markets Trading API 的 **调用示例与推荐实践**。  
你可以基于这些示例快速封装自己的 SDK。

> 以下示例默认指向 Sandbox 环境：`https://api-sandbox.zeromarkets.com`。

---

## 1. 通用请求结构

所有请求：

- 使用 HTTPS
- 请求体为 `application/json`
- 携带认证 Header：`X-ZM-API-KEY`、`X-ZM-TIMESTAMP`、`X-ZM-SIGNATURE`

---

## 2. Python 示例

```python
import time
import hmac
import hashlib
import requests
import json

BASE_URL = "https://api-sandbox.zeromarkets.com"
API_KEY = "<your_api_key>"
API_SECRET = "<your_api_secret>"

def sign(method, path, body=""):
    ts = str(int(time.time() * 1000))
    payload = f"{method.upper()}\n{path}\n{ts}\n{body}"
    signature = hmac.new(
        API_SECRET.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return ts, signature

def list_accounts():
    method = "GET"
    path = "/v1/accounts"
    body = ""
    ts, sig = sign(method, path, body)
    headers = {
      "X-ZM-API-KEY": API_KEY,
      "X-ZM-TIMESTAMP": ts,
      "X-ZM-SIGNATURE": sig,
    }
    resp = requests.get(BASE_URL + path, headers=headers)
    print(resp.status_code, resp.json())

if __name__ == "__main__":
    list_accounts()
```

---

## 3. Node.js 示例（下单）

```javascript
import crypto from 'crypto';
import fetch from 'node-fetch';

const BASE_URL = 'https://api-sandbox.zeromarkets.com';
const API_KEY = '<your_api_key>';
const API_SECRET = '<your_api_secret>';

function sign(method, path, body = '') {
  const ts = Date.now().toString();
  const payload = `${method.toUpperCase()}\n${path}\n${ts}\n${body}`;
  const signature = crypto
    .createHmac('sha256', API_SECRET)
    .update(payload)
    .digest('hex');
  return { ts, signature };
}

async function createOrder() {
  const method = 'POST';
  const path = '/v1/orders';
  const bodyObj = {
    accountId: '123456',
    symbol: 'EURUSD',
    side: 'BUY',
    type: 'MARKET',
    quantity: 10000,
  };
  const body = JSON.stringify(bodyObj);

  const { ts, signature } = sign(method, path, body);

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-ZM-API-KEY': API_KEY,
      'X-ZM-TIMESTAMP': ts,
      'X-ZM-SIGNATURE': signature,
    },
    body,
  });

  const data = await res.json();
  console.log(res.status, data);
}

createOrder().catch(console.error);
```

---

## 4. Java 示例（简易封装思路）

```java
// 仅示意，未包含完整异常处理
String method = "GET";
String path = "/v1/accounts";
String body = "";
String timestamp = String.valueOf(System.currentTimeMillis());
String payload = method + "\n" + path + "\n" + timestamp + "\n" + body;

Mac mac = Mac.getInstance("HmacSHA256");
mac.init(new SecretKeySpec(apiSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
String signature = Hex.encodeHexString(mac.doFinal(payload.getBytes(StandardCharsets.UTF_8)));

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(baseUrl + path))
    .GET()
    .header("X-ZM-API-KEY", apiKey)
    .header("X-ZM-TIMESTAMP", timestamp)
    .header("X-ZM-SIGNATURE", signature)
    .build();
```

---

## 5. SDK 设计建议

如果你计划封装内部 SDK，推荐：

- 将签名逻辑封装为单独模块，方便复用与单元测试
- 提供统一的 Client 类，包含：
  - `listAccounts()`
  - `placeOrder()`
  - `cancelOrder()`
  - `listPositions()` 等
- 为所有返回类型定义模型类 / TypeScript 类型，以减少魔法字符串
- 内置简单的重试逻辑（对 5xx 与网络错误）

如果将来官方提供正式 SDK，可以在本章节中补充安装方式与链接。
