import type { Priority, Todo } from '../types/todo'

const PRIORITY_RANK: Record<Priority, number> = { HIGH: 2, MEDIUM: 1, LOW: 0 }

export function applySearch(todos: Todo[], term: string): Todo[] {
  const normalized = term.trim().toLowerCase()
  if (normalized === '') return todos

  return todos.filter((todo) => {
    const title = todo.title.toLowerCase()
    const description = todo.description?.toLowerCase() ?? ''
    return title.includes(normalized) || description.includes(normalized)
  })
}

export function applyPriorityFilter(todos: Todo[], priorities: Priority[]): Todo[] {
  if (priorities.length === 0) return todos
  return todos.filter((todo) => priorities.includes(todo.priority))
}

export function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.dueDate !== b.dueDate) {
      if (a.dueDate === null) return 1
      if (b.dueDate === null) return -1
      return a.dueDate < b.dueDate ? -1 : 1
    }

    if (a.priority !== b.priority) {
      return PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority]
    }

    return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
  })
}
