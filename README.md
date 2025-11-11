# 🧑‍🏫 Portal do Professor – API

API REST construída com **Node.js** e **Express**, com autenticação via **JWT** e dados **mockados**.  
As rotas são **protegidas por middleware de autenticação** e simulam as operações de um sistema de gerenciamento de alunos e usuários de um portal administrativo.

---

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- JWT (JSON Web Token)

---

## ⚙️ Instalação e execução

```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

---

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com os seguintes valores:

```
ACCESS_TOKEN_SECRET=algumseguro
REFRESH_TOKEN_SECRET=outrosecreto
PORT=3000
```

---

## 🧱 Estrutura principal

```
src/
 ├─ middlewares/
 │   └─ authToken.ts
 ├─ mocks/
 │   └─ Users.ts
 ├─ routes/
 │   ├─ alunos.ts
 │   └─ auth.ts
 ├─ types/
 │   ├─ Aluno.ts
 │   └─ TokenPayload.ts
 └─ utils/
     └─ IDGeneratorTEMPORARY.ts
```

---

## 👤 Usuário mockado

O login é feito com um **usuário mockado**, definido em `src/mocks/Users.ts`.  
Use as credenciais abaixo para autenticar e gerar tokens:

```
username: admin
password: 123
```

---

## 🧩 Middleware de autenticação

O middleware `authToken.ts` valida o token JWT recebido no header `Authorization` (formato: `Bearer <token>`).  
Se o token for válido, a requisição é liberada; caso contrário, retorna **401 Unauthorized**.

---

## 🔒 Rotas de autenticação (`/auth`)

### `POST /auth/login`

Autentica o usuário mockado e retorna um **accessToken** (10 min) e um **refreshToken**.

**Body:**

```json
{
  "username": "admin",
  "password": "123"
}
```

**Resposta:**

```json
{
  "user": { "_id": "1", "username": "admin" },
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### `POST /auth/token`

Gera um novo **accessToken** a partir de um **refreshToken** válido.

**Body:**

```json
{ "refreshToken": "..." }
```

**Resposta:**

```json
{ "accessToken": "..." }
```

---

### `DELETE /auth/logout`

Revoga o refresh token informado.

**Body:**

```json
{ "refreshToken": "..." }
```

**Resposta:**  
`204 No Content` (sucesso)  
`404 Not Found` (token inexistente)

---

## 👨‍🎓 Rotas de alunos (`/alunos`)

> Todas as rotas exigem header `Authorization: Bearer <accessToken>`.

### `GET /alunos`

Lista todos os alunos mockados.

---

### `GET /alunos/:id`

Retorna um aluno específico pelo ID.

---

### `POST /alunos`

Cria um novo aluno.

**Body:**

```json
{
  "nome": "João",
  "email": "joao@email.com",
  "turma": "A",
  "status": "ATIVO"
}
```

**Resposta:**

```json
{
  "_id": "uuid-gerado",
  "nome": "João",
  "email": "joao@email.com",
  "turma": "A",
  "status": "ATIVO"
}
```

---

### `PATCH /alunos/:id`

Atualiza um aluno existente.

**Body:** mesmo formato do `POST`.  
**Resposta:** aluno atualizado.

---

### `DELETE /alunos/:id`

Remove o aluno pelo ID.  
**Resposta:** `204 No Content`

---

## 🧠 Observações

- Os **dados e usuários são mockados em memória**, ou seja, reiniciam a cada execução.
- O uso de tokens JWT simula a segurança real de um ambiente produtivo.
- Middleware e rotas seguem boas práticas REST, prontos para futura integração com banco de dados.

---

## 📬 Contato

Desenvolvido por **Hélio Leão** — Full Stack Developer (Node, React, React Native, MongoDB, PostgreSQL).
