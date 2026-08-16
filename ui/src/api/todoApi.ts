import apiClient from './client'
import type { CreateTodoInput, Todo, UpdateTodoInput } from '../types/todo'

export async function fetchTodos(): Promise<Todo[]> {
  const response = await apiClient.get<Todo[]>('/todos')
  return response.data
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const response = await apiClient.post<Todo>('/todos', input)
  return response.data
}

export async function updateTodo(id: number, input: UpdateTodoInput): Promise<Todo> {
  const response = await apiClient.put<Todo>(`/todos/${id}`, input)
  return response.data
}

export async function deleteTodo(id: number): Promise<void> {
  await apiClient.delete(`/todos/${id}`)
}

export async function toggleTodo(id: number): Promise<Todo> {
  const response = await apiClient.patch<Todo>(`/todos/${id}/toggle`)
  return response.data
}
