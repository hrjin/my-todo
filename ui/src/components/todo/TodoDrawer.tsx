import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useAppUI } from '../../context/useAppUI'
import { useCreateTodoMutation, useUpdateTodoMutation } from '../../hooks/useTodoMutations'
import { TodoForm, type TodoFormValues } from './TodoForm'
import type { CreateTodoInput, Todo } from '../../types/todo'
import styles from './TodoDrawer.module.css'

function toFormValues(todo: Todo): TodoFormValues {
  return {
    title: todo.title,
    description: todo.description ?? '',
    category: todo.category ?? '',
    priority: todo.priority,
    dueDate: todo.dueDate ?? '',
  }
}

export function TodoDrawer() {
  const { drawer, closeDrawer } = useAppUI()
  const createMutation = useCreateTodoMutation()
  const updateMutation = useUpdateTodoMutation()

  const isOpen = drawer.mode !== 'closed'

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDrawer()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeDrawer])

  if (!isOpen) return null

  function handleSubmit(input: CreateTodoInput) {
    if (drawer.mode === 'edit') {
      updateMutation.mutate({ id: drawer.todo.id, input }, { onSuccess: closeDrawer })
    } else {
      createMutation.mutate(input, { onSuccess: closeDrawer })
    }
  }

  return (
    <div className={styles.overlay} onClick={closeDrawer}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label={drawer.mode === 'edit' ? 'Todo 수정' : 'Todo 추가'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{drawer.mode === 'edit' ? 'Edit Task' : 'New Task'}</h2>
          <button type="button" className={styles.close} onClick={closeDrawer} aria-label="닫기">
            <X size={16} />
          </button>
        </div>

        <TodoForm
          initialValues={drawer.mode === 'edit' ? toFormValues(drawer.todo) : undefined}
          submitLabel={drawer.mode === 'edit' ? 'Save' : 'Create'}
          onSubmit={handleSubmit}
          onCancel={closeDrawer}
        />
      </aside>
    </div>
  )
}
