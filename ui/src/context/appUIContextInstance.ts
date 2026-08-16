import { createContext } from 'react'
import type { Priority, Todo } from '../types/todo'
import type { SidebarView } from '../utils/filterTodos'

export type DrawerState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; todo: Todo }

export interface AppUIContextValue {
  activeView: SidebarView
  setActiveView: (view: SidebarView) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  priorityFilter: Priority[]
  togglePriorityFilter: (priority: Priority) => void
  drawer: DrawerState
  openCreateDrawer: () => void
  openEditDrawer: (todo: Todo) => void
  closeDrawer: () => void
}

export const AppUIContext = createContext<AppUIContextValue | null>(null)
