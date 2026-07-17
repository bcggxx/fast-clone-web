/* ===========================================================================
   fast-clone 展示页交互逻辑
   =========================================================================== */
(function () {
  'use strict';

  /* ---------- 语言字典 ---------- */
  var I18N = {
    zh: {
      'nav.features': '特性',
      'nav.mirrors': '镜像',
      'nav.quickstart': '快速开始',
      'nav.usage': '用法',
      'nav.options': '参数',
      'nav.license': '许可证',
      'themeTitle': '切换主题',
      'langTitle': '切换语言',
      'hero.badge': '纯 vibe coding · 全程 AI 辅助生成',
      'hero.title1': '镜像加速 git clone',
      'hero.title2': '下载快，push 安全',
      'hero.desc': '从镜像站下载（快），克隆完成后<strong>自动重置 remote 为官方地址</strong>，后续 <code>pull</code> / <code>push</code> 走官方仓库（安全）。零外部依赖，仅用 Python 标准库。',
      'hero.cta1': '快速开始',
      'hero.cta2': '查看源码',
      'hero.stat1': '内置镜像',
      'hero.stat2': '外部依赖',
      'hero.stat3': 'Python 版本',
      'hero.stat4': '语言支持',
      'value.1': '下载快',
      'value.2': '镜像加速',
      'value.3': '自动重置 remote',
      'value.4': 'pull / push 安全',
      'features.tag': '为什么选择我们',
      'features.title': '十一个理由，值得拥有',
      'features.sub': '安全、零依赖、智能保护，专为加速而设计。',
      'mirrors.tag': '可用镜像',
      'mirrors.title': '11 个内置镜像站',
      'mirrors.sub': '覆盖前缀代理 / 域名替换 / 路径前缀等多种策略，自动检测 IPv4/IPv6。',
      'mirrors.th.key': 'key',
      'mirrors.th.mirror': '镜像站',
      'mirrors.th.type': '类型',
      'mirrors.th.latency': '延迟',
      'mirrors.th.ip': 'IP',
      'mirrors.th.desc': '说明',
      'mirrors.default': '默认',
      'mirrors.note': '延迟为 2026-07-14 Windows TCP 443 端口实测，3 次测试取均值。带 <span class="default-tag">默认</span> 标记为当前默认镜像。',
      'quickstart.tag': '快速开始',
      'quickstart.title': '三步上手',
      'quickstart.sub': '克隆仓库 → 运行安装脚本 → 任意终端使用 <code>fast-clone</code>。',
      'quickstart.s1.title': '获取工具',
      'quickstart.s1.desc': '仓库保存在本地固定位置，安装后不要移动目录。',
      'quickstart.s2.title': '安装',
      'quickstart.s2.win': 'Windows',
      'quickstart.s2.linux': 'Linux',
      'quickstart.s2.note': '前置依赖：Python 3.7+ 与 Git。',
      'quickstart.s3.title': '开始使用',
      'quickstart.s3.desc': '安装后任意终端可用 <code>fast-clone</code> 命令。',
      'quickstart.install': '安装',
      'usage.tag': '用法示例',
      'usage.title': '常用命令',
      'usage.sub': '不确定哪个镜像最快？加 <code>--fastest</code> 自动测速。',
      'protection.tag': '自动保护',
      'protection.title': '克隆失败概率极低',
      'protection.sub': '速度监控 + 自动重试 + 兜底直连，三重保障。',
      'options.tag': '完整参数',
      'options.title': '命令行选项',
      'options.sub': '所有可用参数一览。',
      'options.th.param': '参数',
      'options.th.short': '简写',
      'options.th.desc': '说明',
      'license.tag': '许可证',
      'license.title': 'MIT 开源许可',
      'license.sub': 'fast-clone 及其官方展示站（本网站）均基于 MIT 许可证发布，可自由使用、修改、分发。',
      'license.link': '查看完整许可证文本',
      'cta.title': '现在就开始加速你的 clone',
      'cta.desc': '零依赖、纯 Python 标准库，克隆即用。',
      'cta.btn1': '前往 GitHub',
      'cta.btn2': '查看安装教程',
      'footer.desc': '镜像加速 git clone，克隆完成后自动重置 remote 为官方地址。',
      'footer.docs': '文档',
      'footer.vibe': 'Pure vibe coding ✨',
      'toast.copy': '已复制到剪贴板',
      'toast.fail': '复制失败，请手动复制',
      'code.copy': '复制',
      'code.copied': '已复制 ✓',
      'meta.desc': 'fast-clone — 镜像加速 git clone，克隆完成后自动重置 remote 为官方地址。下载快，pull/push 安全，零依赖。',
      'meta.ogTitle': 'fast-clone — 镜像加速 git clone',
      'meta.ogDesc': '镜像加速克隆 GitHub/GitLab 仓库，克隆完成后自动重置 remote。零依赖，纯 Python 标准库。',
      'doc.title': 'fast-clone — 镜像加速 git clone'
    },
    en: {
      'nav.features': 'Features',
      'nav.mirrors': 'Mirrors',
      'nav.quickstart': 'Quick Start',
      'nav.usage': 'Usage',
      'nav.options': 'Options',
      'nav.license': 'License',
      'themeTitle': 'Toggle theme',
      'langTitle': 'Switch language',
      'hero.badge': 'Pure vibe coding · fully AI-assisted',
      'hero.title1': 'Mirror-accelerated git clone',
      'hero.title2': 'Fast download, safe push',
      'hero.desc': 'Download from a mirror (fast); after cloning, <strong>remote is reset to the official URL</strong> automatically so later <code>pull</code> / <code>push</code> go to the official repo (safe). Zero external dependencies — Python stdlib only.',
      'hero.cta1': 'Get Started',
      'hero.cta2': 'View Source',
      'hero.stat1': 'Built-in mirrors',
      'hero.stat2': 'Dependencies',
      'hero.stat3': 'Python version',
      'hero.stat4': 'Languages',
      'value.1': 'Fast download',
      'value.2': 'Mirror boost',
      'value.3': 'Auto-reset remote',
      'value.4': 'Safe pull / push',
      'features.tag': 'Why us',
      'features.title': 'Eleven reasons worth it',
      'features.sub': 'Secure, zero-dependency, smart protection — designed for speed.',
      'mirrors.tag': 'Available mirrors',
      'mirrors.title': '11 built-in mirror sites',
      'mirrors.sub': 'Covers prefix-proxy / domain-swap / path-prefix strategies, with auto IPv4/IPv6 detection.',
      'mirrors.th.key': 'key',
      'mirrors.th.mirror': 'Mirror',
      'mirrors.th.type': 'Type',
      'mirrors.th.latency': 'Latency',
      'mirrors.th.ip': 'IP',
      'mirrors.th.desc': 'Notes',
      'mirrors.default': 'Default',
      'mirrors.note': 'Latency measured on 2026-07-14 over Windows TCP port 443, averaged over 3 runs. Rows tagged <span class="default-tag">Default</span> mark the current default mirror.',
      'quickstart.tag': 'Quick Start',
      'quickstart.title': 'Three steps to go',
      'quickstart.sub': 'Clone the repo → run the installer → use <code>fast-clone</code> in any terminal.',
      'quickstart.s1.title': 'Get the tool',
      'quickstart.s1.desc': 'Keep the repo at a fixed local path; do not move it after installing.',
      'quickstart.s2.title': 'Install',
      'quickstart.s2.win': 'Windows',
      'quickstart.s2.linux': 'Linux',
      'quickstart.s2.note': 'Prerequisites: Python 3.7+ and Git.',
      'quickstart.s3.title': 'Start using',
      'quickstart.s3.desc': 'After install, the <code>fast-clone</code> command works in any terminal.',
      'quickstart.install': 'Install',
      'usage.tag': 'Usage examples',
      'usage.title': 'Common commands',
      'usage.sub': 'Not sure which mirror is fastest? Add <code>--fastest</code> to auto-benchmark.',
      'protection.tag': 'Auto protection',
      'protection.title': 'Clone failures are very rare',
      'protection.sub': 'Speed monitoring + auto-retry + direct fallback — triple guarantee.',
      'options.tag': 'Full options',
      'options.title': 'Command-line options',
      'options.sub': 'All available parameters at a glance.',
      'options.th.param': 'Option',
      'options.th.short': 'Alias',
      'options.th.desc': 'Description',
      'license.tag': 'License',
      'license.title': 'MIT open-source license',
      'license.sub': 'Both fast-clone and its official showcase site (this website) are released under the MIT License — free to use, modify, and distribute.',
      'license.link': 'View full license text',
      'cta.title': 'Start accelerating your clone now',
      'cta.desc': 'Zero dependencies, pure Python stdlib — clone and go.',
      'cta.btn1': 'Go to GitHub',
      'cta.btn2': 'View install guide',
      'footer.desc': 'Mirror-accelerated git clone; remote is reset to the official URL after cloning.',
      'footer.docs': 'Docs',
      'footer.vibe': 'Pure vibe coding ✨',
      'toast.copy': 'Copied to clipboard',
      'toast.fail': 'Copy failed, please copy manually',
      'code.copy': 'Copy',
      'code.copied': 'Copied ✓',
      'meta.desc': 'fast-clone — mirror-accelerated git clone; after cloning, remote is reset to the official URL. Fast download, safe pull/push, zero dependencies.',
      'meta.ogTitle': 'fast-clone — mirror-accelerated git clone',
      'meta.ogDesc': 'Mirror-accelerated cloning of GitHub/GitLab repos; remote is reset automatically afterward. Zero dependencies, pure Python stdlib.',
      'doc.title': 'fast-clone — mirror-accelerated git clone'
    }
  };

  /* ---------- 多语言数据 ---------- */
  var FEATURES = [
    { icon: '🔒', zh: { title: '安全无忧', desc: '克隆完成后<strong>自动重置 remote 为官方地址</strong>，下载快、pull/push 安全。' }, en: { title: 'Secure', desc: 'After cloning, <strong>remote is reset to the official URL</strong> automatically — fast download, safe pull/push.' } },
    { icon: '🔍', zh: { title: '代码可审计', desc: '纯文本 Python 源码，无二进制、无混淆、无编译产物，代码完全公开可审查。' }, en: { title: 'Auditable', desc: 'Plain-text Python source, no binaries, no obfuscation, no build artifacts — fully open and auditable.' } },
    { icon: '📦', zh: { title: '零依赖', desc: '仅使用 Python 标准库，<strong>无需 pip install</strong> 任何包。' }, en: { title: 'Zero dependencies', desc: 'Uses only the Python standard library — <strong>no pip install</strong> needed.' } },
    { icon: '🛡️', zh: { title: '智能保护', desc: '速度监控 + 自动重试 + 兜底直连，克隆失败概率<strong>极低</strong>。' }, en: { title: 'Smart protection', desc: 'Speed monitoring + auto-retry + direct fallback keep clone failures <strong>extremely rare</strong>.' } },
    { icon: '🪞', zh: { title: '多镜像支持', desc: '内置 11 个镜像站，覆盖前缀代理 / 域名替换 / 路径前缀等多种策略。' }, en: { title: 'Multi-mirror', desc: '11 built-in mirrors covering prefix-proxy / domain-swap / path-prefix strategies.' } },
    { icon: '🌐', zh: { title: '网络自适应', desc: '自动检测本机 IPv4/IPv6 支持，<strong>跳过不可用镜像</strong>。' }, en: { title: 'Network-adaptive', desc: 'Auto-detects IPv4/IPv6 support and <strong>skips unreachable mirrors</strong>.' } },
    { icon: '💾', zh: { title: '测速缓存', desc: '7 天内测速结果复用，<strong>避免重复测速</strong>浪费时间。' }, en: { title: 'Speed cache', desc: 'Reuses speed tests for 7 days to <strong>avoid redundant probing</strong>.' } },
    { icon: '⚡', zh: { title: '每日状态报告', desc: 'GitHub Actions 每日自动测试镜像可达性并以 Release 发布报告。' }, en: { title: 'Daily status', desc: 'GitHub Actions tests reachability daily and publishes a report as a Release.' } },
    { icon: '🌍', zh: { title: '双语支持', desc: '中英文自动检测切换，<strong>开箱即用</strong>。' }, en: { title: 'Bilingual', desc: 'Auto-detects zh/en and switches — <strong>works out of the box</strong>.' } },
    { icon: '⚙️', zh: { title: '高度可定制', desc: '编辑 mirror.json 即可增删镜像，<strong>下次运行即生效</strong>。' }, en: { title: 'Highly customizable', desc: 'Edit mirror.json to add/remove mirrors — <strong>applied on next run</strong>.' } },
    { icon: '📜', zh: { title: '开源许可', desc: '基于 MIT 许可证发布，可自由<strong>使用、修改、分发</strong>，含完整版权与免责声明。' }, en: { title: 'Open source', desc: 'Released under the MIT License — free to <strong>use, modify, distribute</strong>, with full copyright and disclaimer.' } }
  ];

  var MIRRORS = [
    { key: 'gh-proxy-org', name: 'gh-proxy.org', type: { zh: '前缀代理', en: 'Prefix proxy' }, latency: 188, ip: 'dual', desc: { zh: '默认镜像', en: 'Default mirror' }, def: true },
    { key: 'gh-proxy-v4', name: 'v4.gh-proxy.org', type: { zh: '前缀代理', en: 'Prefix proxy' }, latency: 133, ip: 'v4', desc: { zh: '仅 IPv4 智能解析', en: 'IPv4-only smart resolution' }, def: false },
    { key: 'gh-proxy-v6', name: 'v6.gh-proxy.org', type: { zh: '前缀代理', en: 'Prefix proxy' }, latency: 206, ip: 'v6', desc: { zh: 'IPv6/IPv4 双栈', en: 'IPv6/IPv4 dual-stack' }, def: false },
    { key: 'gh-proxy-cdn', name: 'cdn.gh-proxy.org', type: { zh: '前缀代理', en: 'Prefix proxy' }, latency: 230, ip: 'dual', desc: { zh: 'Fastly CDN 加速', en: 'Fastly CDN accelerated' }, def: false },
    { key: 'kkgithub', name: 'kkgithub.com', type: { zh: '域名替换', en: 'Domain swap' }, latency: 225, ip: 'dual', desc: { zh: '—', en: '—' }, def: false },
    { key: 'github-akams', name: 'github.akams.cn', type: { zh: '前缀代理', en: 'Prefix proxy' }, latency: 34, ip: 'dual', desc: { zh: '—', en: '—' }, def: false },
    { key: 'gitclone', name: 'gitclone.com', type: { zh: '路径前缀', en: 'Path prefix' }, latency: 59, ip: 'v4', desc: { zh: 'CN 服务器', en: 'CN server' }, def: false },
    { key: 'github-ur1', name: 'github.ur1.fun', type: { zh: '域名替换', en: 'Domain swap' }, latency: 197, ip: 'dual', desc: { zh: '—', en: '—' }, def: false },
    { key: 'gh-proxy-com', name: 'gh-proxy.com', type: { zh: '前缀代理', en: 'Prefix proxy' }, latency: 34, ip: 'dual', desc: { zh: '—', en: '—' }, def: false },
    { key: 'ghproxy-net', name: 'ghproxy.net', type: { zh: '前缀代理', en: 'Prefix proxy' }, latency: 255, ip: 'dual', desc: { zh: '—', en: '—' }, def: false },
    { key: 'jihulab', name: 'jihulab.com', type: { zh: 'GitLab 极狐', en: 'GitLab (JiHu)' }, latency: 52, ip: 'dual', desc: { zh: '—', en: '—' }, def: false }
  ];

  var IP_LABELS = {
    dual: { zh: '双栈', en: 'Dual' },
    v4: { zh: 'IPv4', en: 'IPv4' },
    v6: { zh: 'IPv6', en: 'IPv6' }
  };

  var OPTIONS = [
    { arg: 'url', short: '—', desc: { zh: '官方仓库地址', en: 'Official repo URL' } },
    { arg: '--mirror', short: '-m', desc: { zh: '指定镜像 key', en: 'Specify mirror key' } },
    { arg: '--fastest', short: '-f', desc: { zh: '自动测速选最快', en: 'Auto-pick the fastest' } },
    { arg: '--list-mirrors', short: '-l', desc: { zh: '列出全部镜像', en: 'List all mirrors' } },
    { arg: '--branch', short: '-b', desc: { zh: '指定分支', en: 'Specify branch' } },
    { arg: '--depth', short: '-d', desc: { zh: '浅克隆深度', en: 'Shallow clone depth' } },
    { arg: '--single-branch', short: '—', desc: { zh: '仅单分支', en: 'Single branch only' } },
    { arg: '--target', short: '—', desc: { zh: '目标目录名', en: 'Target directory name' } },
    { arg: '--dry-run', short: '-n', desc: { zh: '预览不克隆', en: 'Preview without cloning' } },
    { arg: '--min-speed', short: '—', desc: { zh: '最低速度 MB/s', en: 'Min speed MB/s' } },
    { arg: '--speed-timeout', short: '—', desc: { zh: '超时秒数', en: 'Timeout seconds' } },
    { arg: '--help', short: '-h', desc: { zh: '帮助', en: 'Help' } }
  ];

  var USAGE = [
    { tag: { zh: '默认', en: 'Default' }, cls: '', title: { zh: '默认镜像克隆', en: 'Clone with default mirror' }, desc: { zh: '使用 <code>gh-proxy.org</code> 前缀代理镜像。', en: 'Uses the <code>gh-proxy.org</code> prefix-proxy mirror.' }, cmd: 'fast-clone https://github.com/user/repo' },
    { tag: { zh: '推荐', en: 'Recommended' }, cls: 'tag-accent', title: { zh: '自动测速选最快', en: 'Pick fastest automatically' }, desc: { zh: '实时 TCP 测速，选延迟最低的镜像。', en: 'Live TCP speed test, picks the lowest-latency mirror.' }, cmd: 'fast-clone --fastest https://github.com/user/repo' },
    { tag: { zh: '指定', en: 'Specified' }, cls: '', title: { zh: '指定镜像', en: 'Specify a mirror' }, desc: { zh: '用 <code>--mirror</code> 显式指定镜像 key。', en: 'Use <code>--mirror</code> to set the mirror key explicitly.' }, cmd: 'fast-clone --mirror github-akams https://github.com/user/repo' },
    { tag: { zh: '预览', en: 'Preview' }, cls: '', title: { zh: '预览不克隆', en: 'Preview without cloning' }, desc: { zh: '用 <code>-n</code> 只看 URL 转换结果。', en: 'Use <code>-n</code> to see only the transformed URL.' }, cmd: 'fast-clone -n https://github.com/user/repo' },
    { tag: { zh: '浅克隆', en: 'Shallow' }, cls: '', title: { zh: '指定分支与深度', en: 'Branch & depth' }, desc: { zh: '配合 <code>-b</code> / <code>-d</code> 做浅克隆。', en: 'Combine <code>-b</code> / <code>-d</code> for a shallow clone.' }, cmd: 'fast-clone -b main --depth 1 https://github.com/user/repo' },
    { tag: { zh: '列表', en: 'List' }, cls: '', title: { zh: '列出全部镜像', en: 'List all mirrors' }, desc: { zh: '用 <code>-l</code> 查看所有可用镜像详情。', en: 'Use <code>-l</code> to see details of every available mirror.' }, cmd: 'fast-clone -l' }
  ];

  var PROTECTION = [
    { icon: '📊', zh: { title: '速度监控', desc: '持续低于 <strong>1 MB/s</strong> 达 3 分钟 → 自动中止、清残留、换镜像。' }, en: { title: 'Speed monitoring', desc: 'Stays below <strong>1 MB/s</strong> for 3 min → abort, clean up, switch mirror.' } },
    { icon: '🔁', zh: { title: '连接重试', desc: '每个镜像连接失败自动重试 <strong>3 次</strong>，仍失败则换下一个镜像。' }, en: { title: 'Auto-retry', desc: 'Each failed mirror connection retries <strong>3 times</strong>, then moves to the next.' } },
    { icon: '🎯', zh: { title: '兜底直连', desc: '全部镜像失败后，最后尝试官方仓库直连，确保克隆能完成。' }, en: { title: 'Direct fallback', desc: 'If all mirrors fail, attempts a direct official connection to ensure completion.' } }
  ];

  var LICENSE_LIST = {
    zh: [
      '<strong>核心权利</strong>：可自由使用、复制、修改、合并、发布、分发、再授权和/或出售本软件副本，包括个人与商业用途。',
      '<strong>唯一条件</strong>：在软件的所有副本或实质部分中，必须包含上述版权声明与本许可声明。',
      '<strong>免责声明</strong>：本软件按「原样」提供，不附带任何明示或暗示的担保，作者或版权持有人对任何索赔、损害或其他责任概不负责。'
    ],
    en: [
      '<strong>Core rights</strong>: freely use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies, for personal and commercial use.',
      '<strong>Only condition</strong>: the above copyright and permission notices must appear in all copies or substantial portions.',
      '<strong>Disclaimer</strong>: the software is provided "as is", without warranty; authors are not liable for any claim or damage.'
    ]
  };

  var TERMINAL = {
    zh: [
      { c: '', t: '$ fast-clone --fastest https://github.com/user/repo' },
      { c: 'term-muted', t: '  -> 检测网络: IPv4 ✓  IPv6 ✓' },
      { c: 'term-muted', t: '  -> 测速 11 个镜像...' },
      { c: 'term-green', t: '  github-akams      33ms' },
      { c: '', t: '  kkgithub          48ms' },
      { c: '', t: '  gh-proxy-v4       43ms' },
      { c: 'term-muted', t: '  ...' },
      { c: 'term-cyan', t: '  -> 选定: github.akams.cn' },
      { c: '', t: '$ git clone --progress https://github.akams.cn/https://github.com/user/repo.git' },
      { c: 'term-muted', t: '  remote: Enumerating objects: 1248, done.' },
      { c: 'term-muted', t: '  接收对象中 48.2 MiB  @ 12.4 MiB/s' },
      { c: 'term-green', t: '  OK 克隆成功: github.akams.cn' },
      { c: 'term-green', t: "  OK remote 'origin' -> https://github.com/user/repo.git" }
    ],
    en: [
      { c: '', t: '$ fast-clone --fastest https://github.com/user/repo' },
      { c: 'term-muted', t: '  -> detecting network: IPv4 ✓  IPv6 ✓' },
      { c: 'term-muted', t: '  -> benchmarking 11 mirrors...' },
      { c: 'term-green', t: '  github-akams      33ms' },
      { c: '', t: '  kkgithub          48ms' },
      { c: '', t: '  gh-proxy-v4       43ms' },
      { c: 'term-muted', t: '  ...' },
      { c: 'term-cyan', t: '  -> selected: github.akams.cn' },
      { c: '', t: '$ git clone --progress https://github.akams.cn/https://github.com/user/repo.git' },
      { c: 'term-muted', t: '  remote: Enumerating objects: 1248, done.' },
      { c: 'term-muted', t: '  receiving objects 48.2 MiB  @ 12.4 MiB/s' },
      { c: 'term-green', t: '  OK cloned: github.akams.cn' },
      { c: 'term-green', t: "  OK remote 'origin' -> https://github.com/user/repo.git" }
    ]
  };

  /* ---------- 运行时状态 ---------- */
  var LANG = 'zh';

  /* ---------- 工具 ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function T(key) { return (I18N[LANG] && I18N[LANG][key]) || (I18N.zh[key]) || key; }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function latencyClass(ms) {
    if (ms <= 100) return 'latency-fast';
    if (ms <= 500) return 'latency-mid';
    return 'latency-slow';
  }

  /* ---------- 语言检测 ---------- */
  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem('fc-lang'); } catch (e) {}
    if (saved === 'zh' || saved === 'en') return saved;
    var nav = (navigator.language || navigator.userLanguage || 'zh');
    return /^zh/i.test(nav) ? 'zh' : 'en';
  }

  /* ---------- 应用语言（静态文案 + 元信息） ---------- */
  function applyStaticStrings() {
    $all('[data-i18n]').forEach(function (el) {
      el.textContent = T(el.getAttribute('data-i18n'));
    });
    $all('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = T(el.getAttribute('data-i18n-html'));
    });
    var docTitle = $('#docTitle');
    if (docTitle) docTitle.textContent = T('doc.title');
    var metaDesc = $('#metaDesc');
    if (metaDesc) metaDesc.setAttribute('content', T('meta.desc'));
    var metaOgTitle = $('#metaOgTitle');
    if (metaOgTitle) metaOgTitle.setAttribute('content', T('meta.ogTitle'));
    var metaOgDesc = $('#metaOgDesc');
    if (metaOgDesc) metaOgDesc.setAttribute('content', T('meta.ogDesc'));
    document.documentElement.lang = (LANG === 'zh') ? 'zh-CN' : 'en';
    var langLabel = $('#langLabel');
    if (langLabel) langLabel.textContent = (LANG === 'zh') ? 'EN' : '中';
    var themeToggle = $('#themeToggle');
    if (themeToggle) { themeToggle.title = T('themeTitle'); themeToggle.setAttribute('aria-label', T('themeTitle')); }
    var langToggle = $('#langToggle');
    if (langToggle) { langToggle.title = T('langTitle'); langToggle.setAttribute('aria-label', T('langTitle')); }
  }

  /* ---------- 应用语言（CSS 文案变量：复制提示等） ---------- */
  function applyLangVars() {
    var root = document.documentElement.style;
    root.setProperty('--copy-label', '"' + T('code.copy') + '"');
    root.setProperty('--copied-label', '"' + T('code.copied') + '"');
  }

  /* ---------- 渲染特性 ---------- */
  function renderFeatures() {
    var html = FEATURES.map(function (f) {
      var d = f[LANG];
      return '<div class="feature-card">' +
        '<div class="feature-icon">' + f.icon + '</div>' +
        '<h3>' + d.title + '</h3>' +
        '<p>' + d.desc + '</p>' +
        '</div>';
    }).join('');
    $('#featuresGrid').innerHTML = html;
  }

  /* ---------- 渲染镜像表 ---------- */
  function renderMirrors() {
    var html = MIRRORS.map(function (m) {
      var defTag = m.def ? '<span class="default-tag">' + T('mirrors.default') + '</span>' : '';
      return '<tr>' +
        '<td>' + escapeHtml(m.key) + defTag + '</td>' +
        '<td>' + escapeHtml(m.name) + '</td>' +
        '<td>' + escapeHtml(m.type[LANG]) + '</td>' +
        '<td><span class="latency-badge ' + latencyClass(m.latency) + '">' + m.latency + 'ms</span></td>' +
        '<td><span class="ip-badge">' + IP_LABELS[m.ip][LANG] + '</span></td>' +
        '<td>' + escapeHtml(m.desc[LANG]) + '</td>' +
        '</tr>';
    }).join('');
    $('#mirrorBody').innerHTML = html;
  }

  /* ---------- 渲染参数表 ---------- */
  function renderOptions() {
    var html = OPTIONS.map(function (o) {
      return '<tr><td>' + escapeHtml(o.arg) + '</td><td>' + escapeHtml(o.short) +
        '</td><td>' + escapeHtml(o.desc[LANG]) + '</td></tr>';
    }).join('');
    $('#optionsBody').innerHTML = html;
  }

  /* ---------- 渲染用法卡片 ---------- */
  function renderUsage() {
    var html = USAGE.map(function (u) {
      return '<div class="usage-card">' +
        '<div class="usage-card-head">' +
        '<span class="usage-tag ' + u.cls + '">' + u.tag[LANG] + '</span>' +
        '<h4>' + u.title[LANG] + '</h4>' +
        '</div>' +
        '<p>' + u.desc[LANG] + '</p>' +
        '<div class="code-block" data-copy="' + escapeHtml(u.cmd) + '"></div>' +
        '</div>';
    }).join('');
    var grid = $('#usageGrid');
    grid.innerHTML = html;
    $all('.code-block', grid).forEach(attachCopy);
  }

  /* ---------- 渲染自动保护 ---------- */
  function renderProtection() {
    var html = PROTECTION.map(function (p) {
      var d = p[LANG];
      return '<div class="protect-card">' +
        '<div class="protect-icon">' + p.icon + '</div>' +
        '<h3>' + d.title + '</h3>' +
        '<p>' + d.desc + '</p>' +
        '</div>';
    }).join('');
    $('#protectGrid').innerHTML = html;
  }

  /* ---------- 渲染许可证列表 ---------- */
  function renderLicense() {
    var html = LICENSE_LIST[LANG].map(function (li) {
      return '<li>' + li + '</li>';
    }).join('');
    $('#licenseList').innerHTML = html;
  }

  /* ---------- 渲染终端 ---------- */
  function renderTerminal(animate) {
    var body = $('#terminalBody');
    if (!body) return;
    var lines = TERMINAL[LANG];
    var html = lines.map(function (l) {
      var cls = l.c ? ('term-line ' + l.c) : 'term-line';
      var content = escapeHtml(l.t);
      if (/^\s*\$/.test(l.t)) {
        content = content.replace(/^\s*\$/, '<span class="prompt">$</span> ');
      }
      return '<div class="' + cls + '">' + content + '</div>';
    }).join('');
    html += '<div class="term-line cursor"><span class="prompt">$</span> <span class="cursor-block"></span></div>';
    body.innerHTML = html;

    var lineEls = $all('.term-line', body);
    if (animate) {
      startReveal(lineEls);
    } else {
      lineEls.forEach(function (line) {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      });
    }
  }

  function startReveal(lineEls) {
    lineEls.forEach(function (line) {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-8px)';
      line.style.transition = 'all 0.3s ease';
    });
    var started = false;
    function reveal() {
      if (started) return;
      started = true;
      lineEls.forEach(function (line, i) {
        setTimeout(function () {
          line.style.opacity = '1';
          line.style.transform = 'translateX(0)';
        }, i * 130);
      });
    }
    if ('IntersectionObserver' in window) {
      var target = lineEls[0] || body;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { reveal(); io.disconnect(); }
        });
      }, { threshold: 0.2 });
      io.observe(target);
    } else {
      reveal();
    }
  }

  /* ---------- 切换语言 ---------- */
  function setLang(next, animateTerminal) {
    LANG = next;
    try { localStorage.setItem('fc-lang', next); } catch (e) {}
    applyStaticStrings();
    applyLangVars();
    renderFeatures();
    renderMirrors();
    renderOptions();
    renderUsage();
    renderProtection();
    renderLicense();
    renderTerminal(animateTerminal);
  }

  /* ---------- 主题切换 ---------- */
  function applyTheme(next) {
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('fc-theme', next); } catch (e) {}
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('fc-theme'); } catch (e) {}
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    var toggle = $('#themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function (event) {
        var cur = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = cur === 'dark' ? 'light' : 'dark';

        var rect = toggle.getBoundingClientRect();
        var x = event.clientX || (rect.left + rect.width / 2);
        var y = event.clientY || (rect.top + rect.height / 2);
        var endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        var reduceMotion = window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (document.startViewTransition && !reduceMotion) {
          var transition = document.startViewTransition(function () { applyTheme(next); });
          transition.ready.then(function () {
            document.documentElement.animate(
              {
                clipPath: [
                  'circle(0px at ' + x + 'px ' + y + 'px)',
                  'circle(' + endRadius + 'px at ' + x + 'px ' + y + 'px)'
                ]
              },
              {
                duration: 520,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                pseudoElement: '::view-transition-new(root)'
              }
            );
          }).catch(function () { applyTheme(next); });
        } else if (!reduceMotion) {
          var bg = next === 'dark' ? '#0d1117' : '#ffffff';
          var overlay = document.createElement('div');
          overlay.className = 'theme-overlay';
          overlay.style.background = bg;
          overlay.style.left = x + 'px';
          overlay.style.top = y + 'px';
          overlay.style.width = (endRadius * 2) + 'px';
          overlay.style.height = (endRadius * 2) + 'px';
          overlay.style.marginLeft = -endRadius + 'px';
          overlay.style.marginTop = -endRadius + 'px';
          document.body.appendChild(overlay);
          void overlay.offsetWidth;
          overlay.classList.add('run');
          applyTheme(next);
          setTimeout(function () {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
          }, 520);
        } else {
          applyTheme(next);
        }
      });
    }
  }

  /* ---------- 导航栏滚动效果 ---------- */
  function initNav() {
    var nav = $('#nav');
    var burger = $('#navBurger');
    var links = $('#navLinks');

    function onScroll() {
      if (window.scrollY > 10) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      var toTop = $('#toTop');
      if (window.scrollY > 400) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger) {
      burger.addEventListener('click', function () { links.classList.toggle('open'); });
      $all('a', links).forEach(function (a) {
        a.addEventListener('click', function () { links.classList.remove('open'); });
      });
    }

    var toTop = $('#toTop');
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ---------- 代码块复制 ---------- */
  function attachCopy(block) {
    if (block.dataset.cb) return;
    block.dataset.cb = '1';
    var raw = block.getAttribute('data-copy') || block.textContent;
    raw = raw.replace(/&#10;/g, '\n').replace(/&amp;/g, '&');
    block.textContent = raw;
    block.addEventListener('click', function () { copyText(raw, block); });
  }

  function initCopyAll() {
    var toast = $('#toast');
    var toastTimer = null;
    function showToast(msg) {
      toast.textContent = msg || T('toast.copy');
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
    }
    function copyText(text, block) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          if (block) { block.classList.add('copied'); setTimeout(function () { block.classList.remove('copied'); }, 1500); }
          showToast(T('toast.copy'));
        }).catch(function () { fallbackCopy(text, block); });
      } else {
        fallbackCopy(text, block);
      }
    }
    function fallbackCopy(text, block) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try {
        document.execCommand('copy');
        if (block) { block.classList.add('copied'); setTimeout(function () { block.classList.remove('copied'); }, 1500); }
        showToast(T('toast.copy'));
      } catch (e) {
        showToast(T('toast.fail'));
      }
      document.body.removeChild(ta);
    }
    $all('.code-block').forEach(attachCopy);
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    $all('[data-tabs]').forEach(function (root) {
      var btns = $all('.tab-btn', root);
      var panes = $all('.tab-pane', root);
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var target = btn.getAttribute('data-tab');
          btns.forEach(function (b) { b.classList.remove('active'); });
          panes.forEach(function (p) { p.classList.remove('active'); });
          btn.classList.add('active');
          $all('.tab-pane[data-pane="' + target + '"]', root).forEach(function (p) {
            p.classList.add('active');
          });
        });
      });
    });
  }

  /* ---------- 终端跟随鼠标朝向 ---------- */
  function initTerminalTilt() {
    var wrap = $('.hero-terminal');
    var term = $('.terminal', wrap);
    var body = $('.terminal-body', term);
    if (!wrap || !term || !body) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var MAX = 10;
    var DEFAULT_RY = -4, DEFAULT_RX = 2;

    function onMove(e) {
      // 标题栏（顶部非命令行区域）不触发倾斜 / 反光动画
      if (e.target && e.target.closest && e.target.closest('.terminal-bar')) {
        onLeave();
        return;
      }
      var tRect = term.getBoundingClientRect();
      var bRect = body.getBoundingClientRect();
      if (!tRect.width || !tRect.height || !bRect.width || !bRect.height) return;
      var px = Math.min(Math.max((e.clientX - tRect.left) / tRect.width, 0), 1);
      var py = Math.min(Math.max((e.clientY - tRect.top) / tRect.height, 0), 1);
      // 反光位置基于命令行区域，避免绿色光幕溢出到标题栏
      var bpx = Math.min(Math.max((e.clientX - bRect.left) / bRect.width, 0), 1);
      var bpy = Math.min(Math.max((e.clientY - bRect.top) / bRect.height, 0), 1);
      var ry = (px - 0.5) * 2 * MAX;
      var rx = (0.5 - py) * 2 * MAX;
      term.style.setProperty('--term-ry', ry.toFixed(2) + 'deg');
      term.style.setProperty('--term-rx', rx.toFixed(2) + 'deg');
      term.style.setProperty('--term-gx', (bpx * 100).toFixed(1) + '%');
      term.style.setProperty('--term-gy', (bpy * 100).toFixed(1) + '%');
      term.classList.add('glare');
    }
    function onLeave() {
      term.style.setProperty('--term-ry', DEFAULT_RY + 'deg');
      term.style.setProperty('--term-rx', DEFAULT_RX + 'deg');
      term.style.setProperty('--term-gx', '50%');
      term.style.setProperty('--term-gy', '0%');
      term.classList.remove('glare');
    }
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
  }

  /* ---------- 导航高亮 ---------- */
  function initNavHighlight() {
    var sections = $all('section[id]');
    var linkMap = {};
    $all('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('#') === 0) linkMap[href.slice(1)] = a;
    });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('id');
          Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove('active-link'); });
          if (linkMap[id]) linkMap[id].classList.add('active-link');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 语言切换按钮 ---------- */
  function initLang() {
    var toggle = $('#langToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        setLang(LANG === 'zh' ? 'en' : 'zh', false);
        initNavHighlight();
      });
    }
  }

  /* ---------- 初始化 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    LANG = detectLang();
    applyStaticStrings();
    applyLangVars();
    renderFeatures();
    renderMirrors();
    renderOptions();
    renderUsage();
    renderProtection();
    renderLicense();
    renderTerminal(true);

    initTheme();
    initNav();
    initCopyAll();
    initTabs();
    initTerminalTilt();
    initNavHighlight();
    initLang();
  });
})();
