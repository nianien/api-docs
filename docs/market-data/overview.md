---
id: overview
title: Market Data Domain Overview
---

import Link from '@docusaurus/Link';

Market Data 域提供：

- 实时行情（WebSocket）
- 历史价格 / K 线（REST）

这两类接口适合结合使用：

- WebSocket：驱动实时行情展示、策略执行、监控与告警  
- Price History：回测、绘制图表、填补历史数据缺口

---

## 1. 相关 API 一览

| 能力                      | 描述            | 文档入口                                            |
|---------------------------|-----------------|-----------------------------------------------------|
| Realtime WS API           | 实时行情推送    | [WebSocket API](/api/market-data/market_data) |
| Price History REST API    | 历史价格 / K 线 | [Price History API](/api/market-data/price_history) |

---

## 2. 实时行情（WebSocket）

- 使用 WebSocket 协议建立长连接  
- 通过订阅 / 退订消息管理品种列表  
- 支持多种频道：如 `tick`、`orderBook` 等（视实际实现而定）

详见：[Realtime Market Data WebSocket](/docs/market-data/websocket)

---

## 3. 历史价格 / K 线（REST）

- 支持多周期（如 `M1`, `M5`, `H1`, `D1` 等）  
- 支持按时间范围或 `countBack` 等参数拉取  
- 返回标准化的 OHLCV 数据

详见：[Historical Price & Candles](/docs/market-data/price-history)

---

## 4. 使用建议

- **策略系统**：
  - 启动时通过 Price History 拉取一段历史数据
  - 运行时通过 WS 接收实时 tick / quote 更新  
- **图表系统**：
  - 使用 Price History 作为数据源绘制 K 线
  - 适当缓存数据，避免重复请求
- **监控系统**：
  - 可基于 WS 实现实时价格告警，如跳涨 / 跳水等
