import { useMemo } from 'react'
import { useAppUI } from '../../context/useAppUI'
import { filterTodosByView } from '../../utils/filterTodos'
import { applyPriorityFilter, applySearch, sortTodos } from '../../utils/searchAndFilter'
import { TodoItem } from './TodoItem'
import type { Todo } from '../../types/todo'
import styles from './TodoList.module.css'

export function TodoList({ todos }: { todos: Todo[] }) {
  const { activeView, searchTerm, priorityFilter } = useAppUI()

  const visibleTodos = useMemo(() => {
    const byView = filterTodosByView(todos, activeView)
    const bySearch = applySearch(byView, searchTerm)
    const byPriority = applyPriorityFilter(bySearch, priorityFilter)
    return sortTodos(byPriority)
  }, [todos, activeView, searchTerm, priorityFilter])

  if (visibleTodos.length === 0) {
    return <p className={styles.empty}>표시할 Todo가 없습니다.</p>
  }

  return (
    <ul className={styles.list}>
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
