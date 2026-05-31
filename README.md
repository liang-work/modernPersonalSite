# LLY · 个人主页

基于 Vue 3 + Vite 的现代化个人主页，采用纯静态多页架构，所有内容由 JSON 配置文件驱动，无需后端。

## 特性

- **多页应用** — 首页、作品列表、链接页、项目详情页各自独立构建，导航使用原生 `<a>` 链接
- **JSON 驱动** — 修改 `config/` 下的 JSON 文件即可更新导航、技能、作品、链接等内容
- **搜索筛选** — 作品页和链接页内置实时搜索与多维度筛选（状态、性质、类型）
- **自动生成** — 每个 `config/artwork/*.json` 自动生成为独立项目详情页面
- **深色科技风主题** — CSS 变量驱动的暗色主题，支持全局强调色、网格背景、光晕效果
- **零运行时依赖** — 除 Vue 外无其他运行时依赖，纯 CSS 布局

## 技术栈

| 技术 | 用途 |
|---|---|
| Vue 3 | 前端框架（Composition API + `<script setup>`） |
| Vite 5 | 构建工具与开发服务器 |
| CSS Custom Properties | 主题系统 |
| CSS Grid / clamp() | 响应式布局 |
| Font Awesome 6 | 图标库 |
| Google Fonts (Inter) | 字体 |

## 目录结构

```
lly_homepage/
├── index.html                 # 首页入口
├── projects.html              # 作品列表页入口
├── links.html                 # 链接页入口
├── vite.config.js             # Vite 多页构建配置
├── package.json
├── config/                    # 内容配置（JSON）
│   ├── site.config.json       # 全局配置：导航、英雄区、技能、社交、页脚
│   ├── projects.config.json   # 作品页标题和描述
│   ├── links.config.json      # 链接数据
│   ├── announcement.config.json
│   └── artwork/               # 每个 JSON 生成一个项目详情页
│       ├── cli-tools.json
│       ├── data-dashboard.json
│       └── lly-homepage.json
├── src/
│   ├── main.js                # 首页入口脚本
│   ├── App.vue                # 首页根组件
│   ├── styles/global.css      # 全局样式
│   ├── components/            # 可复用组件
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── AnnouncementSection.vue
│   │   ├── CardGrid.vue
│   │   ├── SkillCard.vue
│   │   ├── ProjectCard.vue
│   │   ├── ProjectDetail.vue
│   │   ├── LinkCard.vue
│   │   ├── SearchFilter.vue
│   │   ├── IconDisplay.vue
│   │   └── FooterSection.vue
│   ├── projects/              # 作品子应用
│   │   ├── main.js
│   │   └── App.vue
│   └── links/                 # 链接子应用
│       ├── main.js
│       └── App.vue
├── scripts/                   # 构建脚本
│   ├── generate-project-pages.mjs
│   ├── project-entry-template.js
│   └── project-page-template.html
└── dist/                      # 构建产物
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

## 配置指南

### 站点配置 — `config/site.config.json`

```jsonc
{
  "nav": {
    "logo": { "text": "LLY", "icon": "fas fa-cube" },
    "items": [
      { "label": "首页", "href": "/" },
      { "label": "技能", "href": "/#skills" }
    ]
  },
  "hero": {
    "name": "张三",
    "title": "前端开发 / 全栈工程师",
    "description": "...",
    "avatar": { "text": "Z" }
  },
  "skills": [
    { "icon": "fas fa-code", "title": "前端开发", "description": "...", "tags": ["Vue 3", "React"] }
  ],
  "social": [
    { "name": "GitHub", "icon": "fab fa-github", "url": "https://github.com" }
  ],
  "background": {
    "color": "#0a0a14",
    "image": "",
    "gridOverlay": true
  },
  "accent": "#0ea5e9",
  "footer": { "copyright": "© 2026 LLY." }
}
```

### 添加新作品

1. 在 `config/artwork/` 下创建 JSON 文件：

```json
{
  "icon": "fas fa-robot",
  "title": "项目名称",
  "description": "简短描述",
  "fullDescription": "详细描述（支持多段文本）",
  "type": "web",
  "tags": ["Vue", "Node.js"],
  "status": "active",
  "nature": "non-profit",
  "authors": ["作者名"],
  "links": [
    { "label": "GitHub", "url": "https://github.com/..." },
    { "label": "在线演示", "url": "https://..." }
  ],
  "license": "MIT"
}
```

2. 运行 `npm run build` 即可自动生成项目详情页并更新作品列表。

### 添加链接 — `config/links.config.json`

```jsonc
{
  "title": "链接",
  "description": "...",
  "items": [
    {
      "name": "GitHub",
      "url": "https://github.com/...",
      "icon": "fab fa-github",
      "type": "personal",       // personal | collaboration | friend
      "description": "..."
    }
  ]
}
```

### 公告栏 — `config/announcement.config.json`

```jsonc
{
  "enabled": true,
  "text": "公告内容",
  "link": "https://...",
  "linkText": "了解更多",
  "type": "info",
  "dismissible": true
}
```

## 自定义主题

修改 `src/styles/global.css` 中的 CSS 变量：

```css
:root {
  --accent: #0ea5e9;           /* 主题色 */
  --bg-primary: #0a0a14;       /* 主背景 */
  --bg-secondary: #111827;     /* 卡片背景 */
  --text-primary: #f1f5f9;     /* 主文字 */
  --max-width: 1200px;         /* 内容最大宽度 */
}
```

## 构建原理

1. `generate-project-pages.mjs` 读取 `config/artwork/*.json`
2. 聚合数据到 `config/_projects-data.json`
3. 为每个作品生成独立 HTML 页面和 JS 入口文件
4. Vite 多页构建，输出 `dist/` 目录

## 部署

构建后的 `dist/` 目录可直接部署到任意静态托管服务：

- GitHub Pages
- Netlify
- Vercel
- 任意 Nginx / Apache 服务器
