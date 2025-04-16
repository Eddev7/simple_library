import request from 'supertest';
import { app, books } from '../src/index'; // Importa a instância do app

describe('API Books V1', () => {
  // Limpa o array de livros antes de cada teste
  beforeEach(() => {
    books.length = 0; // Reseta o array
  });

  // Teste para a rota inicial
  describe('GET /apiBooksV1', () => {
    it('deve retornar a mensagem "API - Books"', async () => {
      const response = await request(app).get('/apiBooksV1');
      expect(response.status).toBe(200);
      expect(response.text).toBe('API - Books');
    });
  });

  // Testes para a rota de listar livros
  describe('GET /apiBooksV1/livros', () => {
    it('deve retornar uma lista vazia inicialmente', async () => {
      const response = await request(app).get('/apiBooksV1/livros');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('deve retornar apenas livros disponíveis quando filtrado', async () => {
      // Adiciona livros de teste
      await request(app)
        .post('/apiBooksV1/livros')
        .send({
          titulo: 'Livro 1',
          autor: 'Autor 1',
          anoPublicacao: 2020,
          codigo: '123',
          disponibilidade: true,
        });

      await request(app)
        .post('/apiBooksV1/livros')
        .send({
          titulo: 'Livro 2',
          autor: 'Autor 2',
          anoPublicacao: 2021,
          codigo: '456',
          disponibilidade: false,
        });

      const response = await request(app).get('/apiBooksV1/livros?disponibilidade=true');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].codigo).toBe('123');
    });
  });

  // Testes para buscar livro por ID
  describe('GET /apiBooksV1/livros/:id', () => {
    it('deve retornar 404 para livro inexistente', async () => {
      const response = await request(app).get('/apiBooksV1/livros/999');
      expect(response.status).toBe(404);
      expect(response.text).toBe('Livro não encontrado');
    });

    it('deve retornar o livro correto pelo ID', async () => {
      const postResponse = await request(app)
        .post('/apiBooksV1/livros')
        .send({
          titulo: 'Livro Teste',
          autor: 'Autor Teste',
          anoPublicacao: 2022,
          codigo: '789',
          disponibilidade: true,
        });

      const bookId = postResponse.body.id; // Obtém o ID retornado pelo POST

      const response = await request(app).get(`/apiBooksV1/livros/${bookId}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        titulo: 'Livro Teste',
        autor: 'Autor Teste',
        codigo: '789',
        disponibilidade: true,
        id: bookId,
      });
    });
  });

  // Testes para adicionar livro
  describe('POST /apiBooksV1/livros', () => {
    it('deve retornar 400 se faltar algum campo', async () => {
      const response = await request(app)
        .post('/apiBooksV1/livros')
        .send({ titulo: 'Livro Incompleto' });
      expect(response.status).toBe(400);
      expect(response.text).toBe('Todos os campos são obrigatórios');
    });

    it('deve adicionar um livro com sucesso e retornar o ID', async () => {
      const response = await request(app)
        .post('/apiBooksV1/livros')
        .send({
          titulo: 'Novo Livro',
          autor: 'Novo Autor',
          anoPublicacao: 2023,
          codigo: '101',
          disponibilidade: true,
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Livro adicionado com sucesso.',
        id: expect.any(String), // Verifica que o ID é uma string
      });

      // Verifica se o livro foi adicionado
      const booksResponse = await request(app).get('/apiBooksV1/livros');
      expect(booksResponse.body).toHaveLength(1);
      expect(booksResponse.body[0]).toMatchObject({
        titulo: 'Novo Livro',
        autor: 'Novo Autor',
        anoPublicacao: 2023,
        codigo: '101',
        disponibilidade: true,
        id: response.body.id, // Verifica que o ID corresponde
      });
    });
  });

  // Testes para atualizar livro
  describe('PUT /apiBooksV1/livros/:id', () => {
    it('deve retornar 404 para livro inexistente', async () => {
      const response = await request(app)
        .put('/apiBooksV1/livros/999')
        .send({ titulo: 'Atualizado' });
      expect(response.status).toBe(404);
      expect(response.text).toBe('Livro não encontrado');
    });

    it('deve atualizar um livro com sucesso e retornar o ID', async () => {
      // Adiciona um livro para testar a atualização
      const postResponse = await request(app)
        .post('/apiBooksV1/livros')
        .send({
          titulo: 'Livro Antigo',
          autor: 'Autor Antigo',
          anoPublicacao: 2020,
          codigo: '202',
          disponibilidade: false,
        });

      const bookId = postResponse.body.id; // Obtém o ID retornado pelo POST

      const response = await request(app)
        .put(`/apiBooksV1/livros/${bookId}`)
        .send({ titulo: 'Livro Novo', disponibilidade: true });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Livro atualizado com sucesso.',
        id: bookId,
      });

      // Verifica se o livro foi atualizado
      const updatedBook = (await request(app).get(`/apiBooksV1/livros/${bookId}`)).body;
      expect(updatedBook).toMatchObject({
        titulo: 'Livro Novo',
        autor: 'Autor Antigo',
        anoPublicacao: 2020,
        codigo: '202',
        disponibilidade: true,
        id: bookId,
      });
    });
  });

  // Testes para remover livro
  describe('DELETE /apiBooksV1/livros/:id', () => {
    it('deve retornar 404 para livro inexistente', async () => {
      const response = await request(app).delete('/apiBooksV1/livros/999');
      expect(response.status).toBe(404);
      expect(response.text).toBe('Livro não encontrado');
    });

    it('deve remover um livro com sucesso e retornar o ID', async () => {
      // Adiciona um livro para testar a remoção
      const postResponse = await request(app)
        .post('/apiBooksV1/livros')
        .send({
          titulo: 'Livro para Remover',
          autor: 'Autor',
          anoPublicacao: 2020,
          codigo: '303',
          disponibilidade: true,
        });

      const bookId = postResponse.body.id; // Obtém o ID retornado pelo POST

      const response = await request(app).delete(`/apiBooksV1/livros/${bookId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Livro removido com sucesso.',
        id: bookId,
      });

      // Verifica se o livro foi removido
      const booksResponse = await request(app).get('/apiBooksV1/livros');
      expect(booksResponse.body).toHaveLength(0);
    });
  });
});