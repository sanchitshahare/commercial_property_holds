let appInitialized = false;

function initializeApp() {
  if (appInitialized) {
    return;
  }

  appInitialized = true;

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

function initializeAppWhenReady() {
  if (window.componentsReady && typeof window.componentsReady.then === 'function') {
    window.componentsReady.then(initializeApp);
    return;
  }

  initializeApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAppWhenReady, { once: true });
} else {
  initializeAppWhenReady();
}
