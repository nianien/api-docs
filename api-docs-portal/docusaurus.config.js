// @ts-check

const Prism = require('prismjs');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-json');
require('prismjs/components/prism-yaml');

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const repoInfo = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const repoOwner = repoInfo[0];
const repoName = repoInfo[1];
const isGitHubPagesBuild = Boolean(process.env.GITHUB_ACTIONS && repoOwner && repoName);
const isDevServer = process.env.NODE_ENV === 'development';

const withLeadingAndTrailingSlash = (value) => {
  if (!value) {
    return '/';
  }
  let next = value.startsWith('/') ? value : `/${value}`;
  next = next.endsWith('/') ? next : `${next}/`;
  return next;
};

const siteUrl =
  process.env.DOCS_SITE_URL ??
  (isGitHubPagesBuild ? `https://${repoOwner}.github.io` : 'https://your-org.github.io');

const siteBaseUrl = (() => {
  if (process.env.DOCS_BASE_URL) {
    return withLeadingAndTrailingSlash(process.env.DOCS_BASE_URL);
  }
  if (isDevServer) {
    return '/';
  }
  if (isGitHubPagesBuild && repoName) {
    return withLeadingAndTrailingSlash(repoName);
  }
  return '/';
})();

const serviceSpecs = [
  {
    id: 'price-history',
    label: 'Price History API',
    route: '/price-history',
    spec: 'static/openapi/price_history.yaml',
  },
  {
    id: 'market-data',
    label: 'Market Data API',
    route: '/market-data',
    spec: 'static/openapi/market_data.yaml',
  },
  {
    id: 'ib-portal',
    label: 'IB Portal API',
    route: '/ib-portal',
    spec: 'static/openapi/ib_portal_api.yaml',
  },
  {
    id: 'blackarrow-positions',
    label: 'BlackArrow Positions API',
    route: '/blackarrow-positions',
    spec: 'static/openapi/ba_position.yaml',
  },
];

const config = {
  title: 'API Docs Portal',
  tagline: 'One home for every OpenAPI in your stack',
  favicon: 'img/favicon.ico',

  // 你的站点地址（如果用 GitHub Pages）
  url: siteUrl,
  // 仓库名（例如 api-docs-portal）
  baseUrl: siteBaseUrl,

  organizationName: repoOwner ?? 'your-org', // GitHub org 或用户名
  projectName: repoName ?? 'api-docs-portal', // 仓库名

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  customFields: {
    serviceSpecs,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
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
        specs: serviceSpecs.map(({id, spec, route}) => ({
          id,
          spec,
          route,
        })),
        theme: {
          primaryColor: '#25c2a0',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    navbar: {
      title: 'API Docs',
      logo: {
        alt: 'API Docs Portal',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/docs/intro', label: '文档说明', position: 'left'},
        {
          label: 'API 总览',
          to: '/docs/apis/overview',
          position: 'left',
        },
        ...serviceSpecs.map(({route, label}) => ({
          to: route,
          label,
          position: 'left',
        })),
        {
          href: 'https://github.com/your-org/api-docs-portal',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'mailto:api-support@your-company.com',
          label: 'Contact',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/intro'},
            {label: 'API Overview', to: '/docs/apis/overview'},
          ],
        },
        {
          title: 'APIs',
          items: serviceSpecs.map(({label, route}) => ({
            label,
            to: route,
          })),
        },
        {
          title: 'Support',
          items: [
            {label: 'Status Page', href: 'https://status.your-company.com'},
            {label: 'Contact', href: 'mailto:api-support@your-company.com'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Your Company`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['bash', 'clike', 'java', 'python', 'scala'],
    },
  },
};

module.exports = config;
