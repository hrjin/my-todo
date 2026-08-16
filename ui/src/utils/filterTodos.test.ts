import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { filterTodosByView } from './filterTodos'
import type { Todo } from '../types/todo'

function makeTodo(overrides: Partial<Todo>): Todo {
  return {
    id: 1,
    title: 'title',
    description: null,
    completed: false,
    category: null,
    priority: 'MEDIUM',
    dueDate: null,
    createdAt: '2026-08-16T00:00:00',
    updatedAt: '2026-08-16T00:00:00',
    ...overrides,
  }
}

describe('filterTodosByView', () => {
  const todos: Todo[] = [
    makeTodo({ id: 1, completed: false, dueDate: null, category: null }),
    makeTodo({ id: 2, completed: false, dueDate: '2026-08-16', category: null }),
    makeTodo({ id: 3, completed: false, dueDate: '2026-08-20', category: null }),
    makeTodo({ id: 4, completed: true, dueDate: '2026-08-16', category: 'WORK' }),
    makeTodo({ id: 5, completed: false, dueDate: null, category: 'WORK' }),
  ]

  beforeAll(() => vi.setSystemTime(new Date(2026, 7, 16)))
  afterAll(() => vi.useRealTimers())

  it('INBOX returns all incomplete todos', () => {
    const result = filterTodosByView(todos, 'INBOX')
    expect(result.map((t) => t.id)).toEqual([1, 2, 3, 5])
  })

  it('TODAY returns incomplete todos due today', () => {
    const result = filterTodosByView(todos, 'TODAY')
    expect(result.map((t) => t.id)).toEqual([2])
  })

  it('UPCOMING returns incomplete todos due after today', () => {
    const result = filterTodosByView(todos, 'UPCOMING')
    expect(result.map((t) => t.id)).toEqual([3])
  })

  it('COMPLETED returns all completed todos regardless of category', () => {
    const result = filterTodosByView(todos, 'COMPLETED')
    expect(result.map((t) => t.id)).toEqual([4])
  })

  it('category views return matching todos including completed ones', () => {
    const result = filterTodosByView(todos, 'WORK')
    expect(result.map((t) => t.id)).toEqual([4, 5])
  })
})
