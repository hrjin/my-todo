import { Briefcase, Calendar, CalendarDays, CheckCircle2, GraduationCap, Inbox, User } from 'lucide-react'
import { useAppUI } from '../../../context/useAppUI'
import { LIST_VIEWS, SIDEBAR_VIEWS, type FixedView, type SidebarView } from '../../../utils/filterTodos'
import type { Todo, Category } from '../../../types/todo'
import styles from './Sidebar.module.css'

const VIEW_ICONS: Record<FixedView, typeof Inbox> = {
  INBOX: Inbox,
  TODAY: Calendar,
  UPCOMING: CalendarDays,
  COMPLETED: CheckCircle2,
}

const LIST_ICONS: Record<Category, typeof Briefcase> = {
  WORK: Briefcase,
  PERSONAL: User,
  STUDY: GraduationCap,
}

function countForView(todos: Todo[], view: SidebarView): number {
  switch (view) {
    case 'INBOX':
      return todos.filter((t) => !t.completed).length
    case 'TODAY':
    case 'UPCOMING':
      return 0
    case 'COMPLETED':
      return todos.filter((t) => t.completed).length
    default:
      return todos.filter((t) => t.category === view).length
  }
}

export function Sidebar({ todos }: { todos: Todo[] }) {
  const { activeView, setActiveView } = useAppUI()

  return (
    <nav className={styles.sidebar} aria-label="Todo 뷰 목록">
      <div className={styles.brand}>My Todo</div>

      <ul className={styles.section}>
        {SIDEBAR_VIEWS.map(({ id, label }) => {
          const Icon = VIEW_ICONS[id]
          const count = countForView(todos, id)
          return (
            <li key={id}>
              <button
                type="button"
                className={styles.item}
                data-active={activeView === id}
                aria-current={activeView === id ? 'true' : undefined}
                onClick={() => setActiveView(id)}
              >
                <Icon size={16} />
                <span className={styles.label}>{label}</span>
                {(id === 'INBOX' || id === 'COMPLETED') && <span className={styles.count}>{count}</span>}
              </button>
            </li>
          )
        })}
      </ul>

      <div className={styles.sectionTitle}>Lists</div>
      <ul className={styles.section}>
        {LIST_VIEWS.map(({ id, label }) => {
          const Icon = LIST_ICONS[id]
          const count = countForView(todos, id)
          return (
            <li key={id}>
              <button
                type="button"
                className={styles.item}
                data-active={activeView === id}
                aria-current={activeView === id ? 'true' : undefined}
                onClick={() => setActiveView(id)}
              >
                <Icon size={16} />
                <span className={styles.label}>{label}</span>
                <span className={styles.count}>{count}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
