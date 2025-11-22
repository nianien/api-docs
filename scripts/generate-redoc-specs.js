// scripts/generate-redoc-specs.js
const fs = require("fs");
const path = require("path");

const OPENAPI_DIR = path.join(__dirname, "..", "static", "openapi");
const OUTPUT_FILE = path.join(__dirname, "..", "redoc-specs.json");

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
  return p.replace(/\\/g, "/");
}

const allFiles = walk(OPENAPI_DIR);

const specs = allFiles
  .sort()
  .map((fullPath) => {
    // 相对路径，例如 "trading/ba_position.yaml"
    const relPath = normalizePath(path.relative(OPENAPI_DIR, fullPath));
    const withoutExt = relPath.replace(/\.ya?ml$/i, ""); // trading/ba_position

    const parts = withoutExt.split("/");
    const domain = parts[0]; // trading
    const name = parts[parts.length - 1]; // ba_position

    return {
      id: `${domain}-${name}`, // trading-ba_position
      spec: `openapi/${relPath}`, // openapi/trading/ba_position.yaml
      route: `/api/${withoutExt}`, // /api/trading/ba_position
      domain,
      name, // 文件名（不带后缀） = 菜单名
      label: name, // 以后菜单用这个，就等于文件名
    };
  });

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(specs, null, 2), "utf8");

console.log(
  `[generate-redoc-specs] Generated ${specs.length} specs into ${OUTPUT_FILE}`,
);

