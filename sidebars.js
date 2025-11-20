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
      items: ['intro', 'auth'],
    },
    {
      type: 'category',
      label: 'Trading',
      items: [
        'domains/trading/trading-overview',
        'domains/trading/trading-positions',
        'domains/trading/trading-history',
      ],
    },
    {
      type: 'category',
      label: 'Market Data',
      items: [
        'domains/market-data/market-data-overview',
        'domains/market-data/market-data-websocket',
        'domains/market-data/market-data-price-history',
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
          label: 'Trading - Positions API',
          href: '/api/trading/positions',
        },
        {
          type: 'link',
          label: 'Trading - History API',
          href: '/api/trading/history',
        },
        {
          type: 'link',
          label: 'Market Data - WebSocket API',
          href: '/api/market-data/websocket',
        },
        {
          type: 'link',
          label: 'Market Data - Price History API',
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
