---
id: sandbox
title: Sandbox / Demo Environment
---

Zero Markets 提供 Sandbox / Demo 环境，用于无风险测试集成与验证逻辑。

---

## 1. 环境对比

| 环境    | Base URL 示例                                       | 说明                     |
|---------|-----------------------------------------------------|--------------------------|
| Sandbox | `https://api-sandbox.zeromarkets.com`               | 模拟环境，不涉及真实资金 |
| Live    | `https://api.zeromarkets.com`                       | 实盘环境，连接真实账户   |

各子服务可能在 Sandbox/Live 下有自己的前缀，例如：

- Trading / Positions：`/blackarrow/api/v1/...`
- Market Data WebSocket：`/gaia/ws/api/v1`
- Price History：`/gaia/api/v1/price-history`

---

## 2. 凭证与数据

- Sandbox 使用独立的 API 凭证（token）
- 可通过 Demo 账户获得模拟资金
- 部分产品、杠杆、风控规则可能与 Live 略有不同，以方便测试

---

## 3. 限流与差异

- Sandbox 仍然有基础限流（防止误用）
- 某些错误码（如 `429 Too Many Requests`）在测试压力时可能更易触发
- 历史数据规模可能少于 Live，仅供功能验证，不适合作为唯一回测数据源

---

## 4. 迁移建议

从 Sandbox 迁移到 Live 时：

1. 替换 Base URL 与 token  
2. 校验账户配置（杠杆、保证金要求、交易品种）  
3. 使用小规模资金进行灰度测试  
4. 建立监控与告警（API 出错率、延迟、关键业务指标）

