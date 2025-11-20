---
id: market-data-overview
title: Market Data Domain Overview
sidebar_label: Overview
---

Market Data 域提供：

- 实时行情（通过 WebSocket 推送）
- 历史价格 / K 线（通过 REST 拉取）

这两类接口可以组合使用：

- WebSocket：驱动实时策略、前端展示、监控告警
- 历史 REST：回测、绘制 K 线图、补齐缺失的历史段

---

## 1. 实时行情（WebSocket）

通过 WebSocket 接口订阅：

- 外汇、指数、商品等产品的报价流
- 订阅 / 退订机制
- 心跳与重连机制

详见：

- [WebSocket 行情文档](./websocket.md)

---

## 2. 历史价格（REST）

通过 REST 接口获取：

- 不同周期的 K 线（例如 1m / 5m / 1h / 1d）
- 指定时间范围内的 OHLCV 数据
- countBack / limit 等参数配合使用

详见：

- [价格历史文档](./price-history.md)

