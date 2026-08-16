import type { Category, Todo } from '../types/todo'
import { isFuture, isToday } from './dateUtils'

export type FixedView = 'INBOX' | 'TODAY' | 'UPCOMING' | 'COMPLETED'

export type SidebarView = FixedView | Category

export const SIDEBAR_VIEWS: { id: FixedView; label: string }[] = [
  { id: 'INBOX', label: 'Inbox' },
  { id: 'TODAY', label: 'Today' },
  { id: 'UPCOMING', label: 'Upcoming' },
  { id: 'COMPLETED', label: 'Completed' },
]

export const LIST_VIEWS: { id: Category; label: string }[] = [
  { id: 'WORK', label: 'Work' },
  { id: 'PERSONAL', label: 'Personal' },
  { id: 'STUDY', label: 'Study' },
]

export function filterTodosByView(todos: Todo[], view: SidebarView): Todo[] {
  switch (view) {
    case 'INBOX':
      return todos.filter((todo) => !todo.completed)
    case 'TODAY':
      return todos.filter((todo) => !todo.completed && isToday(todo.dueDate))
    case 'UPCOMING':
      return todos.filter((todo) => !todo.completed && isFuture(todo.dueDate))
    case 'COMPLETED':
      return todos.filter((todo) => todo.completed)
    default:
      return todos.filter((todo) => todo.category === view)
  }
}
