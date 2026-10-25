import "./naoEncontrada.css";

export const paginaNaoEncontrada = (app) => {
  app.innerHTML = `
    <section class="page not-found-page">
      <div class="not-found-art" aria-hidden="true">404</div>
      <p class="eyebrow">Endereço não encontrado</p>
      <h1>Esse caminho não existe.</h1>
      <p>Confira o endereço ou volte para o início para continuar procurando.</p>
      <a class="button" href="#/inicio">Voltar ao início</a>
    </section>
  `;
};

export const telaNaoEncontrada = {
  url: "/404",
  label: "",
  icon: "",
  pagina: paginaNaoEncontrada
};
