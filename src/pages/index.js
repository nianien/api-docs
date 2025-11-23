import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function Hero() {
  return (
    <>
      <section className="zm-hero-section">
        <div className="container zm-hero-container">
          <div className="zm-hero-badge">Developer Portal</div>

          <h1 className="zm-hero-title">Zero Markets Developer Portal</h1>

          <p className="zm-hero-subtitle">
            Access trading &amp; market data APIs to power your brokerage,
            quant strategies, and client portals.
          </p>

          <div className="zm-hero-actions">
            <Link
              className="button zm-btn-primary"
              to="/docs/overview/intro"
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

          <p className="zm-hero-meta">
            REST &amp; WebSocket · Real-time quotes · Positions &amp; history ·
            Sandbox environment
          </p>
        </div>
      </section>
    </>
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
            description="Real-time quotes via WebSocket, and historical price data via REST. Build charts, screeners and quant signals."
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
              Request API access from your Zero Markets account manager and obtain
              your sandbox credentials.
            </p>
          </div>

          <div className="zm-hiw-step">
            <div className="zm-hiw-step-index">02</div>
            <h3>Connect to sandbox</h3>
            <p>
              Integrate with Market Data and Trading APIs in the sandbox
              environment, validate your flows and risk checks.
            </p>
          </div>

          <div className="zm-hiw-step">
            <div className="zm-hiw-step-index">03</div>
            <h3>Go live</h3>
            <p>
              Switch to production endpoints, rotate credentials and start serving
              real clients with monitored, high-availability APIs.
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
