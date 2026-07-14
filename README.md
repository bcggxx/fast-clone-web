# fast-clone-web

[fast-clone](https://github.com/bcggxx/fast-clone) 项目的官方展示网站。

纯静态 HTML / CSS / JavaScript，零依赖、零构建步骤，可直接部署到 Cloudflare Pages、GitHub Pages 等任意静态托管平台。

## ✨ 特性

- **纯静态** — 单页 HTML + CSS + JS，无需 Node 构建环境
- **响应式** — 桌面 / 平板 / 移动端自适应
- **深色 / 浅色主题** — 跟随系统偏好，可手动切换并记忆
- **代码块一键复制** — 点击即复制，带 toast 提示
- **镜像列表实时渲染** — 数据集中在 `script.js`，更新方便
- **终端演示动画** — Hero 区域带打字渐入效果

## 📁 项目结构

```
fast-clone-web/
├── index.html      ← 页面结构
├── style.css       ← 样式（含主题变量）
├── script.js       ← 交互逻辑 + 镜像/参数数据
└── README.md
```

## 🚀 本地预览

无需任何构建工具，直接用浏览器打开 `index.html` 即可。

或启动一个本地静态服务器（可选）：

```bash
# Python 3
python3 -m http.server 8080

# 或 Node (npx)
npx serve .
```

然后访问 http://localhost:8080。

## ☁️ 部署到 Cloudflare Pages

### 方式 A：连接 Git 仓库（推荐，自动部署）

1. 把本仓库推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 授权并选择该仓库
4. 构建设置：
   - **Framework preset**: `None`
   - **Build command**: 留空
   - **Build output directory**: `/`（或 `.`）
5. 点 **Save and Deploy**

部署完成后会得到一个 `*.pages.dev` 地址。以后 `git push` 即自动重新部署。

### 方式 B：Wrangler CLI 直接上传

```bash
npm i -g wrangler
wrangler login
wrangler pages deploy . --project-name=fast-clone-web
```

### 绑定自定义域名

在 Cloudflare Pages 项目 → **Custom domains** → **Set up a custom domain**，按提示添加域名和 DNS 记录即可（自动 HTTPS）。

## 🔗 相关仓库

- 主项目：[bcggxx/fast-clone](https://github.com/bcggxx/fast-clone)

## 📄 License

MIT
