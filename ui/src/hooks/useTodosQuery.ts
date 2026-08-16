import { useQuery } from '@tanstack/react-query'
import { fetchTodos } from '../api/todoApi'
import { TODOS_QUERY_KEY } from '../queryClient'

export function useTodosQuery() {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: fetchTodos,
  })
}
