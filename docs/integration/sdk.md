---
id: sdk
title: SDK & Code Examples
---

本章节提供访问 Zero Markets API 的示例代码。  
你可以基于这些示例封装自己的内部 SDK。

> 以下示例均使用 Sandbox 环境域名，仅用于演示。

---

## 1. 通用 REST 调用示例（Python）

以 Positions API 为例：

```python
import requests

BASE_URL = "https://api-sandbox.zeromarkets.com"
TOKEN = "<your_token>"

def list_positions():
    url = f"{BASE_URL}/blackarrow/api/v1/positions"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    }
    resp = requests.get(url, headers=headers)
    print(resp.status_code, resp.json())

if __name__ == "__main__":
    list_positions()
```

---

## 2. 历史价格调用示例（Node.js）

```javascript
import fetch from 'node-fetch';

const BASE_URL = 'https://api-sandbox.zeromarkets.com';
const TOKEN = '<your_token>';

async function getPriceHistory() {
  const params = new URLSearchParams({
    symbol: 'EURUSD',
    period: 'M1',
    countBack: '100',
  });

  const res = await fetch(`${BASE_URL}/gaia/api/v1/price-history?${params}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  console.log(res.status, data);
}

getPriceHistory().catch(console.error);
```

---

## 3. WebSocket 行情订阅示例（Node.js）

```javascript
import WebSocket from 'ws';

const WS_URL = 'wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1';
const TOKEN = '<your_token>';

const ws = new WebSocket(WS_URL, {
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
  },
});

ws.on('open', () => {
  console.log('connected');
  ws.send(JSON.stringify({
    op: 'subscribe',
    args: [{ channel: 'tick', symbol: 'EURUSD' }],
  }));
});

ws.on('message', (data) => {
  console.log('message:', data.toString());
});

ws.on('close', () => {
  console.log('closed');
});
```

---

## 4. SDK 设计建议

- 将 Base URL、token、环境 抽象为配置
- 为每个域创建独立模块：
  - `tradingClient`
  - `marketDataClient`
- 对每个接口定义清晰的入参/出参类型（TypeScript 或模型类）
- 内置简单的重试与日志记录，便于线上排查问题

