---
id: errors
title: Error Codes & Conventions
---

本章节定义 Zero Markets API 的通用错误码与错误处理约定，  
用于在不同域（Trading / Market Data）之间对齐行为和排查方式。

---

## 1. HTTP 状态码约定

| 状态码 | 含义                          | 示例场景                                           |
|--------|-------------------------------|----------------------------------------------------|
| 200    | 成功                          | 请求成功，返回业务数据                             |
| 201    | 成功创建                      | 某些写入操作成功创建资源（如未来下单类接口）       |
| 400    | Bad Request 参数错误          | 必填字段缺失、格式不合法、时间范围不正确等         |
| 401    | Unauthorized 未认证           | 缺少或无效的 Bearer Token                          |
| 403    | Forbidden 无权限              | token 有效但没有访问该账户 / 产品的权限            |
| 404    | Not Found 未找到资源          | 请求的资源不存在（如账号不存在 / symbol 未注册）  |
| 409    | Conflict 冲突                 | 请求与当前资源状态冲突（如重复提交、状态不允许）   |
| 429    | Too Many Requests 触发限流    | 短时间内请求过多                                   |
| 500    | Internal Server Error 服务错误 | 未预期的内部异常                                   |
| 503    | Service Unavailable 暂时不可用 | 系统维护 / 部分服务降级                            |

---

## 2. 通用错误响应格式

不同服务可能有略微差异，但推荐统一为类似结构：

```json
{
  "code": "TRADE_40101",
  "message": "Invalid or expired token",
  "traceId": "e8a7d5c3-9b2c-4cd6-9e12-1234567890ab",
  "details": {
    "field": "Authorization",
    "reason": "missing or malformed"
  }
}
```

推荐字段说明：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| code | string | 业务错误码，建议包含域前缀，如 `TRADE_...` |
| message | string | 人类可读的错误信息（英文），适合日志/看板展示 |
| traceId | string | 请求追踪 ID，便于与 Zero Markets 支持人员对齐 |
| details | object | 结构化错误详情（可选） |

---

## 3. 常见错误码示例

### 3.1 认证与权限

| code | HTTP | 说明 |
|------|------|------|
| AUTH_40101 | 401 | Token 缺失或格式不正确 |
| AUTH_40102 | 401 | Token 过期 |
| AUTH_40301 | 403 | Token 无该账户访问权限 |
| AUTH_40302 | 403 | Token 无访问该产品 / 市场权限 |

### 3.2 参数与请求格式

| code | HTTP | 说明 |
|------|------|------|
| REQ_40001 | 400 | 必填参数缺失 |
| REQ_40002 | 400 | 参数格式错误（类型 / 范围等） |
| REQ_40003 | 400 | 时间范围非法（from > to 等） |

### 3.3 限流与频率控制

| code | HTTP | 说明 |
|------|------|------|
| LIMIT_42901 | 429 | 单 IP 触发限流 |
| LIMIT_42902 | 429 | 单账户 / 单 token 调用频率超限 |

> 实际错误码列表请以 Zero Markets 内部规范与实现为准，本章节作为设计与约定的统一参考。

---

## 4. 客户端错误处理建议

- **按 HTTP 状态码区分处理逻辑**：
  - 4xx：检查参数 / 权限 / 配置
  - 5xx：合理次数（如 3 次以内）重试 + 记录日志
  - 429：根据响应头或策略设置退避重试
- **将 `code` 与 `traceId` 一并记录日志**，遇到问题时提供给 Zero Markets 支持团队，有利于快速排查
- **SDK 封装层建议统一转换为**：
  - 例如抛出 `ZeroMarketsApiException`，其中包含：
    - `httpStatus`
    - `code`
    - `message`
    - `traceId`
    - `rawResponse`

---

## 5. 与各域的对齐

Trading / Market Data / 未来其他域应尽量遵循本章节约定：

- 使用一致的 HTTP 状态码语义
- 对关键业务错误使用清晰稳定的 `code` 前缀
- 在错误响应中携带 `traceId`，保证端到端可追踪性
