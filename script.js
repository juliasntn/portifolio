// menu ativo por scroll e navegação suave
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => link.addEventListener('click', e => {
e.preventDefault();
const id = link.getAttribute('href').substring(1);
document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'});
navLinks.forEach(l => l.classList.remove('active'));
link.classList.add('active');
}));

// tema claro/escuro
const themeBtn = document.getElementById('theme-toggle');
if(localStorage.getItem('theme') === 'dark'){
document.documentElement.setAttribute('data-theme','dark');
themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', ()=>{
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
if(isDark){
document.documentElement.removeAttribute('data-theme');
themeBtn.textContent = '🌙';
localStorage.setItem('theme','light');
} else {
document.documentElement.setAttribute('data-theme','dark');
themeBtn.textContent = '☀️';
localStorage.setItem('theme','dark');
}
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
mobileToggle.addEventListener('click', ()=>{
const visible = navMenu.classList.toggle('open');
navMenu.style.display = visible ? 'flex' : 'none';
});

// Filtro de certificados
const filterSelect = document.getElementById('filter');
const certCards = document.querySelectorAll('#cert-grid .card');
if(filterSelect){
filterSelect.addEventListener('change', ()=>{
const val = filterSelect.value;
certCards.forEach(c=>{
c.style.display = (val === 'todos' || c.dataset.cat === val) ? 'block':'none';
});
});
}

// Modal PDF
const modal = document.getElementById('pdf-modal');
const pdfFrame = document.getElementById('pdf-frame');
const closeModal = document.getElementById('close-modal');

if(modal && pdfFrame && closeModal){
certCards.forEach(card => card.addEventListener('click', ()=>{
const pdf = card.dataset.pdf;
pdfFrame.src = pdf;
modal.style.display = 'flex';
modal.setAttribute('aria-hidden','false');
document.body.style.overflow = 'hidden';
}));

closeModal.addEventListener('click', ()=>{
modal.style.display = 'none';
pdfFrame.src = '';
modal.setAttribute('aria-hidden','true');
document.body.style.overflow = 'auto';
});

window.addEventListener('click', e=>{
if(e.target === modal){
modal.style.display = 'none';
pdfFrame.src = '';
modal.setAttribute('aria-hidden','true');
document.body.style.overflow = 'auto';
}
});
}

// Scroll spy simples (marca link ativo conforme scroll)
window.addEventListener('scroll', () => {
const fromTop = window.scrollY + 100;
navLinks.forEach(link => {
const section = document.querySelector(link.hash);
if(section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
navLinks.forEach(l => l.classList.remove('active'));
link.classList.add('active');
}
});
});

// Animação de fade-in suave dos elementos na rolagem
const fadeEls = document.querySelectorAll('.card, .section-header, .banner-text');
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if(entry.isIntersecting){
entry.target.classList.add('visible');
observer.unobserve(entry.target);
}
});
}, {threshold: 0.1});

fadeEls.forEach(el => observer.observe(el));

// Expandir/ocultar certificados extras
const grid = document.getElementById("cert-grid");
const verMaisBtn = document.getElementById("ver-mais");

if (grid && verMaisBtn) {
  grid.classList.add("collapsed");
  verMaisBtn.addEventListener("click", () => {
    const expanded = grid.classList.toggle("expanded");
    grid.classList.toggle("collapsed", !expanded);
    verMaisBtn.textContent = expanded ? "Ver menos certificados" : "Ver mais certificados";
  });
}

// Efeito digitando (typewriter)
const roles = [
  "Técnica em Automação",
  "Cientista de Dados",
  "Desenvolvedora"
];
let currentRole = 0;
let currentChar = 0;
const typeEl = document.getElementById("typewriter");

function typeRole() {
  if (!typeEl) return;
  if (currentChar < roles[currentRole].length) {
    typeEl.textContent += roles[currentRole].charAt(currentChar);
    currentChar++;
    setTimeout(typeRole, 100);
  } else {
    setTimeout(eraseRole, 2000);
  }
}
function eraseRole() {
  if (currentChar > 0) {
    typeEl.textContent = roles[currentRole].substring(0, currentChar - 1);
    currentChar--;
    setTimeout(eraseRole, 50);
  } else {
    currentRole = (currentRole + 1) % roles.length;
    setTimeout(typeRole, 200);
  }
}
typeRole();


// Fundo de partículas - versão corrigida
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  let w, h;

  function resizeCanvas() {
    const banner = document.querySelector(".banner-section");
    w = canvas.width = banner.offsetWidth;
    h = canvas.height = banner.offsetHeight;
    createParticles();
  }

  function createParticles() {
    particlesArray = [];
    const num = Math.floor((w * h) / 15000); // densidade
    for (let i = 0; i < num; i++) {
      particlesArray.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    //const isDark = document.body.getAttribute("data-theme") === "dark";
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
ctx.fillStyle = isDark
  ? "rgba(173, 216, 230, 0.7)" // azul claro
  : "rgba(30, 30, 30, 0.3)";

    particlesArray.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  drawParticles();
}


// Mostrar/ocultar detalhes de experiência
document.querySelectorAll('.exp-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target.style.display === 'block') {
      target.style.display = 'none';
      btn.textContent = 'Saiba mais';
    } else {
      target.style.display = 'block';
      btn.textContent = 'Mostrar menos';
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const projGrid = document.getElementById("proj-grid");
  const verMaisBtn = document.getElementById("ver-mais-projetos");

  if (projGrid && verMaisBtn) {
    verMaisBtn.addEventListener("click", () => {
      const isExpanded = projGrid.classList.contains("expanded");

      projGrid.classList.toggle("expanded");
      projGrid.classList.toggle("collapsed", isExpanded);

      verMaisBtn.textContent = isExpanded
        ? "Ver mais projetos"
        : "Ver menos projetos";
    });
  }
});