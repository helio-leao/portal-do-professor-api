import { Router } from "express";
import type Aluno from "../types/Aluno";
import generateId from "../utils/IDGeneratorTEMPORARY.ts";
import authToken from "../middlewares/authToken.ts";

const router = Router();

//TODO: remove after connecting to database
let alunos: Aluno[] = [
  {
    _id: "de31838e-f817-44fb-a28a-95c9600575ab",
    email: "hmtleao@hotmail.com",
    nome: "Hélio",
    status: "ATIVO",
    turma: "",
  },
  {
    _id: "f1150311-0f7b-406e-a8ca-8c7466b03ac1",
    email: "amleao@gmail.com",
    nome: "Ana",
    status: "INATIVO",
    turma: "",
  },
];

router.post("/", authToken, (req, res) => {
  const { nome, email, turma, status } = req.body;

  const aluno: Aluno = {
    _id: generateId(),
    nome,
    email,
    turma,
    status,
  };

  alunos.push(aluno);
  res.json(aluno);
});

router.get("/", authToken, (req, res) => {
  res.json(alunos);
});

router.delete("/", authToken, (req, res) => {
  const { id } = req.body;

  try {
    alunos = alunos.filter((a) => a._id !== id);
    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
