import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo, deleteTodo, toggleTodo, updateTodo } from '../api/todoApi'
import { TODOS_QUERY_KEY } from '../queryClient'
import type { UpdateTodoInput } from '../types/todo'

export function useCreateTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY }),
  })
}

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateTodoInput }) => updateTodo(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY }),
  })
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY }),
  })
}

export function useToggleTodoMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY }),
  })
}
