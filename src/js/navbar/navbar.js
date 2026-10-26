import "./navbar.css";

const navbar = document.querySelector("#navbar");

export function renderNavbar(rotas) {
  const links = rotas
    .filter((rota) => rota.label !== "")
    .map((rota) => `
      <a class="navbar__link" href="#${rota.url}" data-route="${rota.url}">
        <span aria-hidden="true">${rota.icon}</span>
        <span>${rota.label}</span>
      </a>
    `)
    .join("");

  navbar.innerHTML = `
    <div class="navbar__inner">
      <a class="navbar__brand" href="#/inicio" aria-label="Achei! — início">
        <span>Achei!</span>
      </a>
      <nav class="navbar__links" aria-label="Navegação principal">${links}</nav>
    </div>
  `;
}

export function updateActiveLink(path) {
  navbar.querySelectorAll(".navbar__link").forEach((link) => {
    if (link.dataset.route === path) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
