# 📚 API Books V1

API REST simples desenvolvida com **Node.js**, **Express** e **TypeScript** para gerenciar um catálogo de livros em memória.

---

## 🚀 Instalação e Execução

```bash
npm install
npx ts-node index.ts
```

> A aplicação será executada na porta `3100`.

---

## 🌐 Middleware

- `express.json()`: Permite receber requisições com `Content-Type: application/json`.
- `cors()`: Libera o CORS para qualquer origem.

---

## 📘 Tipo Book

```ts
type Book = {
  titulo: string;
  autor: string;
  anoPublicacao: number;
  codigo: string;
  disponibilidade: boolean;
}
```

---

## 📌 Endpoints

### GET `/apiBooksV1`

Retorna uma mensagem simples para indicar que a API está online.

**Resposta:**
```
API - Books
```

---

### GET `/apiBooksV1/livros`

Retorna **todos os livros cadastrados**.

---

### GET `/apiBooksV1/livros/:codigo`

Busca um livro pelo `código`.

**Parâmetros:**
- `codigo` (string) — obrigatório

**Respostas:**
- `200 OK`: Livro encontrado
- `404 Not Found`: Livro não encontrado
- `400 Bad Request`: Código não informado

---

### GET `/apiBooksV1/livros?disponibilidade=true`

Retorna **somente os livros disponíveis** (`disponibilidade = true`).

> ⚠️ Atualmente, este endpoint não considera o valor da query string. Sempre retorna os livros com `disponibilidade: true`.

---

### POST `/apiBooksV1/livros`

Adiciona um novo livro ao catálogo.

**Body (JSON):**
```json
{
  "titulo": "Nome do Livro",
  "autor": "Autor do Livro",
  "anoPublicacao": 2024,
  "codigo": "ABC123",
  "disponibilidade": true
}
```

**Respostas:**
- `201 Created`: Livro adicionado com sucesso
- `400 Bad Request`: Campos obrigatórios ausentes

---

### PUT `/apiBooksV1/livros/:codigo`

Atualiza os dados de um livro existente.

**Parâmetros:**
- `codigo` (string) — obrigatório

**Body (JSON)** – pode conter qualquer campo do tipo `Book`:
```json
{
  "titulo": "Novo Título",
  "disponibilidade": false
}
```

**Respostas:**
- `200 OK`: Livro atualizado com sucesso
- `404 Not Found`: Livro não encontrado
- `400 Bad Request`: Nenhum campo informado para atualizar

---

### DELETE `/apiBooksV1/livros/:codigo`

Remove um livro do catálogo pelo `codigo`.

**Parâmetros:**
- `codigo` (string) — obrigatório

**Respostas:**
- `200 OK`: Livro removido
- `404 Not Found`: Livro não encontrado
- `400 Bad Request`: Código não informado

---

## 🧪 Exemplo de Requisição com curl

```bash
curl -X POST http://localhost:3100/apiBooksV1/livros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Clean Code","autor":"Robert C. Martin","anoPublicacao":2008,"codigo":"clean001","disponibilidade":true}'
```

---

## 📌 Observações

- Os dados são armazenados apenas **em memória** (não persistem após reiniciar o servidor).
- Ideal para fins de aprendizado e testes locais.

---
