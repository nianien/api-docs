---
id: overview
title: Market Data Domain Overview
sidebar_label: Overview
---

import Link from '@docusaurus/Link';

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

- [WebSocket 行情文档](/docs/market-data/websocket)
- [Market Data WebSocket API 参考](/api/market-data/websocket)

---

## 2. 历史价格（REST）

通过 REST 接口获取：

- 不同周期的 K 线（例如 1m / 5m / 1h / 1d）
- 指定时间范围内的 OHLCV 数据
- countBack / limit 等参数配合使用

详见：

- [价格历史文档](/docs/market-data/price-history)
- [Price History API 参考](/api/market-data/price-history)

---

## 3. 使用场景

### 3.1 实时策略

```
WebSocket 订阅实时行情
    ↓
策略引擎计算信号
    ↓
触发交易决策
```

### 3.2 回测系统

```
Price History API 获取历史 K 线
    ↓
策略回测引擎
    ↓
性能评估与优化
```

### 3.3 前端展示

```
WebSocket 实时更新价格
    ↓
Price History 绘制历史 K 线图
    ↓
完整的行情展示界面
```

---

## 4. 下一步阅读

- [WebSocket 实时行情](/docs/market-data/websocket) → [WebSocket API](/api/market-data/websocket)
- [Price History 历史价格](/docs/market-data/price-history) → [Price History API](/api/market-data/price-history)

---

## 5. API 参考

完整的 Market Data API 接口文档：

- [API Reference 概览](/api#market-data-apis)
- [Market Data WebSocket API](/api/market-data/websocket)
- [Price History API](/api/market-data/price-history)

