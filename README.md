# API Docs Portal

统一的 API 文档门户，基于 Docusaurus + Redocusaurus 构建。

## 架构说明

- **业务服务仓**：负责生成 `openapi-xxx.yaml`（对业务仓来说是产物）
- **api-docs 仓**：Docusaurus + Redocusaurus，将 YAML 文件渲染成 API 文档站
- **部署**：构建后的静态站点可部署到 GitHub Pages 或 Nginx

## 快速开始

### 本地开发

```bash
npm install
npm start
```

访问 http://localhost:3000/service-a 查看 API 文档

### 构建

```bash
npm run build
```

构建产物在 `build/` 目录

### 本地预览构建结果

```bash
npm run serve
```

## 添加新服务

### 1. 在业务服务仓中

确保服务已集成 springdoc，暴露 `/v3/api-docs.yaml` 端点。

使用提供的脚本导出 OpenAPI YAML：

```bash
# 在业务服务仓中
./scripts/export-openapi.sh
```

这会生成 `openapi-service-a.yaml` 文件。

### 2. 同步到 api-docs 仓

将生成的 YAML 文件复制到 `static/openapi/` 目录：

```bash
cp openapi-service-a.yaml ../api-docs/static/openapi/service-b.yaml
```

### 3. 配置 Docusaurus

编辑 `docusaurus.config.js`，在 `presets` 中的 `redocusaurus` 配置里添加新服务：

```javascript
presets: [
  // ... classic preset
  [
    'redocusaurus',
    {
      specs: [
        {
          id: 'service-a',
          spec: 'static/openapi/service-a.yaml',
          route: '/service-a',
        },
        // 添加新服务
        {
          id: 'service-b',
          spec: 'static/openapi/service-b.yaml',
          route: '/service-b',
        },
      ],
      theme: {
        primaryColor: '#25c2a0',
      },
    },
  ],
],
```

在 `themeConfig.navbar.items` 中添加导航菜单：

```javascript
navbar: {
  items: [
    { to: '/docs/intro', label: '文档说明', position: 'left' },
    { to: '/service-a', label: 'Service A API', position: 'left' },
    { to: '/service-b', label: 'Service B API', position: 'left' },
  ],
},
```

### 4. 重新构建和部署

```bash
npm run build
```

## 部署

### GitHub Pages

1. 确保 `.github/workflows/deploy.yml` 已配置
2. 在 GitHub 仓库设置中启用 GitHub Pages，选择 "GitHub Actions" 作为源
3. 修改 `docusaurus.config.js` 中的 `url`、`baseUrl`、`organizationName`、`projectName`
4. Push 到 main 分支，GitHub Actions 会自动构建并部署

### Nginx

1. 构建项目：`npm run build`
2. 将 `build/` 目录内容复制到服务器，例如 `/var/www/api-docs`
3. 配置 Nginx：

```nginx
server {
    listen 80;
    server_name api-docs.your-company.com;

    root /var/www/api-docs;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 目录结构

```
api-docs/
├── static/
│   └── openapi/          # OpenAPI YAML 文件存放目录
│       └── service-a.yaml
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 部署配置
├── scripts/
│   └── export-openapi.sh # 业务服务导出脚本示例
├── docusaurus.config.js  # Docusaurus 配置
└── package.json
```

## 注意事项

- OpenAPI YAML 文件应放在 `static/openapi/` 目录
- 每个服务的 `id` 和 `route` 需要唯一
- 修改配置后需要重新构建才能生效
