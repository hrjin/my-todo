import { useState } from 'react'
import { ListFilter } from 'lucide-react'
import { useAppUI } from '../../context/useAppUI'
import type { Priority } from '../../types/todo'
import styles from './TodoFilterBar.module.css'

const PRIORITIES: Priority[] = ['HIGH', 'MEDIUM', 'LOW']

export function TodoFilterBar() {
  const { priorityFilter, togglePriorityFilter } = useAppUI()
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.trigger}
        data-active={priorityFilter.length > 0}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <ListFilter size={15} />
        Filter
        {priorityFilter.length > 0 && <span className={styles.badge}>{priorityFilter.length}</span>}
      </button>

      {open && (
        <div className={styles.popover} role="menu">
          {PRIORITIES.map((priority) => (
            <label key={priority} className={styles.option}>
              <input
                type="checkbox"
                checked={priorityFilter.includes(priority)}
                onChange={() => togglePriorityFilter(priority)}
              />
              {priority}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
