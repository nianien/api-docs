// @ts-check

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const repoOwner = 'nianien';
const repoName = 'api-docs';
const siteUrl = `https://${repoOwner}.github.io`;
const siteBaseUrl = '/api-docs/';

// API Specs 配置 - 按方案 B 的域结构组织（用于导航栏）
const apiSpecs = {
  trading: [
    {
      id: 'trading-positions',
      label: 'Positions API',
      route: '/api/trading/positions',
    },
    {
      id: 'trading-history',
      label: 'History API',
      route: '/api/trading/history',
    },
  ],
  marketData: [
    {
      id: 'marketdata-ws',
      label: 'Realtime WS API',
      route: '/api/market-data/websocket',
    },
    {
      id: 'price-history',
      label: 'Price History API',
      route: '/api/market-data/price-history',
    },
  ],
};

const config = {
  title: 'Zero Markets Developer Portal',
  tagline: 'Trade with Confidence in Global Markets',
  favicon: 'img/favicon.ico',

  // 你的站点地址（如果用 GitHub Pages）
  url: siteUrl,
  // 仓库名（例如 api-docs-portal）
  baseUrl: siteBaseUrl,

  organizationName: repoOwner, // GitHub org 或用户名
  projectName: repoName, // 仓库名

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  customFields: {
    apiSpecs,
  },


  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    function(context, options) {
      return {
        name: 'webpack-config-plugin',
        configureWebpack(config, isServer) {
          const webpack = require('webpack');
          const path = require('path');
          
          // 替换 prism-scala 为 stub 模块
          const plugins = [
            new webpack.NormalModuleReplacementPlugin(
              /prismjs\/components\/prism-scala\.js$/,
              path.resolve(__dirname, 'src/utils/prism-scala-stub.js')
            ),
            // 也处理不带 .js 扩展名的情况
            new webpack.NormalModuleReplacementPlugin(
              /prismjs\/components\/prism-scala$/,
              path.resolve(__dirname, 'src/utils/prism-scala-stub.js')
            ),
          ];
          
          
          return {
            plugins,
            resolve: {
              alias: {
                'prismjs/components/prism-scala': path.resolve(__dirname, 'src/utils/prism-scala-stub.js'),
                'prismjs/components/prism-scala.js': path.resolve(__dirname, 'src/utils/prism-scala-stub.js'),
              },
              extensions: ['.js', '.json'],
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    // 🔑 关键：挂上 redocusaurus preset
    [
      'redocusaurus',
      {
        specs: [
          // Trading – Positions API
          {
            id: 'trading-positions',
            spec: 'static/openapi/ba_position.yaml',
            route: '/api/trading/positions',
          },
          // Trading – History API (IB Portal)
          {
            id: 'trading-history',
            spec: 'static/openapi/ib_portal_api.yaml',
            route: '/api/trading/history',
          },
          // Market Data – Realtime WS API
          {
            id: 'marketdata-ws',
            spec: 'static/openapi/market_data.yaml',
            route: '/api/market-data/websocket',
          },
          // Market Data – Price History API
          {
            id: 'price-history',
            spec: 'static/openapi/price_history.yaml',
            route: '/api/market-data/price-history',
          },
        ],
        theme: {
          primaryColor: '#00C46B',
          options: {
            nativeScrollbars: true,
            hideDownloadButton: false,
            disableSearch: false,
            theme: {
              colors: {
                primary: {main: '#00C46B'},
                text: {
                  primary: '#0b1020',
                  secondary: '#4b5563',
                },
                http: {
                  get: '#16a34a',
                  post: '#0ea5e9',
                  put: '#eab308',
                  delete: '#ef4444',
                },
                background: {
                  default: '#ffffff',
                  sidebar: '#f7f9fb',
                },
              },
              typography: {
                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
                headings: {
                  fontWeight: 600,
                },
                code: {
                  fontFamily:
                    '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: '13px',
                },
              },
              sidebar: {
                backgroundColor: '#f7f9fb',
                textColor: '#0b1020',
                activeTextColor: '#00C46B',
              },
            },
          },
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card-2.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    navbar: {
      style: 'primary',
      title: 'Zero Markets',
      logo: {
        alt: 'Zero Markets Logo',
        src: 'img/logo-3.png',
      },
      items: [
        {
          label: 'Markets',
          to: '/markets',
          position: 'left',
        },
        {
          label: 'Platforms',
          to: '/platforms',
          position: 'left',
        },
        {
          label: 'Account Types',
          to: '/account-types',
          position: 'left',
        },
        {
          label: 'Docs',
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
        },
        {
          label: 'API Reference',
          position: 'left',
          items: [
            {
              label: 'API Overview',
              to: '/api',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--ifm-color-emphasis-300);" />',
            },
            {
              type: 'html',
              value: '<span style="font-size: 0.75rem; color: var(--ifm-color-emphasis-600); padding: 0.25rem 0.75rem;">Trading</span>',
            },
            // Trading APIs
            ...apiSpecs.trading.map(({route, label}) => ({
              to: route,
              label,
            })),
            {
              type: 'html',
              value: '<hr style="margin: 0.5rem 0; border: none; border-top: 1px solid var(--ifm-color-emphasis-300);" />',
            },
            {
              type: 'html',
              value: '<span style="font-size: 0.75rem; color: var(--ifm-color-emphasis-600); padding: 0.25rem 0.75rem;">Market Data</span>',
            },
            // Market Data APIs
            ...apiSpecs.marketData.map(({route, label}) => ({
              to: route,
              label,
            })),
          ],
        },
        {
          href: 'https://zeromarkets.com',
          label: 'Main Website',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Trading',
          items: [
            {label: 'Trading Overview', to: '/docs/domains/trading/trading-overview'},
            {label: 'Positions', to: '/docs/domains/trading/trading-positions'},
            {label: 'History', to: '/docs/domains/trading/trading-history'},
          ],
        },
        {
          title: 'Market Data',
          items: [
            {
              label: 'Market Data Overview',
              to: '/docs/domains/market-data/market-data-overview',
            },
            {label: 'WebSocket', to: '/docs/domains/market-data/market-data-websocket'},
            {
              label: 'Price History',
              to: '/docs/domains/market-data/market-data-price-history',
            },
          ],
        },
        {
          title: 'Integration',
          items: [
            {label: 'Sandbox', to: '/docs/integration/sandbox'},
            {label: 'SDK', to: '/docs/integration/sdk'},
            {label: 'Changelog', to: '/docs/changelog'},
          ],
        },
      ],
      copyright:
        '© ' +
        new Date().getFullYear() +
        ' Zero Markets. All rights reserved. FX and CFDs trading involves a high risk of loss.',
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['java', 'kotlin', 'go', 'bash', 'yaml'],
    },
    scripts: [
      {
        src: `${siteBaseUrl}prism-fix.js`,
        async: false,
      },
    ],
  },
};

module.exports = config;
