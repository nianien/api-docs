import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function AccountTypes() {
  const accountTypes = [
    {
      name: 'Standard Account',
      description: 'Perfect for most traders, offering competitive spreads and no commissions.',
      minDeposit: '$100',
      spread: 'From 1.2 pips',
      commission: 'No commission',
      leverage: 'Up to 1:500',
      instruments: 'All instruments',
      execution: 'Market execution',
      swapFree: false,
      recommended: true,
      icon: '⭐',
    },
    {
      name: 'ECN / Raw Account',
      description: 'Raw spreads from liquidity providers with low commission per lot.',
      minDeposit: '$500',
      spread: 'From 0.0 pips',
      commission: '$3.5 per lot',
      leverage: 'Up to 1:500',
      instruments: 'All instruments',
      execution: 'ECN execution',
      swapFree: false,
      recommended: false,
      icon: '💎',
    },
    {
      name: 'Demo Account',
      description: 'Practice trading with virtual funds in a risk-free environment.',
      minDeposit: 'Free',
      spread: 'Same as Standard',
      commission: 'No commission',
      leverage: 'Up to 1:500',
      instruments: 'All instruments',
      execution: 'Market execution',
      swapFree: true,
      recommended: false,
      icon: '🎯',
    },
    {
      name: 'Islamic Account',
      description: 'Swap-free account compliant with Islamic Sharia law.',
      minDeposit: '$100',
      spread: 'From 1.2 pips',
      commission: 'No commission',
      leverage: 'Up to 1:500',
      instruments: 'All instruments',
      execution: 'Market execution',
      swapFree: true,
      recommended: false,
      icon: '🕌',
    },
  ];

  return (
    <Layout
      title="Account Types"
      description="Choose the account type that best suits your trading style. From Standard to ECN, we offer accounts for all types of traders."
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
                Account Types
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
                Zero Markets offers a variety of account types to meet the needs of different traders.
                Whether you're a beginner or an experienced professional, we have an account that fits your trading style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Types Grid */}
      <section style={{padding: '3rem 0', background: '#ffffff'}}>
        <div className="container">
          <div className="row">
            {accountTypes.map((account) => (
              <div key={account.name} className="col col--6 margin-bottom--lg">
                <div
                  className="feature-card"
                  style={{
                    border: account.recommended
                      ? '2px solid #00a86b'
                      : '1px solid rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                  }}
                >
                  {account.recommended && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: '#00a86b',
                        color: 'white',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Recommended
                    </div>
                  )}
                  <div className="feature-icon" style={{color: '#00a86b'}}>
                    <span style={{fontSize: '1.75rem'}}>{account.icon}</span>
                  </div>
                  <h2
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      color: '#1a1f25',
                    }}
                  >
                    {account.name}
                  </h2>
                  <p
                    style={{
                      color: '#4b5563',
                      lineHeight: '1.6',
                      marginBottom: '1.5rem',
                      fontSize: '0.95rem',
                    }}
                  >
                    {account.description}
                  </p>
                  <div style={{marginBottom: '1.5rem'}}>
                    <div style={{marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                      <strong style={{color: '#1a1f25'}}>Minimum Deposit:</strong>{' '}
                      <span style={{color: '#4b5563'}}>{account.minDeposit}</span>
                    </div>
                    <div style={{marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                      <strong style={{color: '#1a1f25'}}>Spreads:</strong>{' '}
                      <span style={{color: '#4b5563'}}>{account.spread}</span>
                    </div>
                    <div style={{marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                      <strong style={{color: '#1a1f25'}}>Commission:</strong>{' '}
                      <span style={{color: '#4b5563'}}>{account.commission}</span>
                    </div>
                    <div style={{marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                      <strong style={{color: '#1a1f25'}}>Leverage:</strong>{' '}
                      <span style={{color: '#4b5563'}}>{account.leverage}</span>
                    </div>
                    <div style={{marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                      <strong style={{color: '#1a1f25'}}>Instruments:</strong>{' '}
                      <span style={{color: '#4b5563'}}>{account.instruments}</span>
                    </div>
                    <div style={{marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                      <strong style={{color: '#1a1f25'}}>Execution:</strong>{' '}
                      <span style={{color: '#4b5563'}}>{account.execution}</span>
                    </div>
                    {account.swapFree && (
                      <div style={{marginBottom: '0.75rem', fontSize: '0.9rem'}}>
                        <strong style={{color: '#1a1f25'}}>Swap-Free:</strong>{' '}
                        <span style={{color: '#4b5563'}}>Yes</span>
                      </div>
                    )}
                  </div>
                  <Link
                    className="button button--primary home-btn-primary"
                    to="/docs/products/accounts"
                    style={{width: '100%', textAlign: 'center'}}
                  >
                    Learn More
                  </Link>
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
                  Ready to Open an Account?
                </h3>
                <p style={{color: '#4b5563', marginBottom: '1.5rem', fontSize: '1rem'}}>
                  Get started today and begin trading with competitive spreads and fast execution.
                </p>
                <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
                  <Link className="button button--primary button--lg home-btn-primary" href="https://zeromarkets.com/register">
                    Open Account
                  </Link>
                  <Link className="button button--outline button--lg home-btn-outline" to="/docs/products/funding">
                    Funding Options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section style={{padding: '2rem 0', background: '#ffffff'}}>
        <div className="container">
          <div className="row">
            <div className="col col--10 col--offset-1">
              <div className="zm-callout" style={{background: '#fff3cd', borderColor: '#ffc107'}}>
                <strong style={{color: '#856404'}}>⚠️ Important:</strong>{' '}
                <span style={{color: '#856404'}}>
                  Account specifications are subject to change. Please refer to the latest account information 
                  on our website or contact support for the most up-to-date details. 
                  Leverage and trading conditions may vary by jurisdiction.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
