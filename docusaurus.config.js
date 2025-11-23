// @ts-check

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const repoOwner = 'nianien';
const repoName = 'api-docs';
const siteUrl = `https://${repoOwner}.github.io`;
const siteBaseUrl = '/api-docs/';

// 动态扫描 OpenAPI 文件，生成 Redoc specs（无需中间 JSON 文件）
function scanRedocSpecs() {
  const fs = require('fs');
  const path = require('path');
  const openapiDir = path.join(__dirname, 'static', 'openapi');
  
  if (!fs.existsSync(openapiDir)) {
    return [];
  }
  
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        files = files.concat(walk(full));
      } else if (e.isFile() && /\.ya?ml$/i.test(e.name)) {
        files.push(full);
      }
    }
    return files;
  }
  
  function normalizePath(p) {
    return p.replace(/\\/g, '/');
  }
  
  const allFiles = walk(openapiDir);
  
  return allFiles
    .sort()
    .map((fullPath) => {
      const relPath = normalizePath(path.relative(openapiDir, fullPath));
      const withoutExt = relPath.replace(/\.ya?ml$/i, '');
      
      const parts = withoutExt.split('/');
      const domain = parts[0];
      const name = parts[parts.length - 1];
      
      return {
        id: `${domain}-${name}`,
        spec: `openapi/${relPath}`,
        route: `/api/${withoutExt}`,
        domain,
        name,
        label: name,
      };
    });
}

const redocSpecs = scanRedocSpecs();

// 自动生成 Footer 链接（从 docs/ 目录结构生成）
function buildFooterLinks() {
  const fs = require('fs');
  const path = require('path');
  const docsDir = path.join(__dirname, 'docs');
  
  // 需要显示在 footer 的目录（按 position 排序）
  const footerCategories = ['trading', 'market-data', 'integration'];
  
  const links = [];
  
  footerCategories.forEach((categoryName) => {
    const categoryDir = path.join(docsDir, categoryName);
    if (!fs.existsSync(categoryDir)) return;
    
    // 读取 _category_.json 获取 label
    const categoryFile = path.join(categoryDir, '_category_.json');
    let categoryLabel = categoryName;
    if (fs.existsSync(categoryFile)) {
      const categoryData = JSON.parse(fs.readFileSync(categoryFile, 'utf8'));
      categoryLabel = categoryData.label || categoryName;
    }
    
    // 扫描该目录下的 .md 文件
    const items = [];
    const files = fs.readdirSync(categoryDir);
    
    files
      .filter((f) => f.endsWith('.md') && f !== '_category_.json')
      .sort()
      .forEach((file) => {
        const filePath = path.join(categoryDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // 提取 frontmatter 中的 title
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        let title = file.replace(/\.md$/, '');
        let docId = title;
        
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
          const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
          
          if (titleMatch) {
            title = titleMatch[1].trim();
          }
          if (idMatch) {
            docId = idMatch[1].trim();
          }
        }
        
        items.push({
          label: title,
          to: `/docs/${categoryName}/${docId}`,
        });
      });
    
    // 特殊处理：Integration 分类需要添加根目录的 changelog
    if (categoryName === 'integration') {
      const changelogPath = path.join(docsDir, 'changelog.md');
      if (fs.existsSync(changelogPath)) {
        const changelogContent = fs.readFileSync(changelogPath, 'utf8');
        const frontmatterMatch = changelogContent.match(/^---\n([\s\S]*?)\n---/);
        let changelogTitle = 'Changelog';
        let changelogId = 'changelog';
        
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
          const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
          
          if (titleMatch) changelogTitle = titleMatch[1].trim();
          if (idMatch) changelogId = idMatch[1].trim();
        }
        
        items.push({
          label: changelogTitle,
          to: `/docs/${changelogId}`,
        });
      }
    }
    
    if (items.length > 0) {
      links.push({
        title: categoryLabel,
        items: items,
      });
    }
  });
  
  return links;
}

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
          spec: `static/${s.spec}`, // static/openapi/trading/ba_position.yaml
          route: s.route, // /api/trading/ba_position
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
      title: 'Zero Markets',
      logo: {
        alt: 'Zero Markets Logo',
        src: 'img/logo-3.png',
      },
      items: [
        // --- Developer Documentation ---
        {
          label: 'Docs',
          to: '/docs/quickstart',
          position: 'left',
        },
        {
          label: 'API Reference',
          position: 'left',
          items: buildApiNavItems(), // 自动生成 Market Data / Trading 分组
        },
        {
          label: 'SDK',
          to: '/docs/integration/sdk',
          position: 'left',
        },
        // --- External link to main website ---
        {
          label: 'Main Website',
          href: 'https://zeromarkets.com/',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: buildFooterLinks(), // ★ 自动从 docs/ 目录结构生成
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

