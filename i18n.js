(() => {
  const config = window.pageI18nConfig;
  if (!config || !config.translations) return;

  const translations = config.translations;
  const defaultLang = config.defaultLang || 'ja';
  const storageKey = config.storageKey || 'site-language';

  let currentLang = defaultLang;
  let currentCopy = translations[defaultLang] || {};

  function updateText(copy) {
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      if (!(key in copy)) return;
      node.innerHTML = copy[key];
    });
  }

  function updateAttribute(copy, selector, datasetKey, attrName) {
    document.querySelectorAll(selector).forEach((node) => {
      const key = node.dataset[datasetKey];
      if (!(key in copy)) return;
      node.setAttribute(attrName, copy[key]);
    });
  }

  function updateMeta(copy) {
    const map = [
      ['title', 'title', 'textContent'],
      ['meta[name="title"]', 'metaTitle', 'content'],
      ['meta[name="description"]', 'metaDescription', 'content'],
      ['meta[property="og:title"]', 'ogTitle', 'content'],
      ['meta[property="og:description"]', 'ogDescription', 'content'],
      ['meta[property="og:locale"]', 'ogLocale', 'content'],
      ['meta[name="twitter:title"]', 'twitterTitle', 'content'],
      ['meta[name="twitter:description"]', 'twitterDescription', 'content'],
      ['meta[name="theme-color"]', 'themeColor', 'content']
    ];

    map.forEach(([selector, key, attr]) => {
      if (!(key in copy)) return;
      const node = document.querySelector(selector);
      if (!node) return;
      if (attr === 'textContent') {
        node.textContent = copy[key];
      } else {
        node.setAttribute(attr, copy[key]);
      }
    });
  }

  function updatePanels(lang) {
    document.querySelectorAll('[data-lang-panel]').forEach((node) => {
      node.hidden = node.dataset.langPanel !== lang;
    });
  }

  function updateButtons(lang) {
    document.querySelectorAll('.lang-switcher__btn').forEach((button) => {
      const active = button.dataset.lang === lang;
      button.classList.toggle('lang-switcher__btn--active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyLanguage(lang) {
    const nextLang = translations[lang] ? lang : defaultLang;
    const copy = translations[nextLang] || translations[defaultLang] || {};

    currentLang = nextLang;
    currentCopy = copy;

    document.documentElement.lang = copy.lang || nextLang;

    try {
      localStorage.setItem(storageKey, nextLang);
    } catch (error) {
      console.warn('Unable to persist language preference.', error);
    }

    updateText(copy);
    updateAttribute(copy, '[data-i18n-aria-label]', 'i18nAriaLabel', 'aria-label');
    updateAttribute(copy, '[data-i18n-placeholder]', 'i18nPlaceholder', 'placeholder');
    updateAttribute(copy, '[data-i18n-title]', 'i18nTitle', 'title');
    updateMeta(copy);
    updatePanels(nextLang);
    updateButtons(nextLang);

    document.dispatchEvent(new CustomEvent('site-languagechange', {
      detail: {
        lang: nextLang,
        copy
      }
    }));
  }

  function getInitialLanguage() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && translations[saved]) return saved;
    } catch (error) {
      console.warn('Unable to read saved language preference.', error);
    }

    const browserLang = (navigator.language || defaultLang).slice(0, 2).toLowerCase();
    if (translations[browserLang]) return browserLang;
    return defaultLang;
  }

  window.SiteI18n = {
    applyLanguage,
    getLang() {
      return currentLang;
    },
    getCopy() {
      return currentCopy;
    },
    t(key) {
      return currentCopy[key] ?? '';
    }
  };

  document.querySelectorAll('.lang-switcher__btn').forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  applyLanguage(getInitialLanguage());
})();
