---
id: auth
title: Authentication & Security
---

Zero Markets API 统一使用 **Bearer Token** 进行认证。  
包括：

- Trading 域（持仓、历史记录等）
- Market Data 域（行情 WebSocket、历史 K 线 REST）
- 未来扩展的其他服务域

---

## 1. 获取访问凭证

> 以下为通用流程，具体细节以 Zero Markets 后台实际配置为准。

1. 登录 Zero Markets 管理后台  
2. 进入 **"API Management / API 管理"** 页面  
3. 创建新的 API 凭证，配置：
   - 绑定账户 / IB 关系
   - 权限（只读 / 交易 / IB 报表）
   - 可选 IP 白名单

创建成功后，你将获得：

- `clientId`（可选）
- `token` 或获取 token 的方式（例如 OAuth2 / 内部颁发）

---

## 2. REST 请求中的认证

所有受保护的 REST 接口都需要在 Header 中携带：

```http
Authorization: Bearer <access_token>
```

示例：

```bash
curl -X GET "https://api-sandbox.zeromarkets.com/blackarrow/api/v1/positions" \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json"
```

不同服务可能有不同的 Base URL，请以具体 API 文档为准。

---

## 3. WebSocket 连接中的认证

Market Data WebSocket 在建立连接时，同样需要携带认证信息（示例）：

```
GET wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1
Authorization: Bearer <your_token>
```

或使用 query 参数（若服务端支持）：

```
wss://api-sandbox.zeromarkets.com/gaia/ws/api/v1?token=<your_token>
```

推荐使用 Header 方式，query string 方式仅在某些环境用于兼容。

---

## 4. 认证失败与常见错误码

常见 HTTP 状态码与错误：

- `401 Unauthorized`：缺少或 token 无效
- `403 Forbidden`：token 存在，但权限不足（例如只能读不能写）
- `429 Too Many Requests`：触发限流，需要调整调用频率

排查建议：

- 确认 Authorization Header 是否正确
- 检查 token 是否过期、是否对应正确环境（Sandbox / Live）
- 确认当前 API 是否支持该 token 的权限

---

## 5. 安全建议

- 不要在前端或公开仓库中硬编码 token
- 对不同业务/应用使用不同的 API 凭证，方便权限隔离与审计
- 定期轮换凭证，并及时更新配置
- 如果怀疑凭证泄露，立即在后台撤销该 token 并重新生成
