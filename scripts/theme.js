const THEME_STORAGE_KEY = 'cph-theme';

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Theme still works for the current page if storage is unavailable.
  }
}

function getPreferredTheme() {
  const savedTheme = getSavedTheme();

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function updateThemeToggle(theme) {
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  const isLight = theme === 'light';

  toggles.forEach((toggle) => {
    const icon = toggle.querySelector('.theme-toggle-icon');
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');

    if (icon) {
      icon.textContent = isLight ? '\u263E' : '\u2600';
    }
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  saveTheme(theme);
  updateThemeToggle(theme);
}

function initTheme() {
  setTheme(getPreferredTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    if (toggle.dataset.themeToggleBound === 'true') {
      return;
    }

    toggle.dataset.themeToggleBound = 'true';
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  });
}
