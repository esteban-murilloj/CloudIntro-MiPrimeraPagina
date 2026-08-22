// ─────────────────────────────────────────────
//  Lab 01 · JS mínimo, sin dependencias externas
//  (una dependencia menos = una imagen más liviana)
// ─────────────────────────────────────────────

// Reloj en vivo: prueba visual de que el contenedor está sirviendo la página.
function tick() {
  const el = document.getElementById('reloj');
  if (el) el.textContent = new Date().toLocaleTimeString('es-CO');
}
tick();
setInterval(tick, 1000);

// Muestra host y puerto reales: útil al explicar el mapeo -p 8080:80.
const meta = document.getElementById('meta');
if (meta) meta.textContent = `Servido por Nginx en un contenedor · ${location.host}`;

// Clic en un comando = copiarlo al portapapeles.
const toast = document.getElementById('toast');
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('show'), 1600);
}

function copiar(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(texto);
  }
  // Fallback para contextos no seguros (http en una IP, por ejemplo).
  const ta = document.createElement('textarea');
  ta.value = texto;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } finally { document.body.removeChild(ta); }
  return Promise.resolve();
}

document.querySelectorAll('.cmd').forEach((el) => {
  el.addEventListener('click', () => {
    const texto = el.dataset.copy || el.querySelector('code').textContent;
    copiar(texto)
      .then(() => {
        el.classList.add('copied');
        setTimeout(() => el.classList.remove('copied'), 900);
        showToast('Copiado ✓');
      })
      .catch(() => showToast('No se pudo copiar'));
  });
});

// Resalta en el menú la sección que estás leyendo.
const enlaces = [...document.querySelectorAll('.nav a')];
const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      enlaces.forEach((a) => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--accent2)' : '';
      });
    });
  },
  { rootMargin: '-20% 0px -70% 0px' }
);
document.querySelectorAll('section[id]').forEach((s) => observador.observe(s));
