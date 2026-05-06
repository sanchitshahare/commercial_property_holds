function syncNavHeight() {
  const nav = document.querySelector('nav');

  if (!nav) {
    return;
  }

  const compactHeight = window.innerWidth <= 600 ? '55px' : '60px';
  const fullHeight = window.innerWidth <= 768 ? '60px' : '70px';
  nav.style.height = window.scrollY > 50 ? compactHeight : fullHeight;
}

function closeNavigationMenu() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');

  if (!nav || !toggle) {
    return;
  }

  nav.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}

function toggleNavigationMenu() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');

  if (!nav || !toggle) {
    return;
  }

  const isOpen = nav.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

function initNavigation() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav-links a');

  syncNavHeight();
  window.addEventListener('scroll', syncNavHeight, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', toggleNavigationMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', closeNavigationMenu);
    });

    document.addEventListener('click', (event) => {
      if (window.innerWidth > 900) {
        return;
      }

      if (!nav.contains(event.target)) {
        closeNavigationMenu();
      }
    });
  }

  window.addEventListener('resize', () => {
    syncNavHeight();
    if (window.innerWidth > 900) {
      closeNavigationMenu();
    }
  });
}
