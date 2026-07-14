/* ===========================================================================
   fast-clone 展示页交互逻辑
   =========================================================================== */
(function () {
  'use strict';

  /* ---------- 数据 ---------- */
  var FEATURES = [
    { icon: '🔒', title: '安全无忧', desc: '克隆完成后<strong>自动重置 remote 为官方地址</strong>，下载快、pull/push 安全。' },
    { icon: '🔍', title: '代码可审计', desc: '纯文本 Python 源码，无二进制、无混淆、无编译产物，代码完全公开可审查。' },
    { icon: '📦', title: '零依赖', desc: '仅使用 Python 标准库，<strong>无需 pip install</strong> 任何包。' },
    { icon: '🛡️', title: '智能保护', desc: '速度监控 + 自动重试 + 兜底直连，克隆失败概率<strong>极低</strong>。' },
    { icon: '🪞', title: '多镜像支持', desc: '内置 11 个镜像站，覆盖前缀代理 / 域名替换 / 路径前缀等多种策略。' },
    { icon: '🌐', title: '网络自适应', desc: '自动检测本机 IPv4/IPv6 支持，<strong>跳过不可用镜像</strong>。' },
    { icon: '💾', title: '测速缓存', desc: '7 天内测速结果复用，<strong>避免重复测速</strong>浪费时间。' },
    { icon: '⚡', title: '每日状态报告', desc: 'GitHub Actions 每日自动测试镜像可达性并以 Release 发布报告。' },
    { icon: '🌍', title: '双语支持', desc: '中英文自动检测切换，<strong>开箱即用</strong>。' },
    { icon: '⚙️', title: '高度可定制', desc: '编辑 mirror.json 即可增删镜像，<strong>下次运行即生效</strong>。' }
  ];

  // 镜像数据（来源：mirror.json + README 实测延迟）
  var MIRRORS = [
    { key: 'gh-proxy-org', name: 'gh-proxy.org', type: '前缀代理', latency: 169, ip: 'dual', desc: '默认镜像', def: true },
    { key: 'gh-proxy-v4', name: 'v4.gh-proxy.org', type: '前缀代理', latency: 43, ip: 'v4', desc: '仅 IPv4 智能解析' },
    { key: 'gh-proxy-v6', name: 'v6.gh-proxy.org', type: '前缀代理', latency: 2253, ip: 'v6', desc: 'IPv6/IPv4 双栈' },
    { key: 'gh-proxy-cdn', name: 'cdn.gh-proxy.org', type: '前缀代理', latency: 93, ip: 'dual', desc: 'Fastly CDN 加速' },
    { key: 'kkgithub', name: 'kkgithub.com', type: '域名替换', latency: 48, ip: 'dual', desc: '—' },
    { key: 'github-akams', name: 'github.akams.cn', type: '前缀代理', latency: 33, ip: 'dual', desc: '—' },
    { key: 'gitclone', name: 'gitclone.com', type: '路径前缀', latency: 71, ip: 'v4', desc: 'CN 服务器' },
    { key: 'github-ur1', name: 'github.ur1.fun', type: '域名替换', latency: 189, ip: 'dual', desc: '—' },
    { key: 'gh-proxy-com', name: 'gh-proxy.com', type: '前缀代理', latency: 63, ip: 'dual', desc: '—' },
    { key: 'ghproxy-net', name: 'ghproxy.net', type: '前缀代理', latency: 1591, ip: 'dual', desc: '—' },
    { key: 'jihulab', name: 'jihulab.com', type: 'GitLab 极狐', latency: 106, ip: 'dual', desc: '—' }
  ];

  var IP_LABELS = { dual: '双栈', v4: 'IPv4', v6: 'IPv6' };

  var OPTIONS = [
    { arg: 'url', short: '—', desc: '官方仓库地址' },
    { arg: '--mirror', short: '-m', desc: '指定镜像 key' },
    { arg: '--fastest', short: '-f', desc: '自动测速选最快' },
    { arg: '--list-mirrors', short: '-l', desc: '列出全部镜像' },
    { arg: '--branch', short: '-b', desc: '指定分支' },
    { arg: '--depth', short: '-d', desc: '浅克隆深度' },
    { arg: '--single-branch', short: '—', desc: '仅单分支' },
    { arg: '--target', short: '—', desc: '目标目录名' },
    { arg: '--dry-run', short: '-n', desc: '预览不克隆' },
    { arg: '--min-speed', short: '—', desc: '最低速度 MB/s' },
    { arg: '--speed-timeout', short: '—', desc: '超时秒数' },
    { arg: '--help', short: '-h', desc: '帮助' }
  ];

  /* ---------- 工具 ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
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

  /* ---------- 渲染特性 ---------- */
  function renderFeatures() {
    var html = FEATURES.map(function (f) {
      return '<div class="feature-card">' +
        '<div class="feature-icon">' + f.icon + '</div>' +
        '<h3>' + f.title + '</h3>' +
        '<p>' + f.desc + '</p>' +
        '</div>';
    }).join('');
    $('#featuresGrid').innerHTML = html;
  }

  /* ---------- 渲染镜像表 ---------- */
  function renderMirrors() {
    var html = MIRRORS.map(function (m) {
      var defTag = m.def ? '<span class="default-tag">默认</span>' : '';
      return '<tr>' +
        '<td>' + escapeHtml(m.key) + defTag + '</td>' +
        '<td>' + escapeHtml(m.name) + '</td>' +
        '<td>' + escapeHtml(m.type) + '</td>' +
        '<td><span class="latency-badge ' + latencyClass(m.latency) + '">' + m.latency + 'ms</span></td>' +
        '<td><span class="ip-badge">' + IP_LABELS[m.ip] + '</span></td>' +
        '<td>' + escapeHtml(m.desc) + '</td>' +
        '</tr>';
    }).join('');
    $('#mirrorBody').innerHTML = html;
  }

  /* ---------- 渲染参数表 ---------- */
  function renderOptions() {
    var html = OPTIONS.map(function (o) {
      return '<tr><td>' + escapeHtml(o.arg) + '</td><td>' + escapeHtml(o.short) +
        '</td><td>' + escapeHtml(o.desc) + '</td></tr>';
    }).join('');
    $('#optionsBody').innerHTML = html;
  }

  /* ---------- 主题切换 ---------- */
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
      toggle.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('fc-theme', next); } catch (e) {}
      });
    }
  }

  /* ---------- 导航栏滚动效果 ---------- */
  function initNav() {
    var nav = $('#nav');
    var burger = $('#navBurger');
    var links = $('#navLinks');

    function onScroll() {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      // 回到顶部按钮
      var toTop = $('#toTop');
      if (window.scrollY > 400) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 移动端菜单
    if (burger) {
      burger.addEventListener('click', function () {
        links.classList.toggle('open');
      });
      $all('a', links).forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
        });
      });
    }

    // 回到顶部
    var toTop = $('#toTop');
    if (toTop) {
      toTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ---------- 代码块复制 ---------- */
  function initCopy() {
    var toast = $('#toast');
    var toastTimer = null;
    function showToast(msg) {
      toast.textContent = msg || '已复制到剪贴板';
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('show');
      }, 1800);
    }

    function copyText(text, block) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          if (block) {
            block.classList.add('copied');
            setTimeout(function () { block.classList.remove('copied'); }, 1500);
          }
          showToast();
        }).catch(function () { fallbackCopy(text, block); });
      } else {
        fallbackCopy(text, block);
      }
    }

    function fallbackCopy(text, block) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        if (block) {
          block.classList.add('copied');
          setTimeout(function () { block.classList.remove('copied'); }, 1500);
        }
        showToast();
      } catch (e) {
        showToast('复制失败，请手动复制');
      }
      document.body.removeChild(ta);
    }

    $all('.code-block').forEach(function (block) {
      var raw = block.getAttribute('data-copy') || block.textContent;
      // 将换行符实体还原
      raw = raw.replace(/&#10;/g, '\n').replace(/&amp;/g, '&');
      block.addEventListener('click', function () {
        copyText(raw, block);
      });
    });
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

  /* ---------- 终端打字效果 ---------- */
  function initTerminal() {
    var body = $('#terminalBody');
    if (!body) return;
    // 简单的渐入效果：给每行依次添加可见类
    var lines = $all('.term-line', body);
    lines.forEach(function (line, i) {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-8px)';
      line.style.transition = 'all 0.3s ease';
    });
    var started = false;
    function reveal() {
      if (started) return;
      started = true;
      lines.forEach(function (line, i) {
        setTimeout(function () {
          line.style.opacity = '1';
          line.style.transform = 'translateX(0)';
        }, i * 130);
      });
    }
    // 进入视口时触发
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            reveal();
            io.disconnect();
          }
        });
      }, { threshold: 0.2 });
      io.observe(body);
    } else {
      reveal();
    }
  }

  /* ---------- 导航高亮（可选轻量实现） ---------- */
  function initNavHighlight() {
    var sections = $all('section[id]');
    var linkMap = {};
    $all('.nav-links a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('#') === 0) {
        linkMap[href.slice(1)] = a;
      }
    });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('id');
          Object.keys(linkMap).forEach(function (k) {
            linkMap[k].classList.remove('active-link');
          });
          if (linkMap[id]) linkMap[id].classList.add('active-link');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 初始化 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderFeatures();
    renderMirrors();
    renderOptions();
    initTheme();
    initNav();
    initCopy();
    initTabs();
    initTerminal();
    initNavHighlight();
  });
})();
