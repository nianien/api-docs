---
sidebar_position: 2
title: API 服务总览
---

# API 服务总览

以下列表会跟随 `static/openapi/*.yaml` 与 `docusaurus.config.js` 中的 `serviceSpecs` 同步更新，便于快速了解每个 API 的入口。

## Trading APIs

- **Positions API**：查询账户当前持仓与风险视图
  - **文档**：[Positions API](/api/trading/positions)
- **Trading History API**：查询账户历史交易记录、成交明细与报表数据
  - **文档**：[Trading History API](/api/trading/history)

## Market Data APIs

- **WebSocket API**：实时行情推送，支持多品种订阅
  - **文档**：[Market Data WebSocket](/api/market-data/websocket)
- **Price History API**：历史 K 线数据查询，支持多周期
  - **文档**：[Price History API](/api/market-data/price-history)

> 如需新增服务：在 `static/openapi` 放置新的 OpenAPI YAML，并在 `docusaurus.config.js` 的 `serviceSpecs` 数组中追加配置即可。

