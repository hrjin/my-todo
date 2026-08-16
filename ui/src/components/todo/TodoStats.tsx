import type { Todo } from '../../types/todo'
import styles from './TodoStats.module.css'

export function TodoStats({ todos }: { todos: Todo[] }) {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length

  return (
    <div className={styles.stats}>
      <span>{total}개 항목</span>
      <span className={styles.dot}>·</span>
      <span>{completed}개 완료</span>
    </div>
  )
}
