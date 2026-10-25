import { itens } from "../dadosMockados/itens.js";
import { publicadores } from "../dadosMockados/usuarios.js";
import { escapeHTML, formatDate } from "../utils.js";
import "./detalhe.css";

export const paginaDetalhe = (app, params = new URLSearchParams()) => {
  const id = Number(params.get("id"));
  const item = itens.find((registro) => registro.id === id);

  if (!item) {
    app.innerHTML = `
      <section class="page detail-page">
        <div class="empty-state">
          <p class="eyebrow">Aviso não encontrado</p>
          <h1>Esse item não está disponível.</h1>
          <p>O endereço pode estar incorreto ou o aviso não existe nesta sessão.</p>
          <a class="button" href="#/resultados">Voltar aos avisos</a>
        </div>
      </section>
    `;
    return;
  }

  const publicador = publicadores.find((pessoa) => pessoa.id === item.publicadorId);
  app.innerHTML = `
    <section class="page detail-page">
      <a class="detail-back" href="#/resultados">← Voltar aos avisos</a>
      <article class="detail-card surface">
        <div class="detail-card__heading">
          <div class="detail-card__labels">
            <span class="detail-card__category">${escapeHTML(item.categoria)}</span>
            <span class="detail-card__status detail-card__status--${item.situacao === "Encontrado" ? "found" : "lost"}">${escapeHTML(item.situacao)}</span>
          </div>
          <p class="eyebrow">Aviso #${escapeHTML(item.id)}</p>
          <h1>${escapeHTML(item.titulo)}</h1>
          <p class="detail-card__description">${escapeHTML(item.descricao)}</p>
        </div>
        <dl class="detail-facts">
          <div><dt>Local</dt><dd>${escapeHTML(item.local)}</dd></div>
          <div><dt>Data do aviso</dt><dd>${escapeHTML(formatDate(item.data))}</dd></div>
          <div><dt>Publicado por</dt><dd>${escapeHTML(publicador?.nome ?? "Pessoa da comunidade")}</dd></div>
          <div><dt>Contato</dt><dd>${escapeHTML(publicador?.contato ?? "Consulte a recepção do campus")}</dd></div>
        </dl>
        <aside class="detail-safety">
          <strong>Combine com cuidado</strong>
          <p>Marque a entrega em um local público. Não compartilhe senhas, códigos ou dados pessoais para confirmar a propriedade.</p>
        </aside>
      </article>
      <a class="button button--secondary" href="#/resultados">Encontrar outro aviso</a>
    </section>
  `;
};

export const telaDetalhe = {
  url: "/detalhe",
  label: "",
  icon: "",
  pagina: paginaDetalhe
};
