import { itens } from "../dadosMockados/itens.js";
import { publicadores } from "../dadosMockados/usuarios.js";
import { escapeHTML } from "../utils.js";
import { itemCard } from "./itemCard.js";
import "./inicio.css";

export const paginaInicio = (app) => {
  const categorias = [...new Set(itens.map((item) => item.categoria))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
  const recentes = [...itens]
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, 3);

  app.innerHTML = `
    <section class="page home-page">
      <div class="home-hero">
        <div class="home-hero__copy">
          <p class="eyebrow">Comunidade Achei!</p>
          <h1>Perdeu algo? Alguém pode ter encontrado.</h1>
          <p>Encontre avisos com local e data, ou ajude alguém a recuperar o que perdeu.</p>
          <form class="home-search" id="home-search" role="search">
            <label class="sr-only" for="home-search-term">O que você procura?</label>
            <span aria-hidden="true">⌕</span>
            <input id="home-search-term" name="q" type="search" placeholder="Ex.: chaveiro, garrafa, caderno" autocomplete="off" />
            <button class="button" type="submit">Buscar</button>
          </form>
          <div class="home-hero__actions">
            <a class="home-text-link" href="#/resultados?situacao=Encontrado">Ver itens encontrados <span aria-hidden="true">→</span></a>
            <a class="home-text-link" href="#/publicar">Publicar um aviso <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div class="home-hero__illustration" aria-hidden="true">
          <span class="home-illustration__spark home-illustration__spark--one">✦</span>
          <span class="home-illustration__circle">Achei!</span>
          <span class="home-illustration__spark home-illustration__spark--two">✳</span>
          <span class="home-illustration__caption">um encontro<br />pode mudar o dia</span>
        </div>
      </div>

      <section class="home-section" aria-labelledby="home-categories-title">
        <div class="home-section__heading">
          <div>
            <p class="eyebrow">Explore os avisos</p>
            <h2 id="home-categories-title">O que você perdeu?</h2>
          </div>
          <a class="home-text-link" href="#/resultados">Ver todos <span aria-hidden="true">→</span></a>
        </div>
        <div class="category-list">
          ${categorias.map((categoria) => `
            <a class="category-chip" href="#/resultados?categoria=${encodeURIComponent(categoria)}">
              <span aria-hidden="true">${categoria === "Eletrônicos" ? "⌁" : categoria === "Chaves" ? "⚿" : "＋"}</span>
              ${escapeHTML(categoria)}
            </a>
          `).join("")}
        </div>
      </section>

      <section class="home-section" aria-labelledby="home-recent-title">
        <div class="home-section__heading">
          <div>
            <p class="eyebrow">Atualizados pela comunidade</p>
            <h2 id="home-recent-title">Avisos recentes</h2>
          </div>
          <a class="home-text-link" href="#/resultados">Explorar avisos <span aria-hidden="true">→</span></a>
        </div>
        <div class="item-list">
          ${recentes.map((item) => itemCard(item, publicadores.find((pessoa) => pessoa.id === item.publicadorId))).join("")}
        </div>
      </section>
      <p class="home-safety">Dica: combine a devolução em um local público e confirme os detalhes do objeto em particular.</p>
    </section>
  `;

  app.querySelector("#home-search").addEventListener("submit", (event) => {
    event.preventDefault();
    const term = app.querySelector("#home-search-term").value.trim();
    window.location.hash = `#/resultados${term ? `?q=${encodeURIComponent(term)}` : ""}`;
  });
};

export const telaInicio = {
  url: "/inicio",
  label: "Início",
  icon: "⌂",
  pagina: paginaInicio
};
