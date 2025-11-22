// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsible: false,
      items: [
        'overview/intro',
        'overview/authentication',
        'overview/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Trading',
      items: [
        'trading/overview',
        'trading/positions',
        'trading/history',
      ],
    },
    {
      type: 'category',
      label: 'Market Data',
      items: [
        'market-data/overview',
        'market-data/websocket',
        'market-data/price-history',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'integration/webhooks',
        'integration/sandbox',
        'integration/sdk',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'link',
          label: 'API Overview',
          href: '/api',
        },
        {
          type: 'html',
          value: '<hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--ifm-color-emphasis-300);" />',
        },
        {
          type: 'html',
          value: '<span style="font-size: 0.75rem; color: var(--ifm-color-emphasis-600); padding: 0.25rem 0.75rem;">Trading</span>',
        },
        {
          type: 'link',
          label: 'Positions API',
          href: '/api/trading/positions',
        },
        {
          type: 'link',
          label: 'History API',
          href: '/api/trading/history',
        },
        {
          type: 'html',
          value: '<hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--ifm-color-emphasis-300);" />',
        },
        {
          type: 'html',
          value: '<span style="font-size: 0.75rem; color: var(--ifm-color-emphasis-600); padding: 0.25rem 0.75rem;">Market Data</span>',
        },
        {
          type: 'link',
          label: 'WebSocket API',
          href: '/api/market-data/websocket',
        },
        {
          type: 'link',
          label: 'Price History API',
          href: '/api/market-data/price-history',
        },
      ],
    },
    {
      type: 'doc',
      id: 'changelog',
      label: 'Changelog',
    },
  ],
};

module.exports = sidebars;
