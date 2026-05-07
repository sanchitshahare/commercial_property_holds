function initializeApp() {
  if (typeof initTheme === 'function') {
    initTheme();
  }

  if (typeof initTicker === 'function') {
    initTicker();
  }

  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }

  if (typeof initPropertyFilters === 'function') {
    initPropertyFilters();
  }

  if (typeof initModal === 'function') {
    initModal();
  }

  if (typeof initContactForm === 'function') {
    initContactForm();
  }

  if (typeof initNavigation === 'function') {
    initNavigation();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp, { once: true });
} else {
  initializeApp();
}
