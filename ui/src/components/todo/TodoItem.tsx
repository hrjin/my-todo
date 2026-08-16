import { CalendarClock, Pencil, Trash2 } from 'lucide-react'
import { CategoryBadge } from '../common/CategoryBadge'
import { PriorityBadge } from '../common/PriorityBadge'
import { IconButton } from '../common/IconButton'
import { useAppUI } from '../../context/useAppUI'
import { useDeleteTodoMutation, useToggleTodoMutation } from '../../hooks/useTodoMutations'
import { formatDueDate } from '../../utils/dateUtils'
import type { Todo } from '../../types/todo'
import styles from './TodoItem.module.css'

export function TodoItem({ todo }: { todo: Todo }) {
  const { openEditDrawer } = useAppUI()
  const toggleMutation = useToggleTodoMutation()
  const deleteMutation = useDeleteTodoMutation()

  return (
    <li className={styles.item} data-completed={todo.completed}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed}
        onChange={() => toggleMutation.mutate(todo.id)}
        aria-label={`${todo.title} 완료 토글`}
      />

      <span className={styles.title}>{todo.title}</span>

      {todo.category && <CategoryBadge category={todo.category} />}
      {todo.dueDate && (
        <span className={styles.dueDate}>
          <CalendarClock size={12} />
          {formatDueDate(todo.dueDate)}
        </span>
      )}
      <PriorityBadge priority={todo.priority} />

      <span className={styles.actions}>
        <IconButton aria-label="수정" onClick={() => openEditDrawer(todo)}>
          <Pencil size={14} />
        </IconButton>
        <IconButton aria-label="삭제" onClick={() => deleteMutation.mutate(todo.id)}>
          <Trash2 size={14} />
        </IconButton>
      </span>
    </li>
  )
}
