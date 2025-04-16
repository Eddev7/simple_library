// Importa o framework Express para criar o servidor
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar IDs únicos

// Cria uma instância do aplicativo Express
const app = express();
// Define a porta onde o servidor será executado
const port = 3100;

// Libera o CORS pra qualquer origem
app.use(cors());

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Define o tipo Book com as propriedades de um livro
type Book = {
  id: string; // ID único do livro
  titulo: string; // Título do livro
  autor: string; // Autor do livro
  anoPublicacao: number; // Ano de publicação do livro
  codigo: string; // Código único do livro
  disponibilidade: boolean; // Disponibilidade do livro (true ou false)
};

// Array para armazenar os livros
const books: Book[] = [];

// Rota inicial da API
app.get("/apiBooksV1", (_req, res) => {
  res.send("API - Books"); // Retorna uma mensagem simples
});

// Rota para listar todos os livros
app.get("/apiBooksV1/livros", (req, res) => {
  const { disponibilidade } = req.query;

  if (disponibilidade === "true") {
    const availableBooks = books.filter((book) => book.disponibilidade);
    res.send(availableBooks);
    return;
  }

  res.send(books); // retorna todos os livros se não tiver filtro
});

// Rota para buscar um livro pelo ID
app.get("/apiBooksV1/livros/:id", (req, res) => {
  const { id } = req.params; // Obtém o ID do livro dos parâmetros da URL

  if (!id) {
    res.status(400).send("ID do livro é obrigatório"); // Retorna erro se o ID não for fornecido
    return;
  }

  const book = books.find((book) => book.id === id); // Busca o livro pelo ID

  if (!book) {
    res.status(404).send("Livro não encontrado"); // Retorna erro se o livro não for encontrado
    return;
  }

  res.send(book); // Retorna o livro encontrado
});

// Rota para adicionar um novo livro
app.post("/apiBooksV1/livros", (req, res) => {
  const { titulo, autor, anoPublicacao, codigo, disponibilidade } = req.body; // Obtém os dados do corpo da requisição

  if (
    !titulo ||
    !autor ||
    !anoPublicacao ||
    !codigo ||
    disponibilidade === undefined
  ) {
    res.status(400).send("Todos os campos são obrigatórios"); // Retorna erro se algum campo estiver faltando
    return;
  }

  // Criação e adição do novo livro
  const newBook: Book = {
    id: uuidv4(), // Gera um ID único para o livro
    titulo,
    autor,
    anoPublicacao,
    codigo,
    disponibilidade,
  };
  books.push(newBook); // Adiciona o livro ao array

  // Retorno de sucesso
  res.status(201).send({
    message: "Livro adicionado com sucesso.",
    id: newBook.id, // Retorna o ID do livro criado
  });
});

// Rota para atualizar um livro pelo ID
app.put("/apiBooksV1/livros/:id", (req, res) => {
  const { id } = req.params; // Obtém o ID do livro dos parâmetros da URL

  if (!id) {
    res.status(400).send("ID do livro é obrigatório"); // Retorna erro se o ID não for fornecido
    return;
  }

  const { titulo, autor, anoPublicacao, disponibilidade, codigo } = req.body; // Obtém os dados do corpo da requisição

  if (!titulo && !autor && !anoPublicacao && disponibilidade === undefined) {
    res.status(400).send("Pelo menos um campo deve ser atualizado"); // Retorna erro se nenhum campo for fornecido para atualização
    return;
  }

  const bookIndex = books.findIndex((book) => book.id === id); // Busca o índice do livro pelo ID

  if (bookIndex === -1) {
    res.status(404).send("Livro não encontrado"); // Retorna erro se o livro não for encontrado
    return;
  }

  // Atualização do livro
  books[bookIndex] = {
    ...books[bookIndex], // Mantém os dados existentes
    ...(titulo !== undefined && { titulo }), // Atualiza o título, se fornecido
    ...(autor !== undefined && { autor }), // Atualiza o autor, se fornecido
    ...(anoPublicacao !== undefined && { anoPublicacao }), // Atualiza o ano de publicação, se fornecido7
    ...(codigo !== undefined && { codigo }), // Atualiza o codigo, se fornecido
    ...(disponibilidade !== undefined && { disponibilidade }), // Atualiza a disponibilidade, se fornecida
  };

  res.status(200).send({
    message: "Livro atualizado com sucesso.", // Retorna mensagem de sucesso
    id: books[bookIndex].id, // Retorna o ID do livro atualizado
  }); // Retorna mensagem de sucesso
});

// Rota para remover um livro pelo ID
app.delete("/apiBooksV1/livros/:id", (req, res) => {
  const { id } = req.params; // Obtém o ID do livro dos parâmetros da URL

  if (!id) {
    res.status(400).send("ID do livro é obrigatório"); // Retorna erro se o ID não for fornecido
    return;
  }

  const bookIndex = books.findIndex((book) => book.id === id); // Busca o índice do livro pelo ID

  if (bookIndex === -1) {
    res.status(404).send("Livro não encontrado"); // Retorna erro se o livro não for encontrado
    return;
  }

  books.splice(bookIndex, 1); // Remove o livro do array
  res.status(200).send({
    message: "Livro removido com sucesso.", // Retorna mensagem de sucesso
    id: id, // Retorna o ID do livro removido
  }); // Retorna mensagem de sucesso
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log("API - BOOKS V1"); // Exibe mensagem no console indicando que o servidor está rodando
});

export { app, books }; // Exporta o aplicativo para testes