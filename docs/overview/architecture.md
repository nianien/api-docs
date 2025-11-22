---
id: architecture
title: System Architecture
sidebar_label: Architecture
---

import Link from '@docusaurus/Link';

本文档概述 Zero Markets API 的整体架构设计，帮助开发者理解系统组成和数据流向。

---

## 1. API 域划分

Zero Markets API 按业务域划分为：

### Trading 域
- **职责**：账户、持仓、交易历史等交易相关数据
- **主要接口**：
  - Positions API：查询当前持仓与账户风险
  - Trading History API：查询成交与返佣相关记录
- **文档**：[Trading Domain Overview](/docs/trading/overview)
- **API 参考**：[Trading APIs](/api#trading-apis)

### Market Data 域
- **职责**：实时行情与历史价格数据
- **主要接口**：
  - WebSocket API：实时行情推送
  - Price History API：历史 K 线数据查询
- **文档**：[Market Data Domain Overview](/docs/market-data/overview)
- **API 参考**：[Market Data APIs](/api#market-data-apis)

---

## 2. 数据流向

### 2.1 实时数据流

```
Market Data WebSocket
    ↓
实时行情推送 (Tick / Quote)
    ↓
策略引擎 / 前端展示
```

### 2.2 交易数据流

```
Trading REST API
    ↓
持仓查询 / 历史记录
    ↓
风控看板 / 报表系统
```

### 2.3 历史数据流

```
Price History REST API
    ↓
历史 K 线数据
    ↓
回测系统 / K 线图表
```

---

## 3. 环境与部署

### 3.1 环境类型

- **Sandbox**：测试环境，用于开发调试
  - Base URL: `https://api-sandbox.zeromarkets.com`
- **Live**：生产环境，连接真实账户
  - Base URL: `https://api.zeromarkets.com`

### 3.2 认证统一

所有域使用统一的 Bearer Token 认证机制，详见：[Authentication & Security](/docs/overview/authentication)

---

## 4. 集成建议

### 4.1 开发流程

1. **Sandbox 环境验证**
   - 在 Sandbox 中完成所有接口联调
   - 验证认证、数据格式、错误处理
   - 参考：[Sandbox 环境文档](/docs/integration/sandbox)

2. **SDK 封装**
   - 基于示例代码封装内部 SDK
   - 统一错误处理、重试逻辑
   - 参考：[SDK & 示例代码](/docs/integration/sdk)

3. **生产环境迁移**
   - 使用独立的 Live 环境凭证
   - 小规模验证后再扩大规模
   - 建立监控和告警机制

### 4.2 最佳实践

- **模块化设计**：按域拆分客户端（TradingClient / MarketDataClient）
- **类型安全**：使用强类型封装响应数据
- **错误处理**：统一处理 HTTP 状态码和业务错误码
- **配置管理**：支持环境变量和配置文件

---

## 5. 相关文档

- [Introduction](/docs/overview/intro) - 开发者入口
- [Authentication & Security](/docs/overview/authentication) - 认证机制
- [API Reference 概览](/api) - 所有 API 接口文档

