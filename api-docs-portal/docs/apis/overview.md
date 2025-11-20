---
sidebar_position: 2
title: API 服务总览
---

# API 服务总览

以下列表会跟随 `static/openapi/*.yaml` 与 `docusaurus.config.js` 中的 `serviceSpecs` 同步更新，便于快速了解每个 API 的入口。

## Price History

- **描述**：REST API allows you to retrieve historical price data.
- **版本**：1.0.0
- **标签**：Restful API, Price History
- **文档**：[`/price-history`](/price-history)

## Market Data

- **描述**：WebSocket API provides real-time market data updates.
- **版本**：1.0.0
- **标签**：WebSocket API, Market Data
- **文档**：[`/market-data`](/market-data)

## IB Portal

- **描述**：Open API endpoints for retrieving referral code accounts, transaction history, and rebate history.
- **版本**：1.0.0
- **标签**：IB Portal API, IB Portal
- **文档**：[`/ib-portal`](/ib-portal)

## BlackArrow Positions

- **描述**：REST API for getting BlackArrow positions.
- **版本**：1.0.0
- **标签**：Restful API, BlackArrow Positions
- **文档**：[`/blackarrow-positions`](/blackarrow-positions)

> 如需新增服务：在 `static/openapi` 放置新的 OpenAPI YAML，并在 `docusaurus.config.js` 的 `serviceSpecs` 数组中追加配置即可。

