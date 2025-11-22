---
id: intro
title: Introduction
sidebar_label: Intro
---

import Link from '@docusaurus/Link';

# Zero Markets Developer Portal

欢迎来到 **Zero Markets 开发者文档站**。  
这里是你连接 Zero Markets 交易与行情基础设施、接入全球市场的入口。

> 使用标准化的 REST 与 WebSocket API 获取账户、持仓、成交、行情与历史数据。  
> **风险提示：** FX and CFDs trading involves a high risk of loss and may not be suitable for all investors.

---

## 快速入口

<div className="row margin-top--md">
  <div className="col col--4">
    <div className="api-card" style={{height: '100%'}}>
      <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>🚀 Quick Start</h3>
      <p style={{marginBottom: '1rem'}}>从获取 API 凭证，到发出第一笔持仓查询或行情订阅。</p>
      <Link className="button button--sm button--primary margin-top--sm" to="/docs/overview/authentication">
        了解认证方式 →
      </Link>
    </div>
  </div>
  <div className="col col--4">
    <div className="api-card" style={{height: '100%'}}>
      <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>📘 Trading</h3>
      <p style={{marginBottom: '1rem'}}>访问账户持仓、成交历史等核心交易数据。</p>
      <Link className="button button--sm button--outline margin-top--sm" to="/docs/trading/overview">
        查看 Trading 文档 →
      </Link>
    </div>
  </div>
  <div className="col col--4">
    <div className="api-card" style={{height: '100%'}}>
      <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>📈 Market Data</h3>
      <p style={{marginBottom: '1rem'}}>通过 WebSocket 订阅实时行情，通过 REST 获取历史 K 线。</p>
      <Link className="button button--sm button--outline margin-top--sm" to="/docs/market-data/overview">
        查看行情文档 →
      </Link>
    </div>
  </div>
</div>

---

## 文档结构说明

<div className="row margin-top--md">
  <div className="col col--6">
    <div className="api-card">
      <h4 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>📚 文档分类</h4>
      <ul>
        <li><strong>Overview</strong>：总览与统一认证（<Link to="/docs/overview/intro">intro</Link>, <Link to="/docs/overview/authentication">authentication</Link>, <Link to="/docs/overview/architecture">architecture</Link>）</li>
        <li><strong>Trading</strong>：持仓、成交历史等交易相关数据</li>
        <li><strong>Market Data</strong>：实时行情与历史 K 线</li>
        <li><strong>Integration</strong>：Sandbox 环境、Webhooks 设计、SDK 与示例代码</li>
        <li><strong>Changelog</strong>：重要变更记录</li>
      </ul>
    </div>
  </div>
  <div className="col col--6">
    <div className="api-card">
      <h4 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>🔗 快速链接</h4>
      <ul>
        <li><Link to="/api">API Reference 概览</Link></li>
        <li><Link to="/api/trading/positions">Positions API</Link></li>
        <li><Link to="/api/trading/history">Trading History API</Link></li>
        <li><Link to="/api/market-data/websocket">Market Data WebSocket</Link></li>
        <li><Link to="/api/market-data/price-history">Price History API</Link></li>
      </ul>
    </div>
  </div>
</div>

---

## 技术支持

如需技术支持，请联系：<Link href="mailto:api-support@zeromarkets.com">api-support@zeromarkets.com</Link>

