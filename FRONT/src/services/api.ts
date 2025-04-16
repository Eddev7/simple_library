import axios, { AxiosResponse } from 'axios';
import { Book } from '../types/book';

// Configuração da instância do Axios
const api = axios.create({
  baseURL: 'http://15.228.11.48:3100/apiBooksV1', // URL base da API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções para interagir com a API
export const getBooks = async (availableOnly?: boolean): Promise<Book[]> => {
  const response: AxiosResponse<Book[]> = await api.get('/livros', {
    params: { disponibilidade: availableOnly ? 'true' : undefined },
  });
  return response.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const response: AxiosResponse<Book> = await api.get(`/livros/${id}`);
  return response.data;
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<{ message: string; id: string }> => {
  const response: AxiosResponse<{ message: string; id: string }> = await api.post('/livros', book);
  return response.data;
};

export const updateBook = async (id: string, book: Partial<Book>): Promise<{ message: string; id: string }> => {
  const response: AxiosResponse<{ message: string; id: string }> = await api.put(`/livros/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: string): Promise<{ message: string; id: string }> => {
  const response: AxiosResponse<{ message: string; id: string }> = await api.delete(`/livros/${id}`);
  return response.data;
};