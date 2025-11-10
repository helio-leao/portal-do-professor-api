import { Router } from "express";
import type Aluno from "../types/Aluno";
import generateId from "../utils/IDGeneratorTEMPORARY.ts";

const router = Router();

//TODO: remove after connecting to database
let alunos: Aluno[] = [];

router.post("/", (req, res) => {
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

router.get("/", (req, res) => {
  res.json(alunos);
});

router.delete("/", (req, res) => {
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
