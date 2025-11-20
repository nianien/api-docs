import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const services = siteConfig.customFields?.serviceSpecs ?? [];

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>Unified API Portal</div>
        <Heading as="h1" className={styles.heroTitle}>
          Ship API changes with confidence.
        </Heading>
        <p className={styles.heroSubtitle}>
          {siteConfig.tagline}. Redoc-powered references, Docusaurus docs, and
          CI-friendly workflows in one place.
        </p>
        <div className={styles.ctaGroup}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            快速开始
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/apis/overview">
            查看 API 列表
          </Link>
        </div>
        <div className={styles.heroStats}>
          <div>
            <span>{services.length}</span>
            <p>服务接入</p>
          </div>
          <div>
            <span>100%</span>
            <p>OpenAPI 覆盖</p>
          </div>
          <div>
            <span>CI/CD</span>
            <p>自动化部署</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function ServiceGrid() {
  const {siteConfig} = useDocusaurusContext();
  const services = siteConfig.customFields?.serviceSpecs ?? [];
  if (!services.length) {
    return null;
  }

  return (
    <section className={styles.serviceSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">API 服务矩阵</Heading>
          <p>Redoc 渲染的 OpenAPI 文档，可直接在运行时查询参数和示例。</p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <Link key={service.id} className={styles.serviceCard} to={service.route}>
              <p className={styles.serviceBadge}>OpenAPI</p>
              <h3>{service.label}</h3>
              <span className={styles.serviceRoute}>{service.route}</span>
              <span className={styles.serviceLink}>查看文档 →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Unified Docusaurus + Redoc portal for internal APIs">
      <HomepageHeader />
      <main>
        <ServiceGrid />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
