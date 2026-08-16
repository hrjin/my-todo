import { Plus } from 'lucide-react'
import { useAppUI } from '../../context/useAppUI'
import styles from './AddTaskButton.module.css'

export function AddTaskButton() {
  const { openCreateDrawer } = useAppUI()

  return (
    <button type="button" className={styles.button} onClick={openCreateDrawer}>
      <Plus size={16} />
      Add Task
    </button>
  )
}
