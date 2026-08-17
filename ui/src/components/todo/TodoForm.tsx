import { useState, type FormEvent } from 'react'
import type { Category, CreateTodoInput, Priority } from '../../types/todo'
import styles from './TodoForm.module.css'

export interface TodoFormValues {
  title: string
  description: string
  category: Category | ''
  priority: Priority
  dueDate: string
}

const EMPTY_VALUES: TodoFormValues = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  dueDate: '',
}

interface TodoFormProps {
  initialValues?: TodoFormValues
  submitLabel: string
  onSubmit: (input: CreateTodoInput) => void
  onCancel: () => void
}

export function TodoForm({ initialValues = EMPTY_VALUES, submitLabel, onSubmit, onCancel }: TodoFormProps) {
  const [values, setValues] = useState<TodoFormValues>(initialValues)
  const [titleError, setTitleError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (values.title.trim() === '') {
      setTitleError('제목은 필수입니다.')
      return
    }

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim() === '' ? null : values.description.trim(),
      category: values.category === '' ? null : values.category,
      priority: values.priority,
      dueDate: values.dueDate === '' ? null : values.dueDate,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        Title
        <input
          autoFocus
          maxLength={200}
          value={values.title}
          onChange={(e) => {
            setValues({ ...values, title: e.target.value })
            if (titleError) setTitleError(null)
          }}
        />
        {titleError && <span className={styles.error}>{titleError}</span>}
      </label>

      <label className={styles.field}>
        Description
        <textarea
          rows={3}
          maxLength={1000}
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        />
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          Category
          <select
            value={values.category}
            onChange={(e) => setValues({ ...values, category: e.target.value as Category | '' })}
          >
            <option value="">None</option>
            <option value="WORK">Work</option>
            <option value="PERSONAL">Personal</option>
            <option value="STUDY">Study</option>
          </select>
        </label>

        <label className={styles.field}>
          Priority
          <select
            value={values.priority}
            onChange={(e) => setValues({ ...values, priority: e.target.value as Priority })}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </label>
      </div>

      <label className={styles.field}>
        Due Date
        <input
          type="date"
          value={values.dueDate}
          onChange={(e) => setValues({ ...values, dueDate: e.target.value })}
        />
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submit}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
