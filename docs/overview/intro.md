---
id: intro
title: Zero Markets Developer Portal
---

import Link from '@docusaurus/Link';

# Zero Markets Developer Portal

欢迎来到 **Zero Markets 开发者文档站**。  
这里是你接入 Zero Markets 交易与行情基础设施、构建自有交易系统与报表平台的统一入口。

> 通过统一的 REST 与 WebSocket API，你可以访问账户持仓、交易历史、实时行情与历史价格数据，  
> 用于构建量化策略、风控系统、报表及运营工具。  
> FX and CFDs trading involves a high risk of loss and may not be suitable for all investors.

---

## 核心能力一览

- **Trading APIs**  
  - 当前持仓与风险视图（Positions）  
  - 历史交易 / IB 报表数据（Trading History）

- **Market Data APIs**  
  - 实时行情 WebSocket  
  - 历史价格 / K 线 REST

- **Integration 工具**  
  - SDK 示例（Python / Node.js / Java）  
  - Sandbox / Demo 环境  
  - 计划中的 Webhooks 能力

---

## 快速开始

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 margin-top--md">

  <div className="api-card">
    <h3>1️⃣ 获取访问凭证</h3>
    <p>在 Zero Markets 后台创建 API 凭证，获得访问 Token。</p>
    <Link className="button button--sm button--primary margin-top--sm" to="/docs/overview/authentication">
      查看认证方式
    </Link>
  </div>

  <div className="api-card">
    <h3>2️⃣ 调用第一个接口</h3>
    <p>使用 Positions API 获取当前持仓，验证网络与权限配置。</p>
    <Link className="button button--sm button--outline margin-top--sm" to="/api/trading/ba_position">
      打开 Positions API
    </Link>
  </div>

  <div className="api-card">
    <h3>3️⃣ 深入集成</h3>
    <p>通过 SDK 与 Sandbox 环境集成到你的交易系统与报表平台。</p>
    <Link className="button button--sm button--outline margin-top--sm" to="/docs/integration/sdk">
      查看 SDK &amp; 示例代码
    </Link>
  </div>

</div>

---

## 文档结构

- **Overview**
  - [Intro](/docs/overview/intro)：当前页面，总览与快速入口  
  - [Authentication](/docs/overview/authentication)：认证与安全  
  - [Architecture](/docs/overview/architecture)：域划分与环境说明  
  - [Error Codes](/docs/overview/errors)：错误码与约定

- **Trading**
  - [Trading Overview](/docs/trading/overview)  
  - [Positions](/docs/trading/positions)  
  - [Trading History](/docs/trading/history)  

- **Market Data**
  - [Market Data Overview](/docs/market-data/overview)  
  - [Realtime WS](/docs/market-data/websocket)  
  - [Price History](/docs/market-data/price-history)  

- **Integration**
  - [SDK & Code Examples](/docs/integration/sdk)  
  - [Sandbox](/docs/integration/sandbox)  
  - [Webhooks (Planned)](/docs/integration/webhooks)  

- **Changelog**
  - [Changelog](/docs/changelog)：接口变更与版本记录

---

## 支持与反馈

如需技术支持或商务合作，请联系：

- 技术支持：`api-support@zeromarkets.com`  
- 商务合作：`bd@zeromarkets.com`

请在邮件中简要描述：

- 使用的环境（Sandbox / Live）  
- 使用的主要 API（Trading / Market Data）  
- 问题描述、错误码、请求样例（如有）
