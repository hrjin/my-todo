import { useAppUI } from '../../context/useAppUI'
import { LIST_VIEWS, SIDEBAR_VIEWS } from '../../utils/filterTodos'
import { AddTaskButton } from '../todo/AddTaskButton'
import { TodoDrawer } from '../todo/TodoDrawer'
import { TodoFilterBar } from '../todo/TodoFilterBar'
import { TodoList } from '../todo/TodoList'
import { TodoSearchBar } from '../todo/TodoSearchBar'
import { TodoStats } from '../todo/TodoStats'
import type { Todo } from '../../types/todo'
import styles from './MainLayout.module.css'

const VIEW_LABELS = Object.fromEntries(
  [...SIDEBAR_VIEWS, ...LIST_VIEWS].map(({ id, label }) => [id, label]),
)

export function MainLayout({ todos, isLoading, isError }: { todos: Todo[]; isLoading: boolean; isError: boolean }) {
  const { activeView } = useAppUI()

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.pageTitle}>{VIEW_LABELS[activeView]}</h1>
            <TodoStats todos={todos} />
          </div>
          <AddTaskButton />
        </div>

        <div className={styles.toolbar}>
          <TodoSearchBar />
          <TodoFilterBar />
        </div>
      </header>

      {isLoading && <p className={styles.status}>불러오는 중...</p>}
      {isError && <p className={styles.status}>Todo를 불러오지 못했습니다. 백엔드 서버 상태를 확인해주세요.</p>}
      {!isLoading && !isError && <TodoList todos={todos} />}

      <TodoDrawer />
    </main>
  )
}
