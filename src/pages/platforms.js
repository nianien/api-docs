import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Platforms() {
  const platforms = [
    {
      name: 'MetaTrader 4',
      shortName: 'MT4',
      description: 'The world\'s most popular trading platform, trusted by millions of traders worldwide.',
      features: [
        'Advanced charting with 30+ built-in indicators',
        'Expert Advisors (EA) for automated trading',
        'Mobile trading apps for iOS and Android',
        'One-click trading and pending orders',
        'Real-time market news and analysis',
        'Multi-language support',
      ],
      downloadLinks: {
        windows: 'https://download.mql5.com/cdn/web/zeromarkets/mt4/zeromarkets4setup.exe',
        mac: 'https://download.mql5.com/cdn/web/zeromarkets/mt4/zeromarkets4.dmg',
        android: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4',
        ios: 'https://apps.apple.com/app/metatrader-4/id496212596',
      },
      icon: '📊',
    },
    {
      name: 'MetaTrader 5',
      shortName: 'MT5',
      description: 'The next-generation trading platform with enhanced features and capabilities.',
      features: [
        '21 timeframes and 38+ technical indicators',
        'Built-in economic calendar',
        'Depth of Market (DOM)',
        'Multi-asset trading (Forex, Stocks, Futures)',
        'MQL5 programming language',
        'Strategy Tester for backtesting',
      ],
      downloadLinks: {
        windows: 'https://download.mql5.com/cdn/web/zeromarkets/mt5/zeromarkets5setup.exe',
        mac: 'https://download.mql5.com/cdn/web/zeromarkets/mt5/zeromarkets5.dmg',
        android: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5',
        ios: 'https://apps.apple.com/app/metatrader-5/id413251709',
      },
      icon: '🚀',
    },
    {
      name: 'WebTrader',
      shortName: 'Web',
      description: 'Trade directly from your browser - no download required.',
      features: [
        'No installation required',
        'Access from any device with a browser',
        'Real-time quotes and charts',
        'Full trading functionality',
        'Responsive design for mobile and desktop',
        'Secure SSL encryption',
      ],
      downloadLinks: {
        web: 'https://webtrader.zeromarkets.com',
      },
      icon: '🌐',
    },
    {
      name: 'API Trading',
      shortName: 'API',
      description: 'Programmatic access to trading functionality via REST API or FIX protocol.',
      features: [
        'REST API for easy integration',
        'FIX protocol for professional traders',
        'Real-time market data streaming',
        'Order management and execution',
        'Account information and history',
        'Comprehensive documentation',
      ],
      downloadLinks: {
        docs: '/api',
        rest: '/docs/overview/intro',
      },
      icon: '⚙️',
    },
  ];

  return (
    <Layout
      title="Trading Platforms"
      description="Choose from MetaTrader 4, MetaTrader 5, WebTrader, or API trading. All platforms offer fast execution and advanced trading tools."
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
                Trading Platforms
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
                Zero Markets offers multiple trading platforms to suit your trading style and preferences.
                Whether you prefer desktop software, mobile apps, web-based trading, or programmatic access,
                we have the right solution for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Grid */}
      <section style={{padding: '3rem 0', background: '#ffffff'}}>
        <div className="container">
          <div className="row">
            {platforms.map((platform) => (
              <div key={platform.name} className="col col--6 margin-bottom--lg">
                <div className="feature-card">
                  <div className="feature-icon" style={{color: '#00a86b'}}>
                    <span style={{fontSize: '1.75rem'}}>{platform.icon}</span>
                  </div>
                  <div style={{marginBottom: '1rem'}}>
                    <h2
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: '#1a1f25',
                      }}
                    >
                      {platform.name}
                    </h2>
                    <span
                      style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        fontWeight: '500',
                      }}
                    >
                      {platform.shortName}
                    </span>
                  </div>
                  <p
                    style={{
                      color: '#4b5563',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    {platform.description}
                  </p>
                  <div style={{marginBottom: '1.5rem'}}>
                    <strong style={{color: '#1a1f25', fontSize: '0.9rem', display: 'block', marginBottom: '0.75rem'}}>Key Features:</strong>
                    <ul style={{margin: 0, paddingLeft: '1.5rem', color: '#4b5563', fontSize: '0.9rem', lineHeight: '1.8'}}>
                      {platform.features.map((feature, idx) => (
                        <li key={idx} style={{marginBottom: '0.4rem'}}>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto'}}>
                    {Object.entries(platform.downloadLinks).map(([platformName, url]) => (
                      <Link
                        key={platformName}
                        className="button button--outline button--sm home-btn-outline"
                        to={url}
                        href={url.startsWith('http') ? url : undefined}
                        style={{fontSize: '0.85rem'}}
                      >
                        {platformName === 'web' ? 'Launch WebTrader' :
                         platformName === 'docs' ? 'View API Docs' :
                         platformName === 'rest' ? 'REST API' :
                         `Download for ${platformName.charAt(0).toUpperCase() + platformName.slice(1)}`}
                      </Link>
                    ))}
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
                  Need Help Choosing a Platform?
                </h3>
                <p style={{color: '#4b5563', marginBottom: '1.5rem', fontSize: '1rem'}}>
                  Our support team can help you select the best platform for your trading needs.
                </p>
                <Link className="button button--primary button--lg home-btn-primary" href="mailto:support@zeromarkets.com">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
