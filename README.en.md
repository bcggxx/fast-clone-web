# fast-clone-web
> 中文版：[README.md](README.md)

The official showcase website for the [fast-clone](https://github.com/bcggxx/fast-clone) project.

Pure static HTML / CSS / JavaScript — zero dependencies, zero build step. Deploy it to any static host such as Cloudflare Pages or GitHub Pages.

## ✨ Features

- **Fully static** — a single HTML + CSS + JS page, no Node build environment required
- **Responsive** — adapts to desktop / tablet / mobile
- **Dark / Light theme** — follows the system preference, with manual toggle that is remembered
- **One-click copy** — click any code block to copy, with a toast hint
- **Live mirror list** — data lives in `script.js`, easy to update
- **Terminal demo animation** — typing / fade-in effect in the Hero section
- **Bilingual (zh / en)** — auto-detects the browser language and switches, with a manual toggle that is remembered

## 📁 Project structure

```
fast-clone-web/
├── index.html      ← page structure
├── style.css       ← styles (theme variables and i18n)
├── script.js       ← interaction logic + mirror/option data + i18n strings
└── README.en.md
```

## 🚀 Local preview

No build tools needed — just open `index.html` in a browser.

Or start a local static server (optional):

```bash
# Python 3
python3 -m http.server 8080

# or Node (npx)
npx serve .
```

Then visit http://localhost:8080.

## ☁️ Deploy to Cloudflare Pages

### Option A: Connect a Git repo (recommended, auto-deploy)

1. Push this repo to GitHub
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Authorize and select this repo
4. Build settings:
   - **Framework preset**: `None`
   - **Build command**: leave empty
   - **Build output directory**: `/` (or `.`)
5. Click **Save and Deploy**

You'll get a `*.pages.dev` URL. Every `git push` redeploys automatically.

### Option B: Upload via the Wrangler CLI

```bash
npm i -g wrangler
wrangler login
wrangler pages deploy . --project-name=fast-clone-web
```

### Bind a custom domain

In the Cloudflare Pages project → **Custom domains** → **Set up a custom domain**, follow the prompts to add the domain and DNS records (automatic HTTPS).

## 🔗 Related repositories

- Main project: [bcggxx/fast-clone](https://github.com/bcggxx/fast-clone)

## 📄 License

This project is open source under the **MIT License**.

- **Copyright**: Copyright (c) 2026 bcggxx
- **Core rights**: You may use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, for both personal and commercial purposes.
- **Only condition**: The above copyright notice and this permission notice must be included in all copies or substantial portions of the software.
- **Disclaimer**: The software is provided "as is", without warranty of any kind, express or implied. The authors or copyright holders are not liable for any claim, damages, or other liability.

The full license text is in the [`LICENSE`](LICENSE) file at the repository root.
