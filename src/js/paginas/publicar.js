import { itens } from "../dadosMockados/itens.js";
import { publicadores, usuarioAtualId } from "../dadosMockados/usuarios.js";
import { escapeHTML, normalizeText } from "../utils.js";
import "./publicar.css";

const categorias = [
  "Acessórios",
  "Chaves",
  "Documentos e cartões",
  "Eletrônicos",
  "Garrafas",
  "Livros",
  "Material escolar",
  "Outros"
];

export const paginaPublicar = (app) => {
  const publicador = publicadores.find((pessoa) => pessoa.usuarioId === usuarioAtualId);
  const hoje = new Date().toLocaleDateString("en-CA");

  app.innerHTML = `
    <section class="page publish-page">
      <header class="page-heading">
        <p class="eyebrow">Ajude a comunidade</p>
        <h1>Publique um aviso</h1>
        <p>Conte o que foi perdido ou encontrado e informe onde e quando. Não divulgue documentos ou dados sensíveis.</p>
      </header>
      <form class="publish-form surface" id="publish-form">
        <div class="publish-form__intro">
          <span aria-hidden="true">＋</span>
          <div><strong>Um aviso claro ajuda mais.</strong><p>Os dados são fictícios e não ficam salvos após atualizar a página.</p></div>
        </div>
        <div class="form-field">
          <label for="item-title">Nome do objeto</label>
          <input id="item-title" name="titulo" type="text" required minlength="3" maxlength="70" placeholder="Ex.: Chaveiro com duas chaves" />
        </div>
        <div class="publish-form__row">
          <div class="form-field">
            <label for="item-status">Situação</label>
            <select id="item-status" name="situacao" required>
              <option value="Perdido">Perdi este objeto</option>
              <option value="Encontrado">Encontrei este objeto</option>
            </select>
          </div>
          <div class="form-field">
            <label for="item-category">Categoria</label>
            <select id="item-category" name="categoria" required>
              ${categorias.map((categoria) => `<option value="${escapeHTML(categoria)}">${escapeHTML(categoria)}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="form-field">
          <label for="item-description">Descrição</label>
          <textarea id="item-description" name="descricao" required minlength="10" maxlength="280" placeholder="Descreva sinais que ajudem a reconhecer o objeto. Evite informar dados pessoais."></textarea>
          <p class="form-hint">De 10 a 280 caracteres. Guarde um detalhe para confirmar a propriedade.</p>
        </div>
        <div class="publish-form__row">
          <div class="form-field">
            <label for="item-location">Local</label>
            <input id="item-location" name="local" type="text" required minlength="3" maxlength="90" placeholder="Ex.: Biblioteca, balcão de entrada" />
          </div>
          <div class="form-field">
            <label for="item-date">Data</label>
            <input id="item-date" name="data" type="date" required max="${hoje}" value="${hoje}" />
          </div>
        </div>
        <p class="notice notice--error publish-error" id="publish-error" role="alert" hidden></p>
        <button class="button" type="submit">Publicar aviso</button>
        <p class="publish-form__account">Publicando como <strong>${escapeHTML(publicador?.nome ?? "Usuário visitante")}</strong> (conta simulada)</p>
      </form>
    </section>
  `;

  app.querySelector("#publish-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const titulo = String(values.get("titulo")).trim();
    const situacao = String(values.get("situacao"));
    const local = String(values.get("local")).trim();
    const repetido = itens.find((item) =>
      normalizeText(item.titulo) === normalizeText(titulo)
      && item.situacao === situacao
      && normalizeText(item.local) === normalizeText(local)
    );

    const error = app.querySelector("#publish-error");
    if (repetido) {
      error.hidden = false;
      error.textContent = `Já existe um aviso parecido (“${repetido.titulo}”, em ${repetido.local}). Confira os avisos antes de publicar novamente.`;
      return;
    }

    const novoItem = {
      id: itens.reduce((maiorId, item) => Math.max(maiorId, item.id), 0) + 1,
      titulo,
      categoria: String(values.get("categoria")),
      situacao,
      descricao: String(values.get("descricao")).trim(),
      local,
      data: String(values.get("data")),
      publicadorId: publicador?.id ?? usuarioAtualId
    };

    itens.push(novoItem);
    window.location.hash = `#/detalhe?id=${novoItem.id}`;
  });
};

export const telaPublicar = {
  url: "/publicar",
  label: "Publicar",
  icon: "+",
  pagina: paginaPublicar
};
