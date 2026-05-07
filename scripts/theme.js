const THEME_STORAGE_KEY = 'cph-theme';

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

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
      icon.textContent = isLight ? '☾' : '☀';
    }
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeToggle(theme);
}

function initTheme() {
  setTheme(getPreferredTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  });
}
