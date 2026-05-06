function syncNavHeight() {
  const nav = document.querySelector('nav');

  if (!nav) {
    return;
  }

  const compactHeight = window.innerWidth <= 600 ? '55px' : '60px';
  const fullHeight = window.innerWidth <= 768 ? '60px' : '70px';
  nav.style.height = window.scrollY > 50 ? compactHeight : fullHeight;
}

function initNavigation() {
  syncNavHeight();
  window.addEventListener('scroll', syncNavHeight, { passive: true });
  window.addEventListener('resize', syncNavHeight);
}
