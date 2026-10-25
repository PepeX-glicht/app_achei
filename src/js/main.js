import { rotas } from "./rotas/rotas.js";
import { renderNavbar, updateActiveLink } from "./navbar/navbar.js";
import "./main.css";

const app = document.querySelector("#app");
renderNavbar(rotas);

function renderApp() {
  const hash = window.location.hash || "#/inicio";
  const [path, queryString = ""] = hash.slice(1).split("?");
  const route = rotas.find((item) => item.url === path);
  const params = new URLSearchParams(queryString);

  if (route) {
    route.pagina(app, params);
    updateActiveLink(path);
  } else {
    const notFound = rotas.find((item) => item.url === "/404");
    notFound.pagina(app, params);
    updateActiveLink("");
  }

  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

window.addEventListener("hashchange", renderApp);

if (!window.location.hash) {
  window.location.hash = "#/inicio";
} else {
  renderApp();
}
