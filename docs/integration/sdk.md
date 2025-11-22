---
id: sdk
title: SDK & Code Examples
sidebar_label: SDK
---

本章节提供访问 Zero Markets API 的示例代码与 SDK 设计建议，  
帮助你在常见语言中快速集成：

- Python
- Node.js
- Java（简要骨架）
- WebSocket 行情订阅示例

> 以下示例默认使用 **Sandbox 环境**，域名及路径请根据你的实际部署调整。

---

## 1. 基础配置与通用封装思路

无论哪种语言，推荐先抽象出一个**通用客户端配置层**，包括：

- `baseUrl`：环境地址  
  - 例如：`https://api-sandbox.zeromarkets.com`
- `token`：Bearer Token（参见 [Authentication 文档](/docs/auth)）
- 通用请求方法：`get/post` 封装  
- 错误处理 & 日志

典型模块划分：

- `TradingClient`：持仓 / 历史交易  
- `MarketDataClient`：历史价格  
- `MarketDataWsClient`：WebSocket 行情

后面的示例就是围绕这几个客户端展开。

---

## 2. Python 示例

### 2.1 通用 HTTP 客户端

```python
import requests
from typing import Any, Dict, Optional

class ZeroMarketsClient:
    def __init__(self, base_url: str, token: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.token = token
        self.timeout = timeout

    def _headers(self) -> Dict[str, str]:
        return {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
        }

    def get(self, path: str, params: Optional[Dict[str, Any]] = None):
        url = f"{self.base_url}{path}"
        resp = requests.get(url, headers=self._headers(), params=params, timeout=self.timeout)
        resp.raise_for_status()
        return resp.json()

    def post(self, path: str, json: Optional[Dict[str, Any]] = None):
        url = f"{self.base_url}{path}"
        resp = requests.post(url, headers=self._headers(), json=json, timeout=self.timeout)
        resp.raise_for_status()
        return resp.json()
```

这里使用 `raise_for_status()` 直接抛异常，你也可以改成统一错误码包装。

---

### 2.2 Trading – Positions 示例

假设 Positions 接口为：

```
GET /blackarrow/api/v1/positions
```

```python
class TradingClient:
    def __init__(self, zm: ZeroMarketsClient):
        self.zm = zm

    def list_positions(
        self,
        account_id: str,
        page_no: int = 1,
        page_size: int = 50,
    ):
        params = {
            "accountId": account_id,
            "pageNo": page_no,
            "pageSize": page_size,
        }
        return self.zm.get("/blackarrow/api/v1/positions", params=params)


if __name__ == "__main__":
    client = ZeroMarketsClient(
        base_url="https://api-sandbox.zeromarkets.com",
        token="<your_token>",
    )
    trading = TradingClient(client)
    data = trading.list_positions(account_id="123456")
    print(data)
```

---

### 2.3 Market Data – Price History 示例

假设历史价格接口为：

```
GET /gaia/api/v1/price-history
```

```python
class MarketDataClient:
    def __init__(self, zm: ZeroMarketsClient):
        self.zm = zm

    def get_price_history(
        self,
        symbol: str,
        period: str = "M1",
        count_back: int = 100,
    ):
        params = {
            "symbol": symbol,
            "period": period,
            "countBack": count_back,
        }
        return self.zm.get("/gaia/api/v1/price-history", params=params)


if __name__ == "__main__":
    client = ZeroMarketsClient(
        base_url="https://api-sandbox.zeromarkets.com",
        token="<your_token>",
    )
    md = MarketDataClient(client)
    candles = md.get_price_history("EURUSD", period="M1", count_back=50)
    print(candles)
```

---

## 3. Node.js 示例

### 3.1 通用 HTTP 客户端（使用 node-fetch）

```javascript
import fetch from "node-fetch";

export class ZeroMarketsClient {
  constructor(baseUrl, token, timeoutMs = 10000) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.token = token;
    this.timeoutMs = timeoutMs;
  }

  headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async get(path, params = {}) {
    const url = new URL(this.baseUrl + path);
    Object.entries(params).forEach(([k, v]) =>
      v !== undefined && url.searchParams.append(k, String(v))
    );

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: this.headers(),
      timeout: this.timeoutMs,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GET ${url} failed: ${res.status} ${text}`);
    }
    return res.json();
  }

  async post(path, body = {}) {
    const url = this.baseUrl + path;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
      timeout: this.timeoutMs,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`POST ${url} failed: ${res.status} ${text}`);
    }
    return res.json();
  }
}
```

---

### 3.2 Positions 调用示例

```javascript
import { ZeroMarketsClient } from "./client.js";

class TradingClient {
  constructor(zm) {
    this.zm = zm;
  }

  listPositions({ accountId, pageNo = 1, pageSize = 50 }) {
    return this.zm.get("/blackarrow/api/v1/positions", {
      accountId,
      pageNo,
      pageSize,
    });
  }
}

const zm = new ZeroMarketsClient(
  "https://api-sandbox.zeromarkets.com",
  "<your_token>"
);
const trading = new TradingClient(zm);

trading
  .listPositions({ accountId: "123456" })
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
```

---

### 3.3 Price History 调用示例

```javascript
class MarketDataClient {
  constructor(zm) {
    this.zm = zm;
  }

  getPriceHistory({ symbol, period = "M1", countBack = 100 }) {
    return this.zm.get("/gaia/api/v1/price-history", {
      symbol,
      period,
      countBack,
    });
  }
}

const md = new MarketDataClient(zm);

md.getPriceHistory({ symbol: "EURUSD", period: "M1", countBack: 50 })
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
```

---

## 4. WebSocket 行情 SDK 示例（Node.js）

假设 WS 地址为：

```
wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1
```

可以封装一个简单的 MarketDataWsClient：

```javascript
import WebSocket from "ws";

export class MarketDataWsClient {
  constructor(wsUrl, token) {
    this.wsUrl = wsUrl;
    this.token = token;
    this.ws = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      this.ws.on("open", () => {
        console.log("MarketData WS connected");
        resolve();
      });

      this.ws.on("error", (err) => {
        console.error("WS error", err);
        reject(err);
      });

      this.ws.on("close", (code, reason) => {
        console.log("WS closed", code, reason.toString());
        // TODO: 这里可以加自动重连逻辑
      });
    });
  }

  subscribeTicks(symbols) {
    const msg = {
      op: "subscribe",
      args: symbols.map((s) => ({ channel: "tick", symbol: s })),
    };
    this.ws?.send(JSON.stringify(msg));
  }

  onMessage(handler) {
    this.ws?.on("message", (data) => {
      try {
        const json = JSON.parse(data.toString());
        handler(json);
      } catch {
        handler(data.toString());
      }
    });
  }
}

// 使用示例
const wsClient = new MarketDataWsClient(
  "wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1",
  "<your_token>"
);

(async () => {
  await wsClient.connect();
  wsClient.subscribeTicks(["EURUSD", "XAUUSD"]);

  wsClient.onMessage((msg) => {
    console.log("tick:", msg);
  });
})();
```

---

## 5. Java 示例骨架

Java 推荐做法是：

- 把 HTTP 封装成一个 `ZeroMarketsClient`（基于 HttpClient 或 OkHttp）
- 为每个域创建独立 Service：`TradingService`、`MarketDataService`

示例（仅骨架，不含完整错误处理）：

```java
public class ZeroMarketsClient {

    private final String baseUrl;
    private final String token;
    private final HttpClient httpClient;

    public ZeroMarketsClient(String baseUrl, String token) {
        this.baseUrl = baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
        this.token = token;
        this.httpClient = HttpClient.newHttpClient();
    }

    private HttpRequest.Builder baseRequest(String path) {
        return HttpRequest.newBuilder()
            .uri(URI.create(baseUrl + path))
            .header("Authorization", "Bearer " + token)
            .header("Content-Type", "application/json");
    }

    public String get(String path, String query) throws IOException, InterruptedException {
        String fullPath = path + (query == null || query.isEmpty() ? "" : "?" + query);
        HttpRequest request = baseRequest(fullPath).GET().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 400) {
            throw new RuntimeException("GET failed: " + response.statusCode() + " " + response.body());
        }
        return response.body();
    }

    public String post(String path, String body) throws IOException, InterruptedException {
        HttpRequest request = baseRequest(path)
            .POST(HttpRequest.BodyPublishers.ofString(body == null ? "" : body))
            .build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() >= 400) {
            throw new RuntimeException("POST failed: " + response.statusCode() + " " + response.body());
        }
        return response.body();
    }
}
```

Trading 领域调用示例（伪代码）：

```java
public class TradingService {

    private final ZeroMarketsClient client;

    public TradingService(ZeroMarketsClient client) {
        this.client = client;
    }

    public String listPositions(String accountId, int pageNo, int pageSize) throws Exception {
        String query = String.format("accountId=%s&pageNo=%d&pageSize=%d",
                URLEncoder.encode(accountId, StandardCharsets.UTF_8),
                pageNo, pageSize);
        return client.get("/blackarrow/api/v1/positions", query);
    }
}
```

---

## 6. SDK 设计最佳实践

### 6.1 模块化

- 按"域"拆模块，而不是按"URL 拆模块"
- `trading` 模块：positions、history、未来的 orders
- `market-data` 模块：WS + price history

### 6.2 类型与模型

- 用强类型封装响应：
  - TypeScript 接口 / Java DTO / Python dataclass
- 至少对核心字段建模：
  - Position / Trade / Candle / Tick

### 6.3 错误处理

- 对 HTTP 状态码和业务错误码进行统一封装：
  - `4xx`：参数 / 权限 / 限流
  - `5xx`：服务端异常，可重试

### 6.4 配置与多环境

- 支持从环境变量或配置文件读取：
  - `ZM_BASE_URL`
  - `ZM_TOKEN`
  - `ZM_ENV`（sandbox / live）

你可以基于以上示例，封装自己的内部 SDK 包（例如 `@zeromarkets/sdk`，`zero-markets-sdk`），然后在各个微服务 / 策略系统中复用。

如果你想，我可以再给一版**真正 npm 包结构 / Python 包结构**（包括 `setup.cfg` / `pyproject.toml`、`package.json`、导出方式），让你可以直接发一个内部 SDK 包，用在所有服务里。
