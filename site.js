(function () {
  'use strict';

  const doc = document;
  const body = doc.body;
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const storageKey = 'site-language';
  const legacyCopy = {
    zh: {
      htmlLang: 'zh-CN',
      logoAria: '返回 JENKIN Workshop 首页',
      navAria: '主导航',
      langAria: '语言切换',
      navWork: '作品',
      navContact: '联系',
      navAds: '灵感收集',
      footerLead: '联系我：'
    },
    ja: {
      htmlLang: 'ja',
      logoAria: 'JENKIN Workshop のホームへ戻る',
      navAria: 'メインナビゲーション',
      langAria: '言語切り替え',
      navWork: '作品',
      navContact: 'お問い合わせ',
      navAds: 'インスピレーション',
      footerLead: 'お問い合わせ：'
    },
    en: {
      htmlLang: 'en',
      logoAria: 'Return to the JENKIN Workshop home page',
      navAria: 'Main navigation',
      langAria: 'Language switcher',
      navWork: 'Work',
      navContact: 'Contact',
      navAds: 'Inspiration',
      footerLead: 'Get in touch:'
    }
  };
  const legacyProjectCopy = {
    'ad1.html': {
      zh: { header: '完美日记 × 道枝骏佑 广告片｜Perfect Diary × Michieda Shunsuke – TV Commercial' },
      ja: { header: '完美日記 × 道枝駿佑 CM映像｜Perfect Diary × Michieda Shunsuke – TV Commercial' },
      en: { header: 'Perfect Diary × Michieda Shunsuke – TV Commercial' }
    },
    'ad2.html': {
      zh: { header: '日发纺机品牌形象影片｜RIFA Textile Machinery – Brand Image Film' },
      ja: { header: '日発紡機ブランドイメージ映像｜RIFA Textile Machinery – Brand Image Film' },
      en: { header: 'RIFA Textile Machinery – Brand Image Film' }
    },
    'ad3.html': {
      zh: { header: 'LABELHOOD × 昆仑概念短片｜LABELHOOD × KUNLUN – Concept Short Film' },
      ja: { header: '崑崙コンセプトショートフィルム｜LABELHOOD × KUNLUN – Concept Short Film' },
      en: { header: 'LABELHOOD × KUNLUN – Concept Short Film' }
    },
    'ad4.html': {
      zh: { header: 'ASICS 亚瑟士《#我自带感》｜ASICS “#MyOwnVibe” – Brand Advertising' },
      ja: { header: 'ASICS「#我自带感」ブランド広告｜ASICS “#MyOwnVibe” – Brand Advertising' },
      en: { header: 'ASICS “#MyOwnVibe” – Brand Advertising' }
    },
    'ad5.html': {
      zh: { header: 'BMW i7《How to_DC》品牌影片｜BMW i7 “How to_DC” – Concept Film' },
      ja: { header: 'BMW i7「How to_DC」ブランド映像｜BMW i7 “How to_DC” – Concept Film' },
      en: { header: 'BMW i7 “How to_DC” – Concept Film' }
    },
    'ad6.html': {
      zh: { header: 'LESS 24SS《迅的异象旅行》｜LESS 24SS: Journey of Vision – Shun’s Odyssey' },
      ja: { header: 'LESS 24SS「迅の異象旅行」｜LESS 24SS: Journey of Vision – Shun’s Odyssey' },
      en: { header: 'LESS 24SS: Journey of Vision – Shun’s Odyssey' }
    },
    'ad7.html': {
      zh: { header: 'AD 7' },
      ja: { header: 'AD 7' },
      en: { header: 'AD 7' }
    },
    'ad8.html': {
      zh: { header: '茶灵（CHÁ LING）广告片｜CHÁ LING – TV Commercial' },
      ja: { header: 'チャーリン（CHÁ LING）CM映像｜CHÁ LING – TV Commercial' },
      en: { header: 'CHÁ LING – TV Commercial' }
    },
    'ad9.html': {
      zh: { header: '报喜鸟 24SS 运动西装系列《脑内剧场》｜SNOWLOTUS 24SS Sports Suit Collection – “Theatre of Mind”' },
      ja: { header: '報喜鳥 24SS スポーツスーツシリーズ「脳内シアター」｜SNOWLOTUS 24SS Sports Suit Collection – “Theatre of Mind”' },
      en: { header: 'SNOWLOTUS 24SS Sports Suit Collection – “Theatre of Mind”' }
    },
    'ad10.html': {
      zh: { header: 'TOEFL TVC 2024 品牌广告｜TOEFL TVC 2024 – Brand Campaign' },
      ja: { header: 'TOEFL TVC 2024 ブランド広告｜TOEFL TVC 2024 – Brand Campaign' },
      en: { header: 'TOEFL TVC 2024 – Brand Campaign' }
    },
    'ad11.html': {
      zh: { header: '0分贝的呐喊 × Tmall 全民追奥运｜“0dB Shout” × Tmall Olympic Campaign' },
      ja: { header: '0デシベルの叫び × Tmall 全民追オリンピック｜“0dB Shout” × Tmall Olympic Campaign' },
      en: { header: '“0dB Shout” × Tmall Olympic Campaign' }
    },
    'ad12.html': {
      zh: { header: '逐本 × 陈都灵《勇敢且温柔》广告片｜Zhuben × Chen Duling — “Brave & Gentle” TV Commercial' },
      ja: { header: '逐本 × チェン・ドゥーリン「勇敢で優しい」CM映像｜Zhuben × Chen Duling — “Brave & Gentle” TV Commercial' },
      en: { header: 'Zhuben × Chen Duling — “Brave & Gentle” TV Commercial' }
    },
    'ad13.html': {
      zh: { header: 'ZARA｜AO YES 蛇年限定系列｜ZARA | AO YES — Year of the Snake Limited Collection' },
      ja: { header: 'ZARA｜AO YES 蛇年限定コレクション｜ZARA | AO YES — Year of the Snake Limited Collection' },
      en: { header: 'ZARA | AO YES — Year of the Snake Limited Collection' }
    },
    'ad14.html': {
      zh: { header: '金·卡戴珊 × VOGUE 特辑｜Kim Kardashian × VOGUE – Editorial Campaign' },
      ja: { header: 'キム・カーダシアン × VOGUE 特集｜Kim Kardashian × VOGUE – Editorial Campaign' },
      en: { header: 'Kim Kardashian × VOGUE – Editorial Campaign' }
    },
    'ad15.html': {
      zh: { header: '凯迪拉克 新XT6｜Cadillac New XT6' },
      ja: { header: 'キャデラック 新XT6｜Cadillac New XT6' },
      en: { header: 'Cadillac New XT6' }
    },
    'ad16.html': {
      zh: { header: 'ZARA 2015 广告大片花絮｜ZARA — 2015 Campaign BTS' },
      ja: { header: 'ZARA 2015 キャンペーンメイキング映像｜ZARA — 2015 Campaign BTS' },
      en: { header: 'ZARA — 2015 Campaign BTS' }
    },
    'ad17.html': {
      zh: { header: '美团鲜花 3.8 国际妇女节广告片｜Meituan Flowers — International Women’s Day TV Commercial' },
      ja: { header: '美団鮮花 3.8 国際女性デー CM映像｜Meituan Flowers — International Women’s Day TV Commercial' },
      en: { header: 'Meituan Flowers — International Women’s Day TV Commercial' }
    },
    'ad18.html': {
      zh: { header: '夜淘宝《不误正夜》广告片｜Night Taobao — “Make the Night Count” TV Commercial' },
      ja: { header: '夜タオバオ「不误正夜」CM映像｜Night Taobao — “Make the Night Count” TV Commercial' },
      en: { header: 'Night Taobao — “Make the Night Count” TV Commercial' }
    },
    'ad19.html': {
      zh: { header: 'Armani Beauty 权力粉底霜气垫 × 张小斐 广告片｜Armani Beauty — Power Fabric Compact TV Commercial' },
      ja: { header: 'Armani Beauty パワー ファブリック コンパクト × 張小斐 CM映像｜Armani Beauty — Power Fabric Compact TV Commercial' },
      en: { header: 'Armani Beauty — Power Fabric Compact TV Commercial' }
    },
    'ad20.html': {
      zh: { header: 'Armani Beauty 权力粉底霜气垫 × 文淇 广告片｜Armani Beauty — Power Fabric Compact TV Commercial' },
      ja: { header: 'Armani Beauty パワー ファブリック コンパクト × 文淇 CM映像｜Armani Beauty — Power Fabric Compact TV Commercial' },
      en: { header: 'Armani Beauty — Power Fabric Compact TV Commercial' }
    },
    'ad21.html': {
      zh: { header: '逐本 × 侯明昊 品牌影片｜Zhuben × Hou Minghao — Brand Film' },
      ja: { header: '逐本 × ホウ・ミンハオ ブランドフィルム｜Zhuben × Hou Minghao — Brand Film' },
      en: { header: 'Zhuben × Hou Minghao — Brand Film' }
    },
    'ad22.html': {
      zh: { header: 'AVITA 012 × 李娜 广告片｜AVITA 012 × Li Na' },
      ja: { header: 'アヴィタ012 × 李娜 CM映像｜AVITA 012 × Li Na' },
      en: { header: 'AVITA 012 × Li Na' }
    },
    'doc1.html': {
      zh: { header: 'LOEWE 2023 早春《纯色天成》品牌影片｜LOEWE — 2023 Early Spring “Pure Color, Naturally Formed” Brand Film' },
      ja: { header: 'ロエベ 2023 早春「純色天成」ブランドフィルム｜LOEWE — 2023 Early Spring “Pure Color, Naturally Formed” Brand Film' },
      en: { header: 'LOEWE — 2023 Early Spring “Pure Color, Naturally Formed” Brand Film' }
    },
    'doc2.html': {
      zh: { header: 'Fabrique《她的完整衣橱》官方主题影片 feat. 杨子姗｜Fabrique — “Her Complete Wardrobe” Official Theme Film feat. Yang Zishan' },
      ja: { header: 'Fabrique「彼女の完全なワードローブ」公式発表テーマ映像 feat. ヤン・ズーシャン｜Fabrique — “Her Complete Wardrobe” Official Theme Film feat. Yang Zishan' },
      en: { header: 'Fabrique — “Her Complete Wardrobe” Official Theme Film feat. Yang Zishan' }
    },
    'doc3.html': {
      zh: {
        header: '六个团子｜Six Dumplings — Animal Documentary',
        title: '《六个团子》｜Six Dumplings'
      },
      ja: {
        header: '六つの団子｜Six Dumplings — Animal Documentary',
        title: '『六つの団子』｜Six Dumplings'
      },
      en: {
        header: 'Six Dumplings — Animal Documentary',
        title: 'Six Dumplings'
      }
    }
  };

  function getSavedLang() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved && legacyCopy[saved]) return saved;
    } catch (error) {}

    const lang = (doc.documentElement.getAttribute('lang') || '').toLowerCase();
    if (lang.startsWith('zh')) return 'zh';
    if (lang.startsWith('en')) return 'en';
    return 'ja';
  }

  function setSavedLang(lang) {
    try {
      window.localStorage.setItem(storageKey, lang);
    } catch (error) {}
  }

  function initLegacyChrome() {
    const header = doc.querySelector('body > header');
    if (header) {
      header.classList.add('site-header', 'site-header--legacy');
    }

    const logo = header?.querySelector('.logo');
    if (logo) {
      logo.classList.add('logo');
      if (!logo.querySelector('.logo__text') && logo.textContent.trim() === 'JENKIN Workshop') {
        logo.innerHTML = '<span class="logo__text">JENKIN</span><span class="logo__sub">Workshop</span>';
      }
    }

    const nav = header?.querySelector('nav');
    if (nav) {
      nav.classList.add('site-nav');
      nav.setAttribute('aria-label', nav.getAttribute('aria-label') || 'Main navigation');
      nav.querySelectorAll('a').forEach((link) => {
        link.classList.add('site-nav__link');
        const href = (link.getAttribute('href') || '').toLowerCase();
        const isActive = href === currentPage || link.classList.contains('active') || link.getAttribute('aria-current') === 'page';
        link.classList.toggle('site-nav__link--active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        }
      });
    }

    const tzMount = doc.getElementById('tz-right');
    if (tzMount) {
      tzMount.classList.add('timezone-widget');
      tzMount.removeAttribute('style');
    }

    const footer = doc.querySelector('body > footer');
    if (footer) {
      footer.classList.add('site-footer');
    }

    if (!body.className.trim() && /^ad\d+\.html$/.test(currentPage)) {
      body.classList.add('page-project', 'page-project--ad');
    } else if (!body.className.trim() && /^doc\d+\.html$/.test(currentPage)) {
      body.classList.add('page-project', 'page-project--doc');
    } else if (/^(ad|doc)\d+\.html$/.test(currentPage)) {
      body.classList.add('page-project');
    }
  }

  function initLegacyLanguageSwitcher() {
    if (window.pageI18nConfig || doc.querySelector('.lang-switcher')) return;

    const header = doc.querySelector('body > header');
    const nav = header?.querySelector('nav');
    if (!header || !nav) return;

    const logo = header.querySelector('.logo');
    const navLinks = Array.from(nav.querySelectorAll('a'));
    const footerLead = doc.querySelector('body > footer p + p');

    const switcher = doc.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.setAttribute('role', 'group');

    ['zh', 'ja', 'en'].forEach((lang) => {
      const button = doc.createElement('button');
      button.type = 'button';
      button.className = 'lang-switcher__btn';
      button.dataset.lang = lang;
      button.textContent = lang === 'zh' ? '中' : lang === 'ja' ? '日' : 'EN';
      switcher.appendChild(button);
    });

    const tzMount = nav.querySelector('#tz-right');
    nav.insertBefore(switcher, tzMount || null);

    const applyLegacyProjectCopy = (lang) => {
      const pageCopy = legacyProjectCopy[currentPage]?.[lang];
      if (!pageCopy) return;

      const projectHeader = doc.querySelector('.project-header h1');
      const projectTitle = doc.querySelector('.project-title');
      const titleNode = doc.querySelector('head > title');
      const metaDescription = doc.querySelector('meta[name="description"]');

      if (projectHeader && pageCopy.header) {
        projectHeader.textContent = pageCopy.header;
      }
      if (projectTitle && pageCopy.title) {
        projectTitle.textContent = pageCopy.title;
      }
      if (titleNode && pageCopy.header) {
        titleNode.textContent = `${pageCopy.header} | JENKIN Workshop`;
      }
      if (metaDescription && pageCopy.header) {
        const descriptions = {
          zh: `${pageCopy.header}。JENKIN Workshop 作品页。`,
          ja: `${pageCopy.header}。JENKIN Workshop の作品ページ。`,
          en: `${pageCopy.header}. Project page for JENKIN Workshop.`
        };
        metaDescription.setAttribute('content', descriptions[lang] || descriptions.ja);
      }
    };

    const applyLegacyLanguage = (lang) => {
      const copy = legacyCopy[lang] || legacyCopy.ja;
      doc.documentElement.setAttribute('lang', copy.htmlLang);
      nav.setAttribute('aria-label', copy.navAria);
      switcher.setAttribute('aria-label', copy.langAria);
      if (logo) {
        logo.setAttribute('aria-label', copy.logoAria);
      }

      navLinks.forEach((link) => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        if (href === 'index.html') link.textContent = copy.navWork;
        if (href === 'contact.html') link.textContent = copy.navContact;
        if (href === 'ads.html') link.textContent = copy.navAds;
      });

      if (footerLead) {
        const linkNode = footerLead.querySelector('a');
        const raw = footerLead.innerHTML;
        if (linkNode && raw.includes('</a>')) {
          footerLead.innerHTML = `${copy.footerLead}
      <a href="https://www.instagram.com/jenkin_ctutu/" target="_blank" rel="noopener noreferrer">Instagram</a> |
      <a href="https://www.xinpianchang.com/u10175898?channel=copyLink&amp;from=webShare" target="_blank" rel="noopener noreferrer">新片場</a>`;
        }
      }

      switcher.querySelectorAll('.lang-switcher__btn').forEach((button) => {
        button.classList.toggle('lang-switcher__btn--active', button.dataset.lang === lang);
      });

      applyLegacyProjectCopy(lang);
      setSavedLang(lang);
      doc.dispatchEvent(new CustomEvent('site-languagechange', { detail: { lang } }));
    };

    switcher.addEventListener('click', (event) => {
      const button = event.target.closest('.lang-switcher__btn');
      if (!button) return;
      applyLegacyLanguage(button.dataset.lang);
    });

    applyLegacyLanguage(getSavedLang());
  }

  function mountTimezoneWidget() {
    const mount = doc.getElementById('tz-right');
    if (!mount || mount.dataset.mounted === '1') return;
    mount.dataset.mounted = '1';

    const host = doc.createElement('span');
    mount.appendChild(host);
    const root = host.attachShadow({ mode: 'open' });

    root.innerHTML = `
      <style>
        .wrap {
          display: inline-flex;
          gap: 10px;
          align-items: center;
        }
        .chip {
          display: inline-flex;
          gap: 6px;
          align-items: baseline;
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(22, 22, 26, 0.75);
          color: #fff;
          border: 1px solid rgba(255,255,255,.12);
          line-height: 1;
        }
        .label {
          opacity: .82;
          font-weight: 600;
          font-size: 12px;
        }
        .time {
          font-variant-numeric: tabular-nums;
          font-weight: 700;
          font-size: 13px;
        }
      </style>
      <div class="wrap" role="group" aria-label="Timezones">
        <div class="chip" data-zone="Asia/Shanghai">
          <span class="label">Shanghai</span>
          <span class="time">--:--:--</span>
        </div>
        <div class="chip" data-zone="Asia/Tokyo">
          <span class="label">Tokyo</span>
          <span class="time">--:--:--</span>
        </div>
      </div>
    `;

    const chips = Array.from(root.querySelectorAll('.chip')).map((chip) => ({
      time: chip.querySelector('.time'),
      formatter: new Intl.DateTimeFormat('en-GB', {
        timeZone: chip.dataset.zone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }));

    const tick = () => {
      const now = new Date();
      chips.forEach(({ time, formatter }) => {
        time.textContent = formatter.format(now);
      });
    };

    let timerId = null;
    const start = () => {
      if (timerId || doc.hidden) return;
      tick();
      timerId = window.setInterval(tick, 1000);
    };
    const stop = () => {
      if (!timerId) return;
      window.clearInterval(timerId);
      timerId = null;
    };

    doc.addEventListener('visibilitychange', () => {
      if (doc.hidden) stop();
      else start();
    });
    start();
  }

  function initTouchCards() {
    if (!isTouch) return;

    const cards = Array.from(doc.querySelectorAll('.grid-item'));
    if (!cards.length) return;

    let lastTouched = null;

    const clearCard = (card) => {
      if (!card) return;
      card.classList.remove('touched');
      if (card._touchTimer) {
        window.clearTimeout(card._touchTimer);
        card._touchTimer = null;
      }
      if (lastTouched === card) {
        lastTouched = null;
      }
    };

    cards.forEach((card) => {
      if (card.dataset.touchReady === '1') return;
      card.dataset.touchReady = '1';
      card.style.webkitTapHighlightColor = 'transparent';

      card.addEventListener('click', (event) => {
        if (lastTouched !== card) {
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === 'function') {
            event.stopImmediatePropagation();
          }

          clearCard(lastTouched);
          card.classList.add('touched');
          lastTouched = card;
          card._touchTimer = window.setTimeout(() => clearCard(card), 3000);
        }
      }, { passive: false, capture: true });
    });

    doc.addEventListener('click', (event) => {
      if (!lastTouched) return;
      if (!event.target.closest('.grid-item')) {
        clearCard(lastTouched);
      }
    });
  }

  function enhanceMedia() {
    doc.querySelectorAll('img.thumb, .stills img, .contact-card__photo img, .contact-photo img, .contact-left img').forEach((img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });

    doc.querySelectorAll('iframe').forEach((frame) => {
      if (!frame.hasAttribute('loading')) frame.setAttribute('loading', 'lazy');
    });
  }

  function initProjectPlayerControls() {
    const projects = doc.querySelectorAll('.project-video .video-wrapper');
    if (!projects.length) return;

    const labels = {
      zh: { retry: '重新加载视频', external: '在原平台打开', hint: '若播放器持续加载，可重试或在原平台打开。' },
      ja: { retry: '映像を再読み込み', external: '元のプラットフォームで開く', hint: '読み込みが続く場合は、再読み込みまたは元のプラットフォームでお試しください。' },
      en: { retry: 'Reload video', external: 'Open on original platform', hint: 'If loading continues, reload the player or open the original platform.' }
    };
    const lang = getSavedLang();
    const copy = labels[lang] || labels.ja;

    projects.forEach((wrapper) => {
      if (wrapper.dataset.playerControlsReady === '1') return;
      const frame = wrapper.querySelector('iframe');
      if (!frame?.src) return;

      wrapper.dataset.playerControlsReady = '1';
      const source = new URL(frame.src);
      let externalUrl = source.href;
      const dailyMatch = source.pathname.match(/\/video\/([^/?]+)/);
      const vimeoMatch = source.pathname.match(/\/video\/(\d+)/);
      if (source.hostname.includes('dailymotion.com') && dailyMatch) {
        externalUrl = `https://www.dailymotion.com/video/${dailyMatch[1]}`;
      } else if (source.hostname.includes('vimeo.com') && vimeoMatch) {
        externalUrl = `https://vimeo.com/${vimeoMatch[1]}`;
      }

      const controls = doc.createElement('div');
      controls.className = 'player-controls';
      controls.innerHTML = `
        <p>${copy.hint}</p>
        <div class="player-controls__actions">
          <button type="button" class="player-controls__retry">${copy.retry}</button>
          <a href="${externalUrl}" target="_blank" rel="noopener noreferrer">${copy.external}</a>
        </div>
      `;
      controls.querySelector('.player-controls__retry').addEventListener('click', () => {
        const url = new URL(frame.src);
        url.searchParams.set('reload', Date.now().toString());
        frame.src = url.href;
      });
      wrapper.closest('.project-video').insertAdjacentElement('afterend', controls);
    });
  }

  function initRevealAnimations() {
    const targets = doc.querySelectorAll(
      '.works-section, .section-title, .section-note, .filters, .works-grid__item, .grid-item, .contact-card, .contact-copy, .contact-form-wrap, .project-header, .project-video, .project-about, .stills, .site-footer'
    );

    if (!targets.length) return;

    targets.forEach((target, index) => {
      if (!target.classList.contains('reveal-on-scroll')) {
        target.classList.add('reveal-on-scroll');
      }
      target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    });

    targets.forEach((target) => observer.observe(target));
  }

  function initHeaderScrollState() {
    const header = doc.querySelector('.site-header') || doc.querySelector('body > header');
    if (!header) return;

    const sync = () => {
      header.classList.toggle('site-header--scrolled', window.scrollY > 16);
    };
    let framePending = false;
    const scheduleSync = () => {
      if (framePending) return;
      framePending = true;
      window.requestAnimationFrame(() => {
        sync();
        framePending = false;
      });
    };

    sync();
    window.addEventListener('scroll', scheduleSync, { passive: true });
  }

  function init() {
    initLegacyChrome();
    initLegacyLanguageSwitcher();
    mountTimezoneWidget();
    initTouchCards();
    enhanceMedia();
    initProjectPlayerControls();
    initRevealAnimations();
    initHeaderScrollState();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
