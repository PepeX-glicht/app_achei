import { escapeHTML, formatDate } from "../utils.js";
import "./itemCard.css";

export function itemCard(item, publicador) {
  return `
    <article class="item-card surface">
      <div class="item-card__topline">
        <span class="item-card__category">${escapeHTML(item.categoria)}</span>
        <span class="item-card__status item-card__status--${item.situacao === "Encontrado" ? "found" : "lost"}">${escapeHTML(item.situacao)}</span>
      </div>
      <h2><a href="#/detalhe?id=${encodeURIComponent(item.id)}">${escapeHTML(item.titulo)}</a></h2>
      <p class="item-card__description">${escapeHTML(item.descricao)}</p>
      <div class="item-card__meta">
        <span>⌖ ${escapeHTML(item.local)}</span>
        <span>◷ ${escapeHTML(formatDate(item.data))}</span>
      </div>
      <p class="item-card__publisher">Publicado por ${escapeHTML(publicador?.nome ?? "Pessoa da comunidade")}</p>
      <a class="item-card__link" href="#/detalhe?id=${encodeURIComponent(item.id)}">Ver detalhes <span aria-hidden="true">→</span></a>
    </article>
  `;
}
