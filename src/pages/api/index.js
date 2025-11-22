import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function ApiIndex() {
  return (
    <Layout
      title="API Reference"
      description="Zero Markets API Reference - Complete OpenAPI documentation for Trading and Market Data APIs"
    >
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--12">
            <h1>API Reference</h1>
            <p style={{fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2rem'}}>
              完整的 OpenAPI 规范文档，包含所有接口的请求参数、响应格式、错误码和示例。
            </p>
          </div>
        </div>

        {/* Trading APIs */}
        <div className="row margin-bottom--xl">
          <div className="col col--12">
            <h2>Trading APIs</h2>
            <p>账户持仓、交易历史等交易相关数据接口</p>
          </div>
          <div className="col col--6 margin-top--md">
            <div className="api-card" style={{height: '100%'}}>
              <h3>Positions API</h3>
              <p>查询账户当前持仓与风险视图，支持多账户、多品种查询。</p>
              <ul>
                <li>账户持仓查询</li>
                <li>风险敞口统计</li>
                <li>分页与过滤</li>
              </ul>
              <Link className="button button--primary margin-top--sm" to="/api/trading/positions">
                查看 API 文档 →
              </Link>
            </div>
          </div>
          <div className="col col--6 margin-top--md">
            <div className="api-card" style={{height: '100%'}}>
              <h3>Trading History API</h3>
              <p>查询账户历史交易记录、成交明细与报表数据。</p>
              <ul>
                <li>历史成交查询</li>
                <li>IB 返佣报表</li>
                <li>时间范围过滤</li>
              </ul>
              <Link className="button button--primary margin-top--sm" to="/api/trading/history">
                查看 API 文档 →
              </Link>
            </div>
          </div>
        </div>

        {/* Market Data APIs */}
        <div className="row margin-bottom--xl">
          <div className="col col--12">
            <h2>Market Data APIs</h2>
            <p>实时行情与历史价格数据接口</p>
          </div>
          <div className="col col--6 margin-top--md">
            <div className="api-card" style={{height: '100%'}}>
              <h3>WebSocket API</h3>
              <p>实时行情推送，支持多品种订阅、心跳与重连机制。</p>
              <ul>
                <li>实时 tick 推送</li>
                <li>多品种订阅</li>
                <li>心跳与重连</li>
              </ul>
              <Link className="button button--primary margin-top--sm" to="/api/market-data/websocket">
                查看 API 文档 →
              </Link>
            </div>
          </div>
          <div className="col col--6 margin-top--md">
            <div className="api-card" style={{height: '100%'}}>
              <h3>Price History API</h3>
              <p>历史 K 线数据查询，支持多周期、时间范围查询。</p>
              <ul>
                <li>多周期 K 线</li>
                <li>时间范围查询</li>
                <li>批量数据获取</li>
              </ul>
              <Link className="button button--primary margin-top--sm" to="/api/market-data/price-history">
                查看 API 文档 →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="row">
          <div className="col col--12">
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--ifm-color-primary-lighter)',
                borderRadius: '8px',
                marginTop: '2rem',
              }}
            >
              <h3>快速开始</h3>
              <p>
                首次使用 API？建议先阅读：
              </p>
              <ul>
                <li><Link to="/docs/overview/authentication">认证与安全</Link> - 了解如何获取和使用 API 凭证</li>
                <li><Link to="/docs/integration/sandbox">Sandbox 环境</Link> - 在测试环境中验证集成</li>
                <li><Link to="/docs/integration/sdk">SDK 与示例代码</Link> - 查看代码示例和最佳实践</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

