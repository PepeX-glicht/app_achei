export const usuarios = [
  { id: 1, nome: "Pedro Henrique", curso: "Design Digital", unidade: "Campus Centro" },
  { id: 2, nome: "Daniel Silva Marques", curso: "Análise e Desenvolvimento de Sistemas", unidade: "Campus Centro" },
  { id: 3, nome: "Leonardo Severo", curso: "Gestão de Tecnologia", unidade: "Campus Centro" },
  { id: 4, nome: "Marina Costa", curso: "Comunicação", unidade: "Campus Centro" }
];

export const publicadores = usuarios.map((usuario) => ({
  id: usuario.id,
  usuarioId: usuario.id,
  nome: usuario.nome,
  contato: `${usuario.nome.toLocaleLowerCase("pt-BR").replaceAll(" ", ".")}@exemplo.edu.br`
}));

export const usuarioAtualId = 1;
