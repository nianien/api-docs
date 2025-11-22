import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// 从 docusaurus.config.js 的 customFields 中获取 specs
function useRedocSpecs() {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.customFields.redocSpecs || [];
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

function toTitle(domain) {
  return domain
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export default function ApiOverviewPage() {
  const specs = useRedocSpecs();
  const grouped = groupByDomain(specs);
  const domains = Object.keys(grouped).sort();

  return (
    <Layout
      title="API Reference"
      description="Zero Markets API Reference"
    >
      <main className="container margin-vert--lg">
        <h1>API Reference</h1>
        <p className="margin-bottom--lg">
          所有 OpenAPI 规范按域划分在 <code>static/openapi/&lt;domain&gt;</code>{" "}
          中。每个 YAML 文件对应一个 Redoc 页面，路由为{" "}
          <code>/api/&lt;domain&gt;/&lt;fileName&gt;</code>。
        </p>

        {domains.map((domain) => {
          const list = grouped[domain];
          return (
            <section key={domain} className="margin-bottom--lg">
              <h2>{toTitle(domain)}</h2>
              <div className="row">
                {list.map((s) => (
                  <div key={s.id} className="col col--6 margin-bottom--md">
                    <div className="api-card">
                      <h3>{s.label}</h3>
                      <p>
                        文件：<code>{s.spec}</code>
                      </p>
                      <p>
                        路由：<code>{s.route}</code>
                      </p>
                      <Link
                        className="button button--sm button--primary margin-top--sm"
                        to={s.route}
                      >
                        打开 API 文档
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </Layout>
  );
}
