---
id: trading-model
title: Orders & Positions Model
---

本章节描述 Zero Markets Trading API 中使用的 **账户、订单与持仓数据模型**。  
理解这些模型有助于你正确地管理交易生命周期。

---

## 1. 账户模型（Account）

示例字段：

```json
{
  "accountId": "123456",
  "currency": "USD",
  "leverage": 100,
  "balance": 10000.0,
  "equity": 10120.5,
  "marginUsed": 500.0,
  "marginFree": 9620.5,
  "status": "ACTIVE"
}
```

关键字段说明：

- `balance`：账户余额，不含浮动盈亏
- `equity`：账户净值 = 余额 + 浮动盈亏
- `marginUsed`：当前使用的保证金
- `marginFree`：可用保证金（可用于开新仓）

---

## 2. 产品 / 合约模型（Instrument / Symbol）

示例：

```json
{
  "symbol": "EURUSD",
  "type": "FOREX",
  "baseCurrency": "EUR",
  "quoteCurrency": "USD",
  "contractSize": 100000,
  "pipValue": 0.0001,
  "minTradeSize": 1000,
  "maxTradeSize": 10000000,
  "stepSize": 1000
}
```

---

## 3. 订单模型（Order）

订单是「你希望在什么价格以什么方向、什么数量交易」的指令。

```json
{
  "orderId": "78910",
  "clientOrderId": "my-strategy-001",
  "accountId": "123456",
  "symbol": "EURUSD",
  "side": "BUY",
  "type": "MARKET",
  "status": "FILLED",
  "price": 1.08650,
  "avgFillPrice": 1.08652,
  "quantity": 10000,
  "filledQuantity": 10000,
  "timeInForce": "IOC",
  "createdAt": "2024-03-01T09:30:00Z",
  "updatedAt": "2024-03-01T09:30:01Z"
}
```

### 3.1 订单类型（type）

- `MARKET`：市价单
- `LIMIT`：限价单
- `STOP`：止损单
- `STOP_LIMIT`：止损限价单

### 3.2 订单状态（status）

- `NEW`：已创建，等待进入撮合 / 执行
- `PARTIALLY_FILLED`：部分成交
- `FILLED`：完全成交
- `CANCELLED`：已被取消
- `REJECTED`：被拒绝（资金不足、超出限制等）

建议客户端基于状态机处理订单变化，而不是仅依赖单次查询结果。

---

## 4. 持仓模型（Position）

持仓表示某个账户在某个品种上的净头寸。

```json
{
  "positionId": "pos-001",
  "accountId": "123456",
  "symbol": "EURUSD",
  "side": "LONG",
  "quantity": 30000,
  "avgPrice": 1.08600,
  "unrealizedPnl": 45.3,
  "realizedPnl": 12.0,
  "marginUsed": 300.0,
  "openedAt": "2024-03-01T09:15:00Z"
}
```

说明：

- 一系列订单可能汇总成一个持仓
- `quantity` 可能因为部分平仓而减少
- 根据产品规则，可能支持「多头/空头分开持仓」或「净额持仓」

---

## 5. 订单与持仓关系示例

1. BUY 10k EURUSD @ 1.0860  → 新增多头持仓 10k
2. BUY 20k EURUSD @ 1.0870  → 持仓变为 30k，平均价 1.08666...
3. SELL 5k EURUSD @ 1.0880  → 持仓变为 25k，部分平仓产生已实现盈亏

系统内部典型计算逻辑（示意）：

```
新均价 = (原数量 * 原均价 + 新增数量 * 新成交价) / 新总数量
浮动盈亏 = (当前价格 - 均价) * quantity * 合约大小 / 汇率换算
```

---

## 6. REST 接口与模型的映射

在 OpenAPI（/api/trading）中，你可以找到以下典型接口：

- `GET /v1/accounts/{accountId}`
- `GET /v1/accounts/{accountId}/positions`
- `GET /v1/accounts/{accountId}/orders`
- `POST /v1/orders`（创建订单）
- `POST /v1/orders/{orderId}/cancel`（撤单）

每个接口的请求/响应结构均在 Trading API Reference 中定义。

本章节提供的是概念与字段含义，推荐配套阅读实际接口文档一起理解。
