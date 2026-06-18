// MegaBot Docs — sidebar nav, scrollspy, search

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const menuToggle = document.getElementById('menuToggle');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

// Mobile sidebar toggle
function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
menuToggle?.addEventListener('click', () => { sidebar.classList.toggle('open'); overlay.classList.toggle('open'); });
overlay?.addEventListener('click', closeSidebar);
navLinks.forEach(l => l.addEventListener('click', () => { if (window.innerWidth <= 860) closeSidebar(); }));

// Scrollspy — highlight the section currently in view
const sections = navLinks
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

sections.forEach(s => spy.observe(s));

// Search — filter sidebar links by text
const search = document.getElementById('search');
search?.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  navLinks.forEach(l => {
    const match = !q || l.textContent.toLowerCase().includes(q);
    l.classList.toggle('hidden', !match);
  });
  // Hide empty groups
  document.querySelectorAll('.nav-group').forEach(g => {
    const visible = g.querySelectorAll('.nav-link:not(.hidden)').length;
    g.style.display = visible === 0 && q ? 'none' : '';
  });
});

// Lightbox for screenshots
function zoom(src){
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.querySelector('img').src = src;
  lb.classList.add('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.getElementById('lightbox')?.classList.remove('open'); });
