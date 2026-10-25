import { itens } from "../dadosMockados/itens.js";
import { publicadores, usuarios, usuarioAtualId } from "../dadosMockados/usuarios.js";
import { escapeHTML } from "../utils.js";
import { itemCard } from "./itemCard.js";
import "./conta.css";

export const paginaConta = (app) => {
  const usuario = usuarios.find((pessoa) => pessoa.id === usuarioAtualId);
  const publicador = publicadores.find((pessoa) => pessoa.usuarioId === usuarioAtualId);
  const meusItens = itens.filter((item) => item.publicadorId === usuarioAtualId);

  app.innerHTML = `
    <section class="page account-page">
      <header class="page-heading">
        <p class="eyebrow">Área da comunidade</p>
        <h1>Minha conta</h1>
        <p>Uma demonstração de conta fixa, sem cadastro ou autenticação real.</p>
      </header>
      ${usuario ? `
        <section class="account-profile surface" aria-label="Perfil simulado">
          <div class="account-profile__avatar" aria-hidden="true">${escapeHTML(usuario.nome.split(" ").map((parte) => parte[0]).slice(0, 2).join(""))}</div>
          <div class="account-profile__info">
            <p class="eyebrow">Usuário simulado</p>
            <h2>${escapeHTML(usuario.nome)}</h2>
            <p>${escapeHTML(usuario.curso)} · ${escapeHTML(usuario.unidade)}</p>
          </div>
          <div class="account-profile__contact">
            <span>Contato de demonstração</span>
            <strong>${escapeHTML(publicador?.contato ?? "Não informado")}</strong>
          </div>
        </section>
      ` : `<div class="empty-state"><h2>Perfil indisponível</h2><p>O usuário de demonstração não foi encontrado nos dados locais.</p></div>`}
      <section class="account-items" aria-labelledby="account-items-title">
        <div class="home-section__heading">
          <div>
            <p class="eyebrow">Seus avisos</p>
            <h2 id="account-items-title">${meusItens.length} ${meusItens.length === 1 ? "publicação" : "publicações"}</h2>
          </div>
          <a class="button" href="#/publicar">＋ Publicar novo aviso</a>
        </div>
        ${meusItens.length === 0
          ? `<div class="empty-state"><h2>Você ainda não publicou avisos.</h2><p>Compartilhe informações de um objeto perdido ou encontrado para ajudar a comunidade.</p><a class="button" href="#/publicar">Criar primeiro aviso</a></div>`
          : `<div class="account-list">${meusItens.map((item) => itemCard(item, publicador)).join("")}</div>`
        }
      </section>
    </section>
  `;
};

export const telaConta = {
  url: "/conta",
  label: "Minha conta",
  icon: "◉",
  pagina: paginaConta
};
