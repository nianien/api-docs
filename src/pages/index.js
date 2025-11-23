import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title="Zero Markets Developer Portal"
      description="Access trading & market data APIs to power your brokerage, quant strategies, and client portals."
    >
      {/* Brand Gradient Bar */}
      <div className="home-gradient-bar"></div>

      {/* Hero Section with Radial Gradient */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2" style={{textAlign: 'center'}}>
              <h1
                style={{
                  fontSize: '2.75rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#1a1f25',
                  lineHeight: '1.2',
                }}
              >
                Zero Markets Developer Portal
              </h1>
              <p
                style={{
                  fontSize: '1.25rem',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  color: '#4b5563',
                  maxWidth: '680px',
                  margin: '0 auto 2rem',
                }}
              >
                Access trading & market data APIs to power your brokerage, quant strategies, and client portals.
              </p>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem'}}>
                <Link
                  className="button button--primary button--lg home-btn-primary"
                  to="/docs/overview/intro"
                >
                  Get started
                </Link>
                <Link
                  className="button button--outline button--lg home-btn-outline"
                  to="/api"
                >
                  View API Reference
                </Link>
              </div>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#6b7280',
                  margin: 0,
                }}
              >
                REST & WebSocket · Real-time quotes · Positions & history · Sandbox environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{padding: '4rem 0', background: '#ffffff'}}>
        <div className="container">
          <div className="row">
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-icon" style={{color: '#00a86b'}}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#1a1f25',
                  }}
                >
                  Trading APIs
                </h3>
                <p
                  style={{
                    color: '#4b5563',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem',
                  }}
                >
                  Positions, history, orders. Manage account data and trading operations programmatically.
                </p>
                <Link
                  to="/docs/trading/overview"
                  className="feature-link"
                >
                  Explore Trading APIs →
                </Link>
              </div>
            </div>
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-icon" style={{color: '#00a86b'}}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#1a1f25',
                  }}
                >
                  Market Data
                </h3>
                <p
                  style={{
                    color: '#4b5563',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem',
                  }}
                >
                  Real-time quotes via WebSocket, historical price data via REST. Access global market feeds.
                </p>
                <Link
                  to="/docs/market-data/overview"
                  className="feature-link"
                >
                  Explore Market Data →
                </Link>
              </div>
            </div>
            <div className="col col--4">
              <div className="feature-card">
                <div className="feature-icon" style={{color: '#00a86b'}}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: '#1a1f25',
                  }}
                >
                  Integration & SDK
                </h3>
                <p
                  style={{
                    color: '#4b5563',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem',
                  }}
                >
                  SDK libraries, webhooks, and sandbox environment. Get started quickly with our tools.
                </p>
                <Link
                  to="/docs/integration/sdk"
                  className="feature-link"
                >
                  View SDK & Tools →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="hiw-section">
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <h2 className="hiw-title">
                How it works
              </h2>
              <div className="row" style={{marginTop: '2.5rem'}}>
                <div className="col col--4">
                  <div style={{textAlign: 'center', padding: '0 1rem'}}>
                    <div className="hiw-step-number">
                      1
                    </div>
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: '#1a1f25',
                      }}
                    >
                      Get API keys
                    </h3>
                    <p
                      style={{
                        color: '#4b5563',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        margin: 0,
                      }}
                    >
                      Obtain your API credentials from the client portal or contact support.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div style={{textAlign: 'center', padding: '0 1rem'}}>
                    <div className="hiw-step-number">
                      2
                    </div>
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: '#1a1f25',
                      }}
                    >
                      Connect to Sandbox
                    </h3>
                    <p
                      style={{
                        color: '#4b5563',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        margin: 0,
                      }}
                    >
                      Test your integration using <Link to="/docs/integration/sandbox" style={{color: '#00a86b', textDecoration: 'none'}}>sandbox endpoints</Link> and verify connectivity.
                    </p>
                  </div>
                </div>
                <div className="col col--4">
                  <div style={{textAlign: 'center', padding: '0 1rem'}}>
                    <div className="hiw-step-number">
                      3
                    </div>
                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: '#1a1f25',
                      }}
                    >
                      Go live
                    </h3>
                    <p
                      style={{
                        color: '#4b5563',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        margin: 0,
                      }}
                    >
                      Switch to production endpoints and API keys when ready.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
