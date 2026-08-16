import { MainLayout } from './components/layout/MainLayout'
import { Sidebar } from './components/layout/Sidebar/Sidebar'
import { useTodosQuery } from './hooks/useTodosQuery'
import styles from './App.module.css'

function App() {
  const { data: todos = [], isLoading, isError } = useTodosQuery()

  return (
    <div className={styles.app}>
      <Sidebar todos={todos} />
      <MainLayout todos={todos} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default App
