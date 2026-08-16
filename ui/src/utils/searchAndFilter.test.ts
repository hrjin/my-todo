import { describe, expect, it } from 'vitest'
import { applyPriorityFilter, applySearch, sortTodos } from './searchAndFilter'
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

describe('applySearch', () => {
  const todos = [
    makeTodo({ id: 1, title: '장보기', description: '우유 사기' }),
    makeTodo({ id: 2, title: 'Wireframing new product', description: null }),
  ]

  it('matches by title substring, case-insensitive', () => {
    expect(applySearch(todos, 'wire').map((t) => t.id)).toEqual([2])
  })

  it('matches by description substring', () => {
    expect(applySearch(todos, '우유').map((t) => t.id)).toEqual([1])
  })

  it('returns all todos when term is blank', () => {
    expect(applySearch(todos, '  ')).toEqual(todos)
  })

  it('returns empty array when nothing matches', () => {
    expect(applySearch(todos, 'zzz')).toEqual([])
  })
})

describe('applyPriorityFilter', () => {
  const todos = [
    makeTodo({ id: 1, priority: 'HIGH' }),
    makeTodo({ id: 2, priority: 'MEDIUM' }),
    makeTodo({ id: 3, priority: 'LOW' }),
  ]

  it('returns all todos when no priorities selected', () => {
    expect(applyPriorityFilter(todos, [])).toEqual(todos)
  })

  it('filters to selected priorities only', () => {
    expect(applyPriorityFilter(todos, ['HIGH', 'LOW']).map((t) => t.id)).toEqual([1, 3])
  })
})

describe('sortTodos', () => {
  it('sorts by dueDate ascending, nulls last', () => {
    const todos = [
      makeTodo({ id: 1, dueDate: null }),
      makeTodo({ id: 2, dueDate: '2026-08-20' }),
      makeTodo({ id: 3, dueDate: '2026-08-16' }),
    ]

    expect(sortTodos(todos).map((t) => t.id)).toEqual([3, 2, 1])
  })

  it('breaks dueDate ties by priority descending', () => {
    const todos = [
      makeTodo({ id: 1, dueDate: '2026-08-16', priority: 'LOW' }),
      makeTodo({ id: 2, dueDate: '2026-08-16', priority: 'HIGH' }),
      makeTodo({ id: 3, dueDate: '2026-08-16', priority: 'MEDIUM' }),
    ]

    expect(sortTodos(todos).map((t) => t.id)).toEqual([2, 3, 1])
  })

  it('breaks remaining ties by createdAt descending', () => {
    const todos = [
      makeTodo({ id: 1, dueDate: null, priority: 'MEDIUM', createdAt: '2026-08-14T00:00:00' }),
      makeTodo({ id: 2, dueDate: null, priority: 'MEDIUM', createdAt: '2026-08-16T00:00:00' }),
    ]

    expect(sortTodos(todos).map((t) => t.id)).toEqual([2, 1])
  })
})
