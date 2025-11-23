import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// 从 docusaurus.config.js 的 customFields 中获取 specs
function useRedocSpecs() {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.customFields.redocSpecs || [];
}

function groupByDomain(specs) {
  const map = {};
  for (const s of specs) {
    if (!map[s.domain]) map[s.domain] = [];
    map[s.domain].push(s);
  }
  Object.values(map).forEach((list) =>
    list.sort((a, b) => a.name.localeCompare(b.name))
  );
  return map;
}

function toTitle(domain) {
  return domain
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export default function ApiOverviewPage() {
  const specs = useRedocSpecs();
  const grouped = groupByDomain(specs);
  const domains = Object.keys(grouped).sort();

  return (
    <Layout
      title="API Reference"
      description="Zero Markets API Reference - Complete API documentation for Trading and Market Data domains."
    >
      {/* Brand Gradient Bar */}
      <div className="home-gradient-bar"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1" style={{textAlign: 'center'}}>
              <h1
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#1a1f25',
                  lineHeight: '1.2',
                }}
              >
                API Reference
              </h1>
              <p
                style={{
                  fontSize: '1.15rem',
                  lineHeight: '1.6',
                  marginBottom: '0',
                  color: '#4b5563',
                  maxWidth: '720px',
                  margin: '0 auto',
                }}
              >
                Complete API documentation organized by domain. Each API specification is available as an interactive Redoc page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Domains */}
      <section style={{padding: '3rem 0', background: '#ffffff'}}>
        <div className="container">
          {domains.map((domain) => {
            const list = grouped[domain];
            return (
              <div key={domain} style={{marginBottom: '3rem'}}>
                <h2
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem',
                    color: '#1a1f25',
                  }}
                >
                  {toTitle(domain)}
                </h2>
                <div className="row">
                  {list.map((s) => (
                    <div key={s.id} className="col col--6 margin-bottom--lg">
                      <div className="feature-card">
                        <h3
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem',
                            color: '#1a1f25',
                          }}
                        >
                          {s.label}
                        </h3>
                        <div style={{marginBottom: '1rem'}}>
                          <div style={{marginBottom: '0.5rem', fontSize: '0.85rem'}}>
                            <strong style={{color: '#1a1f25'}}>File:</strong>{' '}
                            <code style={{
                              background: 'rgba(0, 168, 107, 0.08)',
                              color: '#00a86b',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                            }}>{s.spec}</code>
                          </div>
                          <div style={{fontSize: '0.85rem'}}>
                            <strong style={{color: '#1a1f25'}}>Route:</strong>{' '}
                            <code style={{
                              background: 'rgba(0, 168, 107, 0.08)',
                              color: '#00a86b',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                            }}>{s.route}</code>
                          </div>
                        </div>
                        <Link
                          className="button button--primary home-btn-primary"
                          to={s.route}
                        >
                          Open API Documentation
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
