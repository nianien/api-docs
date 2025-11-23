---
id: quickstart
title: Quickstart
description: Get started with Zero Markets APIs in minutes
---

import Link from '@docusaurus/Link';

# 🚀 Zero Markets Quickstart

**目标：** 用最短时间完成开发环境准备、获取 API Key、发起第一个 API 请求，并连接实时行情。

本快速入门将引导你：

1. 获取 Sandbox API 密钥
2. 调用第一个 REST 接口（Positions API）
3. 获取实时行情（WebSocket）
4. 查看历史价格数据
5. 跳转下一步：完整集成指南 & SDK

---

## 1. 创建 Sandbox 账户 & 获取 API Key

Zero Markets 提供 Sandbox / Demo 环境，用于安全测试 API。

### ✔ 登录 Sandbox 控制台

**URL:** https://sandbox.zero.markets/portal

在控制台内：

1. 进入 **API Keys**
2. 点击 **Create API Key**
3. 复制以下凭证：

   - `api_key`
   - `secret_key`

:::warning 安全提示
请妥善保存密钥，不要上传至 GitHub 或日志文件。
:::

---

## 2. 测试连通性（健康检查）

```bash
curl https://api-demo.zero.markets/public/health
```

**正确返回：**

```json
{
  "status": "ok"
}
```

表示你已成功连接 Zero Markets API。

---

## 3. 发起第一个请求：查询持仓（Positions API）

**REST Base URL（Sandbox）：**

```
https://api-demo.zero.markets
```

### 请求示例（cURL）

```bash
curl -X GET "https://api-demo.zero.markets/api/trading/ba_position" \
  -H "X-API-KEY: <your_api_key>" \
  -H "X-API-SECRET: <your_secret_key>"
```

### 返回示例

```json
[
  {
    "symbol": "XAUUSD",
    "volume": 1.5,
    "side": "long",
    "profit": 23.12,
    "timestamp": 1710000123
  }
]
```

你已成功访问 Trading 域数据 🎉

---

## 4. 获取实时行情（Market Data WebSocket）

**WebSocket Endpoint（Sandbox）：**

```
wss://api-demo.zero.markets/ws/market_data
```

### Node.js 示例

```javascript
const ws = new WebSocket("wss://api-demo.zero.markets/ws/market_data");

ws.onopen = () => {
  ws.send(JSON.stringify({
    action: "subscribe",
    symbols: ["XAUUSD", "EURUSD"]
  }));
};

ws.onmessage = (msg) => {
  console.log("Tick:", JSON.parse(msg.data));
};
```

### 输出类似

```json
{
  "symbol": "XAUUSD",
  "bid": 2311.28,
  "ask": 2311.40,
  "ts": 1710001023
}
```

---

## 5. 获取 K 线历史（Price History API）

```bash
curl "https://api-demo.zero.markets/api/market/price_history?symbol=XAUUSD&interval=1m" \
  -H "X-API-KEY: <your_api_key>"
```

### 返回示例

```json
[
  {
    "open": 2310.10,
    "high": 2310.50,
    "low": 2308.22,
    "close": 2309.10,
    "ts": 1710000600
  }
]
```

---

## 6. 下一步去哪？

### ✅ Integration Guides（更深入的集成指南）

- Trading 接入流程
- WebSocket 订阅设计
- 错误码与最佳实践
- 安全与认证机制

👉 <Link to="/docs/trading/overview">Trading 域文档</Link>  
👉 <Link to="/docs/market-data/overview">Market Data 域文档</Link>

---

### 🔧 SDK（Python / Node / Java）

使用 SDK 更少写样板代码：

👉 <Link to="/docs/integration/sdk">查看 SDK 文档</Link>

---

### 📘 API Reference（完整 API 文档）

REST & WebSocket 的完整 endpoint：

👉 <Link to="/api">API Reference</Link>

---

### 🧪 Sandbox / Demo 环境说明

沙箱环境限制、速率限制、订单模拟规则：

👉 <Link to="/docs/integration/sandbox">Sandbox 环境文档</Link>

---

## 🎉 Quickstart 完成！

你已经：

- ✔ 获取 API Key
- ✔ 成功调用 REST API
- ✔ 成功订阅实时行情
- ✔ 获取历史价格
- ✔ 理解下一步应该去哪

你现在已经准备好构建交易系统、行情服务或算法策略。

---

:::tip 需要帮助？
如果遇到问题，请查看 <Link to="/docs/overview/errors">错误处理指南</Link> 或联系技术支持。
:::

