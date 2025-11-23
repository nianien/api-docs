import React, {useState, useEffect} from 'react';
import OriginalNavbarItem from '@theme-original/NavbarItem';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function NavbarItem(props) {
  // 如果不是 API Reference dropdown，使用默认组件
  // 检查多种可能的 className 格式和 label
  const isApiDropdown = 
    props.className === 'dropdown-api' || 
    props.className?.includes('dropdown-api') ||
    (props.type === 'dropdown' && props.label === 'API Reference') ||
    (props.items && props.items.length === 0 && props.label === 'API Reference');
  
  if (!isApiDropdown) {
    return <OriginalNavbarItem {...props} />;
  }
  
  // 从 Docusaurus context 获取数据（更可靠的方式）
  const {siteConfig} = useDocusaurusContext();
  const apiDomains = siteConfig.customFields?.apiDomains || {};
  
  // 初始化时直接使用 customFields 中的数据
  const domainKeys = Object.keys(apiDomains);
  const initialDomains = domainKeys.length > 0 ? apiDomains : null;
  const initialActive = domainKeys.length > 0 ? domainKeys[0] : null;
  
  const [domains, setDomains] = useState(initialDomains);
  const [active, setActive] = useState(initialActive);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 如果 customFields 中有数据，直接使用
    if (apiDomains && Object.keys(apiDomains).length > 0) {
      const domainKeys = Object.keys(apiDomains);
      setDomains(apiDomains);
      setActive(domainKeys[0]);
      return;
    }
    
    // 降级：尝试从 window 对象加载（兼容旧方式）
    if (typeof window !== 'undefined' && window.__ZERO_API_DOMAINS__) {
      const domainsData = window.__ZERO_API_DOMAINS__;
      const domainKeys = Object.keys(domainsData);
      if (domainKeys.length > 0) {
        setDomains(domainsData);
        setActive(domainKeys[0]);
        return;
      }
    }
  }, [apiDomains]);

  if (!domains || !active || !domains[active]) {
    // 数据未加载时，使用默认下拉菜单
    console.log('[API Dropdown] Falling back to default menu. Domains:', domains, 'Active:', active, 'ApiDomains from config:', apiDomains);
    return <OriginalNavbarItem {...props} />;
  }

  const activeDomain = domains[active];
  
  if (!activeDomain || !activeDomain.items || activeDomain.items.length === 0) {
    console.warn('[API Dropdown] Active domain has no items:', activeDomain);
    return <OriginalNavbarItem {...props} />;
  }

  return (
    <div 
      className={styles.zeroApiDropdownTrigger}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="navbar__link">API Reference ▾</span>
      {isOpen && (
        <div className={styles.zeroApiDropdown}>
          {/* 左侧 domain 列 */}
          <div className={styles.zeroApiDomains}>
            {Object.keys(domains).map((key) => (
              <div
                key={key}
                className={`${styles.zeroApiDomainItem} ${
                  active === key ? styles.active : ''
                }`}
                onMouseEnter={() => setActive(key)}
              >
                {domains[key].label}
              </div>
            ))}
          </div>

          {/* 右侧 API 列 */}
          <div className={styles.zeroApiEndpoints}>
            {activeDomain.items.map((item, idx) => (
              <a
                key={idx}
                className={styles.zeroApiEndpoint}
                href={item.to}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
