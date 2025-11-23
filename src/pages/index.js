import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function Hero() {
  return (
    <section className="zm-hero-section">
      <div className="container zm-hero-container zm-hero-split">
        <div className="zm-hero-left">
          <div className="zm-hero-badge">Developer Portal</div>

          <h1 className="zm-hero-title">Zero Markets APIs for trading & data</h1>

          <p className="zm-hero-subtitle">
            Integrate trading accounts, real-time market data and account
            insights into your own platforms, quant strategies and client
            portals.
          </p>

          <div className="zm-hero-actions">
            <Link
              className="button zm-btn-primary"
              to="/docs/overview/quickstart"
            >
              Get started
            </Link>
            <Link
              className="button button--outline zm-btn-secondary"
              to="/api"
            >
              View API Reference
            </Link>
          </div>

          <div className="zm-hero-metas">
            <span>REST &amp; WebSocket</span>
            <span>Trading &amp; Market Data</span>
            <span>Sandbox environment</span>
          </div>
        </div>

        <div className="zm-hero-right">
          <div className="zm-hero-card">
            <div className="zm-hero-card-header">
              <span className="zm-hero-card-title">Quick snapshot</span>
              <span className="zm-hero-card-pill">Sandbox</span>
            </div>
            <pre className="zm-hero-code">
{`GET /v1/market-data/quotes?symbol=XAUUSD

200 OK
{
  "symbol": "XAUUSD",
  "bid": 2419.35,
  "ask": 2419.87,
  "timestamp": "2024-03-10T02:15:23Z"
}`}
            </pre>
            <div className="zm-hero-card-footer">
              Powered by Zero Markets Market Data &amp; Trading APIs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  linkLabel,
  to,
}) {
  return (
    <div className="zm-feature-card">
      <div className="zm-feature-icon">{icon}</div>
      <h3 className="zm-feature-title">{title}</h3>
      <p className="zm-feature-desc">{description}</p>
      <Link className="zm-feature-link" to={to}>
        {linkLabel} →
      </Link>
    </div>
  );
}

function Features() {
  return (
    <section className="zm-feature-section">
      <div className="container">
        <div className="zm-feature-grid">
          <FeatureCard
            icon={<span className="zm-emoji">🧭</span>}
            title="Trading APIs"
            description="Access positions and history to manage client accounts and build trading workflows programmatically."
            linkLabel="Explore Trading APIs"
            to="/docs/trading/overview"
          />
          <FeatureCard
            icon={<span className="zm-emoji">📊</span>}
            title="Market Data"
            description="Real-time quotes via WebSocket and historical price data via REST. Build charts, screeners and quant signals."
            linkLabel="Explore Market Data"
            to="/docs/market-data/overview"
          />
          <FeatureCard
            icon={<span className="zm-emoji">🧩</span>}
            title="Integration & SDK"
            description="SDKs, webhooks and sandbox environment to help you ship faster with Zero Markets APIs."
            linkLabel="View SDK & Tools"
            to="/docs/integration/sdk"
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="zm-hiw-section">
      <div className="container">
        <h2 className="zm-hiw-title">How it works</h2>
        <p className="zm-hiw-subtitle">
          A simple flow from sandbox testing to live trading.
        </p>

        <div className="zm-hiw-steps">
          <div className="zm-hiw-step">
            <div className="zm-hiw-step-index">01</div>
            <h3>Get access</h3>
            <p>
              Request API access from your Zero Markets account manager and
              obtain sandbox credentials.
            </p>
          </div>

          <div className="zm-hiw-step">
            <div className="zm-hiw-step-index">02</div>
            <h3>Connect to sandbox</h3>
            <p>
              Integrate Market Data and Trading APIs, validate flows and risk
              checks without impacting real accounts.
            </p>
          </div>

          <div className="zm-hiw-step">
            <div className="zm-hiw-step-index">03</div>
            <h3>Go live</h3>
            <p>
              Switch to production endpoints, rotate credentials and start
              serving real clients with monitored, high-availability APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Zero Markets Developer Portal"
      description="Access trading & market data APIs from Zero Markets."
    >
      <Hero />
      <Features />
      <HowItWorks />
    </Layout>
  );
}
