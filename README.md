<div align="center">

# ✦ Lantxx Homepage

**认知无限，创造无穷 · Endless Curiosity, Boundless Creation**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-pink?labelColor=black)](./LICENSE)

<br />

[🌐 在线演示](https://lantxx.com.cn) · [📸 功能截图](#-功能截图) · [🚀 快速开始](#-快速开始) · [⚙️ 自定义配置](#️-自定义配置) · [📁 项目结构](#-项目结构)

<br />

![Lantxx Homepage Preview](https://via.placeholder.com/1200x600?text=Lantxx+Homepage+Preview)

<br />

</div>

---

## ✨ 项目简介

Lantxx Homepage 是一个精心打磨的**个人主页 & 博客系统**，使用 Next.js 16 + React 19 + Tailwind CSS 4 + Motion 构建。它不仅仅是一个博客——它是开发者、创作者和音游玩家的个人数字空间。

> 💡 **设计哲学**：极简但不冷淡，精致但不繁复，每一个像素都经过深思熟虑。

<br />

## 📸 功能截图

<table>
  <tr>
    <td align="center"><b>🏠 首页 Hero</b></td>
    <td align="center"><b>📰 博客</b></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/560x315?text=Homepage+Hero+Section" alt="Homepage Hero" /></td>
    <td><img src="https://via.placeholder.com/560x315?text=Blog+Page" alt="Blog" /></td>
  </tr>
  <tr>
    <td align="center"><b>🎵 音乐播放器</b></td>
    <td align="center"><b>🃏 社交卡片</b></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/560x315?text=Music+Player+Page" alt="Music Player" /></td>
    <td><img src="https://via.placeholder.com/560x315?text=Social+Cards+Page" alt="Social Cards" /></td>
  </tr>
  <tr>
    <td align="center"><b>👤 关于页面</b></td>
    <td align="center"><b>📦 项目展示</b></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/560x315?text=About+Page" alt="About" /></td>
    <td><img src="https://via.placeholder.com/560x315?text=Projects+Page" alt="Projects" /></td>
  </tr>
</table>

<br />

## 🌟 功能特性

### 🎨 视觉与交互

- **深色 / 浅色主题切换** — 基于 `next-themes`，丝滑过渡动画
- **Motion 动效引擎** — 页面元素进场动画、悬浮微交互、滚动触发动效
- **响应式设计** — 完美适配桌面、平板、手机
- **磨砂玻璃导航栏** — 滚动时自动启用 backdrop-filter 模糊效果
- **自定义 CSS 变量主题** — 一键修改主题色（accent 为粉色系）

### 📝 博客系统

- **Markdown 写作** — 支持标题、代码块、表格、引用等完整排版
- **GFM 语法** — 表格、任务列表、删除线
- **标签筛选** — 按标签分类浏览文章
- **搜索功能** — 快速检索文章内容
- **阅读时间估算** — 自动计算文章阅读时长
- **代码块** — 带语言标识和复制按钮

### 🎵 音乐播放器

- **在线播放** — 支持播放、暂停、进度拖拽
- **音频可视化** — 基于 Web Audio API 的实时频谱柱状图
- **封面自动提取** — 从音频文件自动解析封面图
- **下载支持** — 提供曲目直接下载

### 🃏 社交卡片

- **GitHub 卡片** — 自动拉取头像和仓库信息
- **Bilibili 卡片** — 自动拉取头像和视频列表
- **osu! 卡片** — 自动拉取头像和最近成绩（默认 Mania 模式）
- **Twitter/X 卡片** — 自动拉取头像和推文

### 🌍 国际化 (i18n)

- **中英双语** — 完整的中文和英文翻译
- **自动语言检测** — 根据浏览器语言自动切换
- **一键切换** — 导航栏语言切换按钮

### 📦 项目展示

- **分类筛选** — 开源项目 / Minecraft 模组
- **标签系统** — 技术栈标签展示
- **卡片式布局** — 优雅的项目卡片设计

### 📬 联系表单

- **消息发送** — 姓名、邮箱、主题、内容
- **表单验证** — 前端输入验证
- **发送反馈** — 成功/失败状态提示

<br />

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
| :--- | :---: | :--- |
| **Next.js** | 16.2 | React 全栈框架 (App Router) |
| **React** | 19.2 | UI 渲染 |
| **TypeScript** | 5 | 类型安全 |
| **Tailwind CSS** | 4 | 原子化 CSS |
| **Motion** | 12 | 动画引擎 (原 Framer Motion) |
| **next-themes** | 0.4 | 深色模式管理 |
| **gray-matter** | 4 | Markdown frontmatter 解析 |
| **unified** | 11 | Markdown 渲染管线 (remark + rehype) |

<br />

## 🚀 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** 或 **pnpm** 或 **yarn**

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/LamborGitted/Kazi.git
cd Kazi

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可查看。

### 构建部署

```bash
# 构建
npm run build

# 启动生产服务
npm start
```

<br />

## ⚙️ 自定义配置

所有配置集中在 `config/` 目录下，修改对应的 data 文件即可：

| 文件 | 功能 |
| :--- | :--- |
| `config/base.data.ts` | 网站标题与描述 |
| `config/home.data.ts` | 首页内容、社交链接 |
| `config/header.data.ts` | 导航栏菜单 |
| `config/about.data.ts` | 关于页面数据 |
| `config/projects.data.ts` | 项目列表 |
| `config/music.data.ts` | 音乐曲目列表 |
| `config/social.data.ts` | 社交卡片配置 (GitHub / Bilibili / osu! / Twitter) |
| `config/control.data.ts` | 控制面板组件与默认主题色 |
| `config/i18n/translations.ts` | 中英文翻译文本 |

### 修改主题色

编辑 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --accent: #ec4899;        /* 主强调色 */
  --accent-glow: rgba(236, 72, 153, 0.15);
}

.dark {
  --accent: #f472b6;        /* 深色模式强调色 */
  --accent-glow: rgba(244, 114, 182, 0.12);
}
```

### 写博客

在 `content/posts/` 目录下创建 `.md` 文件：

```markdown
---
title: 我的第一篇博客
date: 2026-04-19
tags: [React, Next.js]
excerpt: 这是文章摘要
---

# 标题

正文内容...
```

中文文章放在 `content/posts/zh/` 目录下。

<br />

## 📁 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── layout.tsx          # 根布局
│   ├── globals.css         # 全局样式 & 主题变量
│   ├── about/              # 关于页面
│   ├── blog/               # 博客页面
│   ├── music/              # 音乐页面
│   ├── projects/           # 项目页面
│   ├── social/             # 社交卡片页面
│   ├── contact/            # 联系页面
│   └── api/                # API 路由
├── components/             # React 组件
│   ├── Header.tsx          # 导航栏
│   ├── Footer.tsx          # 页脚
│   ├── HeroSection.tsx     # 首页 Hero 区域
│   ├── AboutSection.tsx    # 首页关于区域
│   ├── MusicPlayer.tsx     # 音乐播放器
│   ├── SocialPreview.tsx   # 社交预览
│   ├── ThemeToggle.tsx     # 主题切换
│   ├── LanguageToggle.tsx  # 语言切换
│   ├── ThemeProvider.tsx   # 主题 Provider
│   ├── LanguageProvider.tsx# 语言 Provider
│   ├── Switcher.tsx        # 控制面板开关
│   └── blog/               # 博客相关组件
├── config/                 # 配置数据
│   ├── base.data.ts
│   ├── home.data.ts
│   ├── header.data.ts
│   ├── projects.data.ts
│   ├── music.data.ts
│   ├── social.data.ts
│   ├── control.data.ts
│   └── i18n/               # 国际化
├── content/                # Markdown 博客内容
│   └── posts/
├── utils/                  # 工具函数
├── public/                 # 静态资源
│   ├── image/
│   └── music/
└── package.json
```

<br />

## 📊 项目统计

![GitHub stars](https://img.shields.io/github/stars/LamborGitted/Kazi?style=social)
![GitHub forks](https://img.shields.io/github/forks/LamborGitted/Kazi?style=social)
![GitHub issues](https://img.shields.io/github/issues/LamborGitted/Kazi)
![GitHub license](https://img.shields.io/github/license/LamborGitted/Kazi)

![Alt](https://repobeats.axiom.co/api/embed/3e5b6b55e2e98a38bf24f5e4ca3c5c79e2465c8f.svg "Repobeats analytics image")

<br />

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交修改 (`git commit -m 'Add some amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

<br />

## 📄 开源协议

本项目基于 [MIT License](./LICENSE) 开源。

<br />

<div align="center">

**[lantxx.com.cn](https://lantxx.com.cn)**

用 ❤️ 和代码构建

</div>
