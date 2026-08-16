import { Search } from 'lucide-react'
import { useAppUI } from '../../context/useAppUI'
import styles from './TodoSearchBar.module.css'

export function TodoSearchBar() {
  const { searchTerm, setSearchTerm } = useAppUI()

  return (
    <label className={styles.wrapper}>
      <Search size={15} className={styles.icon} />
      <input
        type="search"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
        aria-label="Todo 검색"
      />
    </label>
  )
}
