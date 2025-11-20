import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Redoc-first体验',
    description:
      'OpenAPI 文件即文档源码，Redocusaurus 自动生成参数、示例、代码片段，适合产品、工程与合规团队共同查阅。',
    badge: 'Docs',
    ctaLabel: '查看示例',
    ctaLink: '/price-history',
  },
  {
    title: '自动化交付',
    description:
      '通过 GitHub Actions 或任意 CI，将业务仓导出的 YAML 同步到 portal，构建静态站后即可部署到 Pages / Nginx。',
    badge: 'CI/CD',
    ctaLabel: '了解流程',
    ctaLink: '/docs/intro',
  },
  {
    title: '统一体验',
    description:
      '文档、API 参考、导航和主题样式统一维护，减少团队割裂感，支持暗色、品牌配色和自定义组件。',
    badge: 'Brand',
    ctaLabel: '浏览概览',
    ctaLink: '/docs/apis/overview',
  },
];

function FeatureCard({title, description, badge, ctaLink, ctaLabel}) {
  return (
    <div className={styles.featureCard}>
      <p className={styles.featureBadge}>{badge}</p>
      <Heading as="h3">{title}</Heading>
      <p className={styles.featureDescription}>{description}</p>
      <Link className={styles.featureLink} to={ctaLink}>
        {ctaLabel} →
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {FeatureList.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
