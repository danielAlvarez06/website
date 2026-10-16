const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('.menu-panel');
const shade = document.querySelector('.menu-shade');
const main = document.querySelector('main');
function setMenu(open) {
  panel.hidden = !open;
  shade.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', open);
  main.inert = open;
  if (open) panel.querySelector('a').focus();
  else toggle.focus();
}
toggle.addEventListener('click', () => setMenu(panel.hidden));
shade.addEventListener('click', () => setMenu(false));
panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (panel.hidden) return;
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab') {
    const items = [toggle, ...panel.querySelectorAll('a')];
    const current = items.indexOf(document.activeElement);
    event.preventDefault();
    items[(current + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus();
  }
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
const track = document.querySelector('.journey-track');
document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
  track.scrollBy({left: (track.firstElementChild.getBoundingClientRect().width + 20) * Number(button.dataset.slide), behavior: reducedMotion.matches ? 'instant' : 'smooth'});
}));
document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());
