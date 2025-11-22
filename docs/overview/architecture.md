---
id: architecture
title: Architecture & Domains
---

import Link from '@docusaurus/Link';

Zero Markets 对外提供的 API 按照"领域（Domain）"划分，目前主要包括：

- **Trading 域**：账户持仓、历史交易记录等
- **Market Data 域**：实时行情、历史价格数据
- **Integration 能力**：SDK、Sandbox、Webhook（规划中）

本章节概览整体架构，帮助你在集成前建立清晰的心智模型。

---

## 1. 域与服务划分

### 1.1 Trading 域

负责与你的账户和交易相关的数据：

- 当前持仓与风险敞口（Positions）
- 历史成交 / 交易记录（Trading History / IB Portal）

对应主要 API：

- `Positions API` → [/api/trading/ba_position](/api/trading/ba_position)  
- `Trading History API` → [/api/trading/ib_portal_api](/api/trading/ib_portal_api)

详见：

- [Trading Overview](/docs/trading/overview)

---

### 1.2 Market Data 域

专注于价格数据：

- 实时行情（WebSocket）
- 历史价格 / K 线（REST）

对应主要 API：

- `Realtime WS API` → [/api/market-data/market_data](/api/market-data/market_data)  
- `Price History API` → [/api/market-data/price_history](/api/market-data/price_history)

详见：

- [Market Data Overview](/docs/market-data/overview)

---

## 2. 环境与 Base URL

典型部署方式（示例）：

- Sandbox 环境  
  - `https://api-sandbox.zeromarkets.com`
- Live 环境  
  - `https://api.zeromarkets.com`

在此基础上，不同域有自己的路径前缀，例如：

- Trading / Positions：`/blackarrow/api/v1/...`
- Trading / History（IB Portal）：`/ib/api/v1/...`（示例）
- Market Data WebSocket：`/gaia/ws/api/v1`
- Price History：`/gaia/api/v1/price-history`

> 实际路径与版本号请以 OpenAPI 文档为准：参见 [API Reference](/api)。

---

## 3. 典型集成架构

一个完整的对接通常包含：

1. **服务端集成**
   - 后端服务或策略引擎，通过 REST / WS 与 Zero Markets 交互
   - 使用 SDK 或自封装客户端复用认证、错误处理逻辑

2. **数据处理层**
   - 将 Positions / History / Price History 等数据存入内部存储（DB / Data Warehouse）
   - 供风控、报表、统计使用

3. **前端 / 运维界面**
   - 使用 Zero Markets 提供的数据构建内部看板：
     - 风险看板
     - IB / 客户报表
     - 策略监控页面

---

## 4. 下一步

建议你按以下顺序阅读：

1. [Authentication & Security](/docs/overview/authentication)  
2. [Trading Overview](/docs/trading/overview)  
3. [Market Data Overview](/docs/market-data/overview)  
4. [SDK & Examples](/docs/integration/sdk)
