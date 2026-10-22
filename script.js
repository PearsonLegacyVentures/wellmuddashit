(() => {
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('nav');
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(opening));
      menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', opening);
      document.body.classList.toggle('menu-open', opening);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 850) closeMenu(); });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  // Native details/summary provides keyboard-accessible FAQs without unnecessary custom scripting.
})();
