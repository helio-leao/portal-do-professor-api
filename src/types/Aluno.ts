export default interface Aluno {
  _id: string;
  nome: string;
  email: string;
  turma: string;
  status: "ATIVO" | "INATIVO";
}
