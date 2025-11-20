import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Zero Markets Developer Documentation"
      description="使用标准化的 REST API 连接 Zero Markets 交易基础设施，接入外汇、指数、商品等全球市场。"
    >
      {/* Hero Section with Gradient Background */}
      <section
        style={{
          background: 'linear-gradient(135deg, #021713 0%, #006B3C 50%, #00C46B 100%)',
          padding: '4rem 0',
          marginBottom: '4rem',
        }}
      >
        <div className="container">
          <div className="row">
            {/* Left: Hero Content */}
            <div className="col col--7">
              <h1
                style={{
                  color: '#ffffff',
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  lineHeight: '1.2',
                }}
              >
                Zero Markets Developer Portal
              </h1>
              <p
                style={{
                  fontSize: '1.2rem',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                使用标准化的 REST 与 WebSocket API 连接 Zero Markets 交易基础设施，接入外汇、指数、商品等全球市场。
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '2rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <li style={{marginBottom: '0.75rem', fontSize: '1.05rem'}}>
                  ✅ 统一账户与订单模型
                </li>
                <li style={{marginBottom: '0.75rem', fontSize: '1.05rem'}}>
                  ✅ 实盘 & 模拟环境
                </li>
                <li style={{marginBottom: '0.75rem', fontSize: '1.05rem'}}>
                  ✅ 清晰的风控与合规指引
                </li>
              </ul>
              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/intro"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#006B3C',
                    border: 'none',
                    fontWeight: '600',
                  }}
                >
                  快速开始
                </Link>
                <Link
                  className="button button--outline button--lg"
                  to="/api"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: '#ffffff',
                  }}
                >
                  查看 API 参考
                </Link>
              </div>
            </div>

            {/* Right: Market Data Cards */}
            <div className="col col--5">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Market Data Card 1 */}
                <div
                  className="api-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <span style={{fontSize: '1.5rem', marginRight: '0.5rem'}}>📈</span>
                    <h4 style={{margin: 0, color: '#006B3C'}}>EURUSD</h4>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem'}}>
                    <div>
                      <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Bid</div>
                      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#16a34a'}}>
                        1.08650
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Ask</div>
                      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#ef4444'}}>
                        1.08655
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280'}}>
                    +0.12% (24h)
                  </div>
                </div>

                {/* Market Data Card 2 */}
                <div
                  className="api-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <span style={{fontSize: '1.5rem', marginRight: '0.5rem'}}>🥇</span>
                    <h4 style={{margin: 0, color: '#006B3C'}}>XAUUSD</h4>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem'}}>
                    <div>
                      <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Bid</div>
                      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#16a34a'}}>
                        2,045.30
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Ask</div>
                      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#ef4444'}}>
                        2,045.50
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280'}}>
                    +0.35% (24h)
                  </div>
                </div>

                {/* Market Data Card 3 */}
                <div
                  className="api-card"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <span style={{fontSize: '1.5rem', marginRight: '0.5rem'}}>📊</span>
                    <h4 style={{margin: 0, color: '#006B3C'}}>GBPUSD</h4>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem'}}>
                    <div>
                      <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Bid</div>
                      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#16a34a'}}>
                        1.26420
                      </div>
                    </div>
                    <div>
                      <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Ask</div>
                      <div style={{fontSize: '1.25rem', fontWeight: '600', color: '#ef4444'}}>
                        1.26425
                      </div>
                    </div>
                  </div>
                  <div style={{marginTop: '0.5rem', fontSize: '0.8rem', color: '#6b7280'}}>
                    -0.08% (24h)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        {/* 核心入口卡片 */}
        <section className="row margin-bottom--xl">
          <div className="col col--12">
            <h2 style={{marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600'}}>
              核心入口
            </h2>
          </div>
          <div className="col col--4">
            <div className="api-card" style={{height: '100%'}}>
              <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>
                🚀 Quick Start
              </h3>
              <p style={{marginBottom: '1rem'}}>
                从获取 API 凭证，到发出第一笔持仓查询或行情订阅的完整流程。
              </p>
              <Link
                className="button button--sm button--primary margin-top--sm"
                to="/docs/auth"
              >
                了解认证方式 →
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className="api-card" style={{height: '100%'}}>
              <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>
                📘 Trading
              </h3>
              <p style={{marginBottom: '1rem'}}>
                访问账户持仓、成交历史等核心交易数据。
              </p>
              <Link
                className="button button--sm button--outline margin-top--sm"
                to="/docs/domains/trading/overview"
              >
                查看 Trading 域文档 →
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className="api-card" style={{height: '100%'}}>
              <h3 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>
                📈 Market Data
              </h3>
              <p style={{marginBottom: '1rem'}}>
                通过 WebSocket 订阅实时行情，通过 REST 获取历史 K 线。
              </p>
              <Link
                className="button button--sm button--outline margin-top--sm"
                to="/docs/domains/market-data/overview"
              >
                查看行情文档 →
              </Link>
            </div>
          </div>
        </section>

        {/* 工具与资源 */}
        <section className="row margin-bottom--xl">
          <div className="col col--12">
            <h2 style={{marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600'}}>
              工具与资源
            </h2>
          </div>
          <div className="col col--6">
            <div className="api-card">
              <h4 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>
                📦 SDK & 示例代码
              </h4>
              <p style={{marginBottom: '1rem'}}>
                常见语言调用模板（Python/Java/Node 等），便于快速集成。
              </p>
              <Link to="/docs/integration/sdk">查看 SDK 文档 →</Link>
            </div>
          </div>
          <div className="col col--6">
            <div className="api-card">
              <h4 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.75rem'}}>
                🧪 Sandbox / Demo 环境
              </h4>
              <p style={{marginBottom: '1rem'}}>
                如何创建模拟账户、环境域名、限流与差异说明。
              </p>
              <Link to="/docs/integration/sandbox">查看 Sandbox 文档 →</Link>
            </div>
          </div>
        </section>

        {/* 支持与风险提示 */}
        <section className="row">
          <div className="col col--12">
            <div
              className="zm-callout"
              style={{
                marginTop: '2rem',
                padding: '1.5rem',
              }}
            >
              <p style={{marginBottom: '0.5rem'}}>
                <strong>技术支持：</strong>
                <Link href="mailto:api-support@zeromarkets.com">api-support@zeromarkets.com</Link>
              </p>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                <strong>风险提示：</strong>FX and CFDs trading involves a high risk of loss and may not be suitable for all investors.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
