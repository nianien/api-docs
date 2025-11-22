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
      <div className="container margin-vert--xl">
        <div className="row">
          <div className="col col--12">
            <h1>Account Types</h1>
            <p style={{fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem'}}>
              Zero Markets offers a variety of account types to meet the needs of different traders.
              Whether you're a beginner or an experienced professional, we have an account that fits your trading style.
            </p>
          </div>
        </div>

        <div className="row">
          {accountTypes.map((account) => (
            <div key={account.name} className="col col--6 margin-bottom--lg">
              <div
                className="api-card"
                style={{
                  height: '100%',
                  border: account.recommended
                    ? '2px solid var(--ifm-color-primary)'
                    : '1px solid rgba(148, 163, 184, 0.35)',
                  position: 'relative',
                }}
              >
                {account.recommended && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'var(--ifm-color-primary)',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                    }}
                  >
                    Recommended
                  </div>
                )}
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
                  <span style={{fontSize: '2.5rem', marginRight: '1rem'}}>{account.icon}</span>
                  <h2 style={{color: 'var(--ifm-color-primary)', margin: 0}}>
                    {account.name}
                  </h2>
                </div>
                <p style={{marginBottom: '1.5rem'}}>{account.description}</p>
                <div style={{marginBottom: '1.5rem'}}>
                  <div style={{marginBottom: '0.75rem'}}>
                    <strong>Minimum Deposit:</strong> {account.minDeposit}
                  </div>
                  <div style={{marginBottom: '0.75rem'}}>
                    <strong>Spreads:</strong> {account.spread}
                  </div>
                  <div style={{marginBottom: '0.75rem'}}>
                    <strong>Commission:</strong> {account.commission}
                  </div>
                  <div style={{marginBottom: '0.75rem'}}>
                    <strong>Leverage:</strong> {account.leverage}
                  </div>
                  <div style={{marginBottom: '0.75rem'}}>
                    <strong>Instruments:</strong> {account.instruments}
                  </div>
                  <div style={{marginBottom: '0.75rem'}}>
                    <strong>Execution:</strong> {account.execution}
                  </div>
                  {account.swapFree && (
                    <div style={{marginBottom: '0.75rem'}}>
                      <strong>Swap-Free:</strong> Yes
                    </div>
                  )}
                </div>
                <Link
                  className="button button--primary"
                  to="/docs/products/accounts"
                  style={{width: '100%', textAlign: 'center'}}
                >
                  Learn More
                </Link>
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
              <h3>Ready to Open an Account?</h3>
              <p style={{marginBottom: '1.5rem'}}>
                Get started today and begin trading with competitive spreads and fast execution.
              </p>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                <Link className="button button--primary button--lg" href="https://zeromarkets.com/register">
                  Open Account
                </Link>
                <Link className="button button--outline button--lg" to="/docs/products/funding">
                  Funding Options
                </Link>
              </div>
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
              <strong>⚠️ Important:</strong> Account specifications are subject to change. 
              Please refer to the latest account information on our website or contact support 
              for the most up-to-date details. Leverage and trading conditions may vary by jurisdiction.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

