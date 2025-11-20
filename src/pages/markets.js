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
    },
    {
      name: 'Indices',
      description: 'Access global stock market indices including US, European, and Asian markets.',
      pairs: ['S&P 500', 'NASDAQ', 'FTSE 100', 'DAX', 'Nikkei 225'],
      leverage: 'Up to 1:200',
    },
    {
      name: 'Commodities',
      description: 'Trade precious metals, energy, and agricultural products.',
      pairs: ['Gold', 'Silver', 'Crude Oil', 'Natural Gas', 'Wheat'],
      leverage: 'Up to 1:200',
    },
    {
      name: 'Cryptocurrencies',
      description: 'Trade popular cryptocurrencies with 24/7 market access.',
      pairs: ['BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD', 'BCH/USD'],
      leverage: 'Up to 1:100',
    },
    {
      name: 'Stocks',
      description: 'Trade shares of leading global companies.',
      pairs: ['Apple', 'Microsoft', 'Amazon', 'Google', 'Tesla'],
      leverage: 'Up to 1:20',
    },
    {
      name: 'Bonds',
      description: 'Trade government and corporate bonds from major economies.',
      pairs: ['US 10Y', 'UK 10Y', 'German 10Y', 'Japanese 10Y'],
      leverage: 'Up to 1:50',
    },
  ];

  return (
    <Layout
      title="Markets"
      description="Trade a wide range of financial instruments including Forex, Indices, Commodities, Cryptocurrencies, Stocks, and Bonds."
    >
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--12">
            <h1>Markets</h1>
            <p style={{fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem'}}>
              Zero Markets offers access to a comprehensive range of financial markets,
              allowing you to diversify your trading portfolio across multiple asset classes.
            </p>
          </div>
        </div>

        <div className="row">
          {markets.map((market) => (
            <div key={market.name} className="col col--6 margin-bottom--lg">
              <div className="api-card">
                <h2 style={{color: 'var(--ifm-color-primary)', marginBottom: '0.5rem'}}>
                  {market.name}
                </h2>
                <p style={{marginBottom: '1rem'}}>{market.description}</p>
                <div style={{marginBottom: '1rem'}}>
                  <strong>Popular Instruments:</strong>
                  <div style={{marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                    {market.pairs.map((pair) => (
                      <span
                        key={pair}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: 'var(--ifm-color-primary-lighter)',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                        }}
                      >
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Leverage:</strong> {market.leverage}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row margin-top--xl">
          <div className="col col--12">
            <div
              style={{
                padding: '2rem',
                background: 'var(--ifm-color-primary-lighter)',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <h3>Ready to Start Trading?</h3>
              <p style={{marginBottom: '1.5rem'}}>
                Open an account today and access all these markets with competitive spreads and fast execution.
              </p>
              <Link className="button button--primary button--lg" to="/account-types">
                View Account Types
              </Link>
            </div>
          </div>
        </div>

        <div className="row margin-top--lg">
          <div className="col col--12">
            <div
              style={{
                padding: '1.5rem',
                background: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: '8px',
                marginTop: '2rem',
              }}
            >
              <strong>⚠️ Risk Warning:</strong> Trading CFDs involves a high risk of loss. 
              Leverage can work both for and against you. Please ensure you fully understand 
              the risks involved and trade responsibly. Past performance is not indicative of future results.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

