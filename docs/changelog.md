---
id: changelog
title: Changelog
---

本页用于记录 Zero Markets API 的重要变更，  
便于集成方跟踪版本升级与兼容性影响。

> 以下时间与内容为示例，请按实际发布情况维护。

---

## 2024-03-10 — Trading & Market Data v1.1.0

### Added

- Positions API 新增字段 `regulator`，用于标记监管归属（例如 `ASIC`, `FCA` 等）。
- Price History API 支持新的周期枚举，例如 `M2`, `H2`（示例）。

### Changed

- Market Data WebSocket 增加心跳消息类型，`ping` / `pong` 行为更加明确。
- Trading History 查询默认时间窗口调整为最近 3 个月。

### Deprecated

- 某旧版查询接口标记为废弃（示例），推荐使用新的统一路径替代。

---

## 2024-01-15 — Initial Public Release v1.0.0

- 发布 Trading 域基础能力：
  - Positions API
  - Trading History / IB Portal API
- 发布 Market Data 域基础能力：
  - 实时行情 WebSocket API
  - 历史价格 REST API
- 搭建 Zero Markets Developer Portal（Docusaurus + Redoc）
