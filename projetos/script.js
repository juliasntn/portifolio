// Tema salvo no localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.body.className = savedTheme;

// Alternar tema
const themeToggle = document.querySelector("#theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.className);
    themeToggle.innerHTML = document.body.classList.contains("dark-theme")
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
}

// Fade nas seções
const fadeEls = document.querySelectorAll(".fade");
function handleFade() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("visible");
  });
}
window.addEventListener("scroll", handleFade);
window.addEventListener("load", handleFade);

// Parallax na imagem
// const banner = document.querySelector(".projeto-capa img");
// if (banner) {
//   window.addEventListener("scroll", () => {
//     const offset = window.scrollY * 0.3;
//     banner.style.transform = `translateY(${offset}px) scale(1.05)`;
//   });
// }

// Galeria clicável
document.querySelectorAll(".galeria-grid img").forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="overlay-content">
        <img src="${img.src}" alt="${img.alt}">
        <span class="close-btn">&times;</span>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", e => {
      if (e.target.classList.contains("overlay") || e.target.classList.contains("close-btn")) {
        overlay.remove();
      }
    });
  });
});
// ======== MENU MOBILE ========
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.innerHTML = navMenu.classList.contains("active")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Fechar menu ao clicar em link
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}
