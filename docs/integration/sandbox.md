---
id: sandbox
title: Sandbox / Demo Environment
---

Zero Markets 提供 Sandbox / Demo 环境，用于无风险测试集成与验证逻辑。

---

## 1. 环境对比（示意）

| 环境    | Base URL 示例                          | 说明                     |
|---------|----------------------------------------|--------------------------|
| Sandbox | `https://api-sandbox.zeromarkets.com`  | 模拟环境，不涉及真实资金 |
| Live    | `https://api.zeromarkets.com`          | 实盘环境，连接真实账户   |

各子服务在 Sandbox/Live 下有自己的前缀，例如：

- Trading：`/blackarrow/api/v1/...`  
- Market Data WebSocket：`/gaia/ws/api/v1`  
- Price History：`/gaia/api/v1/price-history`  

---

## 2. 凭证与测试数据

- Sandbox 环境使用独立的访问 Token  
- 可为 Sandbox 创建 Demo 账户并注入测试资金  
- 部分产品、杠杆、交易限制可能弱化，仅用于功能验证

---

## 3. 限流与差异

- Sandbox 依然有基础限流（防止脚本误用）  
- 历史数据规模可能少于 Live，不适合作为唯一回测数据源  
- 某些错误码在 Sandbox 中可能更易复现，方便调试

---

## 4. 迁移建议

从 Sandbox 迁移到 Live 时：

1. 替换 Base URL 与 Token  
2. 校验实盘账户配置（杠杆、保证金要求、交易品种）  
3. 使用小规模资金进行灰度测试  
4. 建立监控与告警（API 出错率、延迟、PnL 异常）

> 推荐先在 Sandbox 完成功能联调与自动化测试，再以渐进方式迁移到 Live。
