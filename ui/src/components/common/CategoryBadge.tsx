import type { Category } from '../../types/todo'
import styles from './CategoryBadge.module.css'

const LABELS: Record<Category, string> = { WORK: 'Work', PERSONAL: 'Personal', STUDY: 'Study' }

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={styles.badge} data-category={category}>
      {LABELS[category]}
    </span>
  )
}
