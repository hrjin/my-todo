import { useMemo, useState, type ReactNode } from 'react'
import type { Priority, Todo } from '../types/todo'
import { AppUIContext, type AppUIContextValue, type DrawerState } from './appUIContextInstance'
import type { SidebarView } from '../utils/filterTodos'

export function AppUIProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<SidebarView>('INBOX')
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState<Priority[]>([])
  const [drawer, setDrawer] = useState<DrawerState>({ mode: 'closed' })

  const togglePriorityFilter = (priority: Priority) => {
    setPriorityFilter((current) =>
      current.includes(priority) ? current.filter((p) => p !== priority) : [...current, priority],
    )
  }

  const value = useMemo<AppUIContextValue>(
    () => ({
      activeView,
      setActiveView,
      searchTerm,
      setSearchTerm,
      priorityFilter,
      togglePriorityFilter,
      drawer,
      openCreateDrawer: () => setDrawer({ mode: 'create' }),
      openEditDrawer: (todo: Todo) => setDrawer({ mode: 'edit', todo }),
      closeDrawer: () => setDrawer({ mode: 'closed' }),
    }),
    [activeView, searchTerm, priorityFilter, drawer],
  )

  return <AppUIContext.Provider value={value}>{children}</AppUIContext.Provider>
}
