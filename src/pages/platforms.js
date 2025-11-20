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
        docs: '/api/trading',
        rest: '/docs/intro',
      },
      icon: '⚙️',
    },
  ];

  return (
    <Layout
      title="Trading Platforms"
      description="Choose from MetaTrader 4, MetaTrader 5, WebTrader, or API trading. All platforms offer fast execution and advanced trading tools."
    >
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--12">
            <h1>Trading Platforms</h1>
            <p style={{fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem'}}>
              Zero Markets offers multiple trading platforms to suit your trading style and preferences.
              Whether you prefer desktop software, mobile apps, web-based trading, or programmatic access,
              we have the right solution for you.
            </p>
          </div>
        </div>

        <div className="row">
          {platforms.map((platform) => (
            <div key={platform.name} className="col col--6 margin-bottom--lg">
              <div className="api-card" style={{height: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                  <span style={{fontSize: '2.5rem', marginRight: '1rem'}}>{platform.icon}</span>
                  <div>
                    <h2 style={{color: 'var(--ifm-color-primary)', margin: 0}}>
                      {platform.name}
                    </h2>
                    <span
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--ifm-color-content-secondary)',
                      }}
                    >
                      {platform.shortName}
                    </span>
                  </div>
                </div>
                <p style={{marginBottom: '1.5rem'}}>{platform.description}</p>
                <div style={{marginBottom: '1.5rem'}}>
                  <strong>Key Features:</strong>
                  <ul style={{marginTop: '0.5rem', paddingLeft: '1.5rem'}}>
                    {platform.features.map((feature, idx) => (
                      <li key={idx} style={{marginBottom: '0.5rem'}}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                  {Object.entries(platform.downloadLinks).map(([platformName, url]) => (
                    <Link
                      key={platformName}
                      className="button button--outline button--sm"
                      to={url}
                      href={url.startsWith('http') ? url : undefined}
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
              <h3>Need Help Choosing a Platform?</h3>
              <p style={{marginBottom: '1.5rem'}}>
                Our support team can help you select the best platform for your trading needs.
              </p>
              <Link className="button button--primary button--lg" href="mailto:support@zeromarkets.com">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

