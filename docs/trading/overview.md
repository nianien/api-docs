---
id: overview
title: Trading Domain Overview
---

import Link from '@docusaurus/Link';

Trading 域提供与账户交易相关的数据访问能力，包括：

- 当前持仓与风险敞口（Positions）
- 历史交易记录（Trading History / IB Portal）

这些接口通常由后端服务或策略引擎调用，用于：

- 构建风险 / 账户看板
- 做策略回测与业绩分析
- 给 IB / 客户生成对账单和报表

---

## 1. 相关 API 一览

| 能力           | 描述                    | 文档入口                                 |
|----------------|-------------------------|------------------------------------------|
| Positions      | 查询当前持仓与账户风险  | [Positions API](/api/trading/ba_position) |
| TradingHistory | 查询历史交易 / 成交记录 | [Trading History API](/api/trading/ib_portal_api)     |

---

## 2. 数据模型概念

### 2.1 Account & SubAccount

- `accountId`：账户标识
- `subAccountId`：子账户 / 策略账户标识
- `currency`：账户货币
- `leverage`：杠杆倍数

---

### 2.2 Position（持仓）

典型字段（示例）：

- `symbol`：品种，例如 `EURUSD`  
- `side`：`LONG` / `SHORT`  
- `volume`：持仓数量  
- `avgPrice`：持仓平均价格  
- `currentPrice`：当前标记价格  
- `unrealizedPnl`：浮动盈亏  
- `realizedPnl`：已实现盈亏  
- `marginUsed`：该持仓占用的保证金  
- `regulator`：监管归属（如 `ASIC` / `FCA`）

详见：[Positions 文档](/docs/trading/positions)

---

### 2.3 Trade / Deal（成交）

交易历史接口通常包含：

- `ticket` / `dealId`：成交编号  
- `accountId` / `subAccountId`  
- `openTime` / `closeTime`  
- `openPrice` / `closePrice`  
- `profit` / `commission` / `swap`  

详见：[Trading History 文档](/docs/trading/history)

---

## 3. 常见使用场景

- **量化交易 / 对冲策略**  
  - 通过 Positions 获取当前风险敞口  
  - 配合 Market Data 计算实时风险指标

- **风控与运营**  
  - 定期拉取 Positions 构建内部风控看板  
  - 通过 Trading History 构建 PnL 报表、业绩归因分析

- **IB / 代理**  
  - 使用 Trading History 提取客户交易记录  
  - 结合内部逻辑计算返佣

---

## 4. 接下来阅读

- [Positions：持仓与账户风险](/docs/trading/positions)  
- [Trading History：交易记录与报表](/docs/trading/history)
