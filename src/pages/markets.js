import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Markets() {
  const markets = [
    {
      name: 'Forex',
      description: 'Trade major, minor, and exotic currency pairs with competitive spreads.',
      pairs: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD'],
      leverage: 'Up to 1:500',
      icon: '💱',
    },
    {
      name: 'Indices',
      description: 'Access global stock market indices including US, European, and Asian markets.',
      pairs: ['S&P 500', 'NASDAQ', 'FTSE 100', 'DAX', 'Nikkei 225'],
      leverage: 'Up to 1:200',
      icon: '📈',
    },
    {
      name: 'Commodities',
      description: 'Trade precious metals, energy, and agricultural products.',
      pairs: ['Gold', 'Silver', 'Crude Oil', 'Natural Gas', 'Wheat'],
      leverage: 'Up to 1:200',
      icon: '⚡',
    },
    {
      name: 'Cryptocurrencies',
      description: 'Trade popular cryptocurrencies with 24/7 market access.',
      pairs: ['BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD', 'BCH/USD'],
      leverage: 'Up to 1:100',
      icon: '₿',
    },
    {
      name: 'Stocks',
      description: 'Trade shares of leading global companies.',
      pairs: ['Apple', 'Microsoft', 'Amazon', 'Google', 'Tesla'],
      leverage: 'Up to 1:20',
      icon: '📊',
    },
    {
      name: 'Bonds',
      description: 'Trade government and corporate bonds from major economies.',
      pairs: ['US 10Y', 'UK 10Y', 'German 10Y', 'Japanese 10Y'],
      leverage: 'Up to 1:50',
      icon: '📋',
    },
  ];

  return (
    <Layout
      title="Markets"
      description="Trade a wide range of financial instruments including Forex, Indices, Commodities, Cryptocurrencies, Stocks, and Bonds."
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
                Markets
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
                Zero Markets offers access to a comprehensive range of financial markets,
                allowing you to diversify your trading portfolio across multiple asset classes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Grid */}
      <section style={{padding: '3rem 0', background: '#ffffff'}}>
        <div className="container">
          <div className="row">
            {markets.map((market) => (
              <div key={market.name} className="col col--6 margin-bottom--lg">
                <div className="feature-card">
                  <div className="feature-icon" style={{color: '#00a86b'}}>
                    <span style={{fontSize: '1.75rem'}}>{market.icon}</span>
                  </div>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#1a1f25',
                    }}
                  >
                    {market.name}
                  </h2>
                  <p
                    style={{
                      color: '#4b5563',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    {market.description}
                  </p>
                  <div style={{marginBottom: '1rem'}}>
                    <strong style={{color: '#1a1f25', fontSize: '0.9rem'}}>Popular Instruments:</strong>
                    <div style={{marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                      {market.pairs.map((pair) => (
                        <span
                          key={pair}
                          style={{
                            padding: '0.35rem 0.75rem',
                            background: 'rgba(0, 168, 107, 0.08)',
                            color: '#00a86b',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                          }}
                        >
                          {pair}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{color: '#4b5563', fontSize: '0.9rem'}}>
                    <strong style={{color: '#1a1f25'}}>Leverage:</strong> {market.leverage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{padding: '3rem 0', background: '#f8fafb', borderTop: '1px solid rgba(0,0,0,0.06)'}}>
        <div className="container">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <div
                style={{
                  padding: '2.5rem',
                  background: '#ffffff',
                  borderRadius: '14px',
                  textAlign: 'center',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                }}
              >
                <h3 style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1a1f25'}}>
                  Ready to Start Trading?
                </h3>
                <p style={{color: '#4b5563', marginBottom: '1.5rem', fontSize: '1rem'}}>
                  Open an account today and access all these markets with competitive spreads and fast execution.
                </p>
                <Link className="button button--primary button--lg home-btn-primary" to="/account-types">
                  View Account Types
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section style={{padding: '2rem 0', background: '#ffffff'}}>
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <div className="zm-callout" style={{background: '#fff3cd', borderColor: '#ffc107'}}>
                <strong style={{color: '#856404'}}>⚠️ Risk Warning:</strong>{' '}
                <span style={{color: '#856404'}}>
                  Trading CFDs involves a high risk of loss. Leverage can work both for and against you. 
                  Please ensure you fully understand the risks involved and trade responsibly. 
                  Past performance is not indicative of future results.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
