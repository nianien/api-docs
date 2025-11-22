---
id: authentication
title: Authentication & Security
---

Zero Markets API 统一使用 **Bearer Token** 进行认证，适用于：

- Trading 域（持仓、交易历史等）
- Market Data 域（WebSocket 行情、历史价格）
- 将来扩展的其他服务域

---

## 1. 获取访问凭证

> 以下为通用流程，实际以 Zero Markets 客户后台为准。

1. 登录 Zero Markets 客户 / 合作方后台  
2. 进入 **"API Management / API 管理"** 页面  
3. 创建新的 API 凭证，配置：
   - 绑定账户或 IB 关系
   - 权限（读 / 写 / 报表）
   - 可选 IP 白名单

创建成功后，你将获得用于请求的 **访问 Token**，后文用 `<access_token>` 表示。

---

## 2. REST 请求中的认证

所有受保护的 REST 接口必须在 Header 中携带：

```http
Authorization: Bearer <access_token>
```

示例（Positions API）：

```bash
curl -X GET "https://api-sandbox.zeromarkets.com/blackarrow/api/v1/positions" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

---

## 3. WebSocket 连接中的认证

Market Data WebSocket 建立连接时同样需要认证：

```
GET wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1
Authorization: Bearer <access_token>
```

或（如服务器支持）：

```
wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1?token=<access_token>
```

推荐使用 Header 方式，query string 仅用于兼容。

---

## 4. 认证失败与常见错误码

常见 HTTP 状态码：

- `401 Unauthorized`：缺少或 token 无效
- `403 Forbidden`：token 存在但权限不足
- `429 Too Many Requests`：触发限流

排查建议：

- 确认请求中是否包含 `Authorization: Bearer ...`
- 检查 token 是否过期、是否为对应环境（Sandbox / Live）
- 确认当前 API 是否授予了对应权限（如读取交易历史）

---

## 5. 安全建议

- 不要在前端或公开仓库中硬编码 token
- 对不同系统 / 应用使用不同 API 凭证，方便权限隔离和审计
- 建议为高风险操作启用 IP 白名单
- 定期轮换 token，如果怀疑泄露，立即在后台撤销并重建
