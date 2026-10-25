import { itens } from "../dadosMockados/itens.js";
import { publicadores } from "../dadosMockados/usuarios.js";
import { escapeHTML, normalizeText } from "../utils.js";
import { itemCard } from "./itemCard.js";
import "./resultados.css";

export const paginaResultados = (app, params = new URLSearchParams()) => {
  const termo = params.get("q") ?? "";
  const categoria = params.get("categoria") ?? "";
  const situacao = params.get("situacao") ?? "";
  const ordem = params.get("ordem") ?? "recentes";
  const categorias = [...new Set(itens.map((item) => item.categoria))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
  const resultados = itens
    .filter((item) => {
      const conteudo = normalizeText(`${item.titulo} ${item.categoria} ${item.situacao} ${item.descricao} ${item.local}`);
      return (!termo || conteudo.includes(normalizeText(termo)))
        && (!categoria || item.categoria === categoria)
        && (!situacao || item.situacao === situacao);
    })
    .sort((a, b) => ordem === "antigos" ? a.data.localeCompare(b.data) : b.data.localeCompare(a.data));

  app.innerHTML = `
    <section class="page results-page">
      <header class="page-heading">
        <p class="eyebrow">Busca da comunidade</p>
        <h1>Avisos de achados e perdidos</h1>
        <p>Pesquise por objeto, local ou categoria. Confira a data e combine a devolução com segurança.</p>
      </header>
      <form class="results-filters surface" id="results-filters" role="search">
        <div class="form-field results-filters__query">
          <label for="results-query">Buscar</label>
          <input id="results-query" name="q" type="search" value="${escapeHTML(termo)}" placeholder="Ex.: chaveiro ou biblioteca" />
        </div>
        <div class="form-field">
          <label for="results-category">Categoria</label>
          <select id="results-category" name="categoria">
            <option value="">Todas</option>
            ${categorias.map((itemCategoria) => `<option value="${escapeHTML(itemCategoria)}"${itemCategoria === categoria ? " selected" : ""}>${escapeHTML(itemCategoria)}</option>`).join("")}
          </select>
        </div>
        <div class="form-field">
          <label for="results-status">Situação</label>
          <select id="results-status" name="situacao">
            <option value="">Perdidos e encontrados</option>
            <option value="Perdido"${situacao === "Perdido" ? " selected" : ""}>Perdido</option>
            <option value="Encontrado"${situacao === "Encontrado" ? " selected" : ""}>Encontrado</option>
          </select>
        </div>
        <div class="form-field">
          <label for="results-order">Ordenar</label>
          <select id="results-order" name="ordem">
            <option value="recentes"${ordem !== "antigos" ? " selected" : ""}>Mais recentes</option>
            <option value="antigos"${ordem === "antigos" ? " selected" : ""}>Mais antigos</option>
          </select>
        </div>
        <button class="button" type="submit">Aplicar filtros</button>
      </form>
      <div class="results-summary" aria-live="polite">
        <p><strong>${resultados.length}</strong> ${resultados.length === 1 ? "aviso encontrado" : "avisos encontrados"}${termo ? ` para “${escapeHTML(termo)}”` : ""}</p>
        ${categoria ? `<a href="#/resultados${termo ? `?q=${encodeURIComponent(termo)}` : ""}">Limpar categoria</a>` : ""}
      </div>
      ${resultados.length === 0
        ? `<div class="empty-state"><p class="eyebrow">Busca sem resultados</p><h2>Nenhum aviso por aqui ainda.</h2><p>Tente outro termo ou remova algum filtro. Se encontrou o objeto, publique um aviso para ajudar.</p><a class="button" href="#/publicar">Publicar um aviso</a></div>`
        : `<div class="results-list">${resultados.map((item) => itemCard(item, publicadores.find((pessoa) => pessoa.id === item.publicadorId))).join("")}</div>`
      }
    </section>
  `;

  app.querySelector("#results-filters").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextParams = new URLSearchParams();
    ["q", "categoria", "situacao", "ordem"].forEach((key) => {
      const value = String(formData.get(key) ?? "").trim();
      if (value && !(key === "ordem" && value === "recentes")) nextParams.set(key, value);
    });
    window.location.hash = `#/resultados${nextParams.size ? `?${nextParams.toString()}` : ""}`;
  });
};

export const telaResultados = {
  url: "/resultados",
  label: "Buscar",
  icon: "⌕",
  pagina: paginaResultados
};
