// 生成 api-dropdown.js 文件（用于双栏下拉菜单）
const fs = require('fs');
const path = require('path');

const OPENAPI_DIR = path.join(__dirname, '..', 'static', 'openapi');
const OUTPUT_FILE = path.join(__dirname, '..', 'static', 'js', 'api-dropdown.js');
const BASE_URL = '/api-docs/';

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

function toTitle(domain) {
  return domain
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

function groupByDomain(specs) {
  const map = {};
  for (const s of specs) {
    if (!map[s.domain]) map[s.domain] = [];
    map[s.domain].push(s);
  }
  Object.values(map).forEach((list) =>
    list.sort((a, b) => a.name.localeCompare(b.name))
  );
  return map;
}

// 扫描 OpenAPI 文件
const allFiles = walk(OPENAPI_DIR);

const specs = allFiles
  .sort()
  .map((fullPath) => {
    const relPath = normalizePath(path.relative(OPENAPI_DIR, fullPath));
    const withoutExt = relPath.replace(/\.ya?ml$/i, '');
    
    const parts = withoutExt.split('/');
    const domain = parts[0];
    const name = parts[parts.length - 1];
    
    return {
      id: `${domain}-${name}`,
      spec: `openapi/${relPath}`,
      route: `${BASE_URL}api/${withoutExt}`,
      domain,
      name,
      label: name,
    };
  });

// 按 domain 分组
const grouped = groupByDomain(specs);
const domains = Object.keys(grouped).sort();

const domainsData = {};

domains.forEach((domain) => {
  const list = grouped[domain];
  const domainKey = domain.replace(/-/g, ''); // market-data -> marketdata
  
  domainsData[domainKey] = {
    label: toTitle(domain), // Market Data, Trading
    items: list.map((s) => ({
      label: s.label,
      to: s.route,
    })),
  };
});

// 生成 JS 文件
const jsContent = `// 自动生成的 API Domains 数据（用于双栏下拉菜单）
// 此文件由 scripts/generate-api-dropdown.js 自动生成
(function() {
  const domainsData = ${JSON.stringify(domainsData, null, 2)};
  
  window.__ZERO_API_DOMAINS__ = domainsData;
})();
`;

// 确保目录存在
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf8');

console.log(
  `[generate-api-dropdown] Generated ${Object.keys(domainsData).length} domains into ${OUTPUT_FILE}`,
);

