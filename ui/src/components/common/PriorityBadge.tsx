import { Flag } from 'lucide-react'
import type { Priority } from '../../types/todo'
import styles from './PriorityBadge.module.css'

const LABELS: Record<Priority, string> = { HIGH: 'High', MEDIUM: 'Medium', LOW: 'Low' }

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={styles.badge} data-priority={priority}>
      <Flag size={12} />
      {LABELS[priority]}
    </span>
  )
}
