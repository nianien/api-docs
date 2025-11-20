---
id: trading-overview
title: Trading Domain Overview
sidebar_label: Overview
---

Trading 域提供与账户交易相关的数据访问能力，包括：

- 持仓 / 账户风险视图
- 成交历史 / 交易记录
- 未来（可扩展）：订单、风控事件等

目前主要通过以下 API 提供：

- **Positions API**：查询当前持仓与账户风险
- **IB Portal / Trading History API**：查询成交与返佣相关记录

---

## 1. 数据模型概览

### 1.1 账户与持仓

核心对象包括：

- **Account / SubAccount**：账户与子账户标识、货币、杠杆等
- **Position**：每个品种上的头寸，包括：
  - `symbol` / `volume` / `side`
  - `avgPrice` / `currentPrice`
  - `unrealizedPnl` / `realizedPnl`
  - `marginUsed` / `swap` / `commission`

详细字段请参考：

- [Positions 文档](/docs/domains/trading/trading-positions)

---

### 1.2 成交与历史交易记录

通过 Trading History/IB Portal API，可以获取：

- 每笔成交（deal）的价格、数量、方向
- 归属的账户、IB 关系
- 盈亏、返佣、手续费等

详细字段请参考：

- [Trading History 文档](/docs/domains/trading/trading-history)

---

## 2. 与行情 / 历史价格的关系

- Trading 域专注于「账户视角」：涨跌后对你的持仓和盈亏有什么影响  
- Market Data 域专注于「市场视角」：价格如何变化、K 线历史如何

在典型策略中：

- 通过 Market Data 订阅行情 → 计算信号  
- 通过 Trading 域确认当前仓位、风险敞口 → 生成交易决策  
- （如果有交易下单 API，则通过 Trading 域执行）

---

## 3. 常见使用场景

- 量化 / 对冲基金：
  - 实盘风控看板：集中展示多账户持仓与风险
  - 业绩归因：用成交历史分析策略表现

- IB / 代理：
  - 通过交易历史 API 生成客户报表、返佣报表

---

## 4. 下一步阅读

- [Positions：持仓与账户风险](/docs/domains/trading/trading-positions)
- [Trading History：交易记录与报表](/docs/domains/trading/trading-history)

