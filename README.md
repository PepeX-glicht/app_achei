# Achei!

Aplicação acadêmica de achados e perdidos para centralizar avisos de objetos perdidos ou encontrados, com local, data e contato de quem publicou.

**Tema:** Achados e perdidos  
**Integrantes:** Pedro Henrique, Daniel Silva Marques e Leonardo Severo

## Executar

Requer Node.js e npm.

```bash
npm install
npm run dev
```

O Vite informará o endereço local para abrir no navegador. Para validar a versão de produção:

```bash
npm run build
npm run preview
```

## Sobre o protótipo

- Aplicação sem backend, banco de dados ou autenticação real.
- Os dados iniciais ficam em `src/js/dadosMockados/`; novos avisos existem apenas até atualizar a página.
- O usuário da tela “Minha conta” é simulado e fixo.
- A navegação usa hash e parâmetros de URL.
- O relatório da disciplina está em `docs/relatorio.html` e `docs/relatorio.pdf`.
- Antes da entrega, o grupo deve completar no relatório a divisão real de tarefas, os hashes dos commits e as duas dificuldades realmente vividas.
