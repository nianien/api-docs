// @ts-check

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const repoOwner = 'nianien';
const repoName = 'api-docs';
const siteUrl = `https://${repoOwner}.github.io`;
const siteBaseUrl = '/api-docs/';

// 自动生成的 Redoc specs（通过 scripts/generate-redoc-specs.js 生成）
const redocSpecs = require('./redoc-specs.json');

// 按 domain 分组
function groupByDomain(specs) {
  const map = {};
  for (const s of specs) {
    if (!map[s.domain]) map[s.domain] = [];
    map[s.domain].push(s);
  }
  // 每个 domain 里的 API 按文件名排序
  Object.values(map).forEach((list) =>
    list.sort((a, b) => a.name.localeCompare(b.name))
  );
  return map;
}

// domain 名称转 Title Case
function toTitle(domain) {
  // "market-data" -> "Market Data"
  return domain
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

// 自动生成下拉菜单 items
function buildApiNavItems() {
  const grouped = groupByDomain(redocSpecs);
  const domains = Object.keys(grouped).sort(); // trading, market-data, ...

  const items = [];

  // 顶部的 API Overview
  items.push({label: 'API Overview', to: '/api'});

  domains.forEach((domain) => {
    const list = grouped[domain];

    // 每个域前插一条分割线
    items.push({
      type: 'html',
      value: '<hr class="api-dropdown-separator" />',
    });

    // 域标题：用目录名自动转 TitleCase
    items.push({
      type: 'html',
      value: `<div class="api-dropdown-group">${toTitle(domain)}</div>`,
    });

    // 该域下所有 API：label = 文件名（不带后缀）
    list.forEach((s) => {
      items.push({
        label: s.label, // = name = 文件名，比如 ba_position
        to: s.route, // /api/trading/ba_position
      });
    });
  });

  return items;
}

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
    redocSpecs,
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
        specs: redocSpecs.map((s) => ({
          id: s.id,
          spec: `static/${s.spec}`,
          route: s.route,
        })),
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
          items: buildApiNavItems(), // ★ 自动按 domain 分组生成
        },
        {
          label: 'SDK',
          position: 'left',
          to: '/docs/integration/sdk',
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
            {label: 'Trading Overview', to: '/docs/trading/overview'},
            {label: 'Positions', to: '/docs/trading/positions'},
            {label: 'History', to: '/docs/trading/history'},
          ],
        },
        {
          title: 'Market Data',
          items: [
            {
              label: 'Market Data Overview',
              to: '/docs/market-data/overview',
            },
            {label: 'WebSocket', to: '/docs/market-data/websocket'},
            {
              label: 'Price History',
              to: '/docs/market-data/price-history',
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
