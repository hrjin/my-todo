import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'
import { AppUIProvider } from '../../context/AppUIContext'
import { TodoItem } from './TodoItem'
import type { Todo } from '../../types/todo'
import * as todoApi from '../../api/todoApi'

vi.mock('../../api/todoApi')

const baseTodo: Todo = {
  id: 1,
  title: '장보기',
  description: '우유 사기',
  completed: false,
  category: 'PERSONAL',
  priority: 'HIGH',
  dueDate: '2026-08-20',
  createdAt: '2026-08-16T00:00:00',
  updatedAt: '2026-08-16T00:00:00',
}

function renderTodoItem(todo: Todo) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <AppUIProvider>
        <ul>
          <TodoItem todo={todo} />
        </ul>
      </AppUIProvider>
    </QueryClientProvider>,
  )
}

describe('TodoItem', () => {
  it('renders title, category, priority and due date', () => {
    renderTodoItem(baseTodo)

    expect(screen.getByText('장보기')).toBeInTheDocument()
    expect(screen.getByText('Personal')).toBeInTheDocument()
    expect(screen.getByText('High')).toBeInTheDocument()
    expect(screen.getByText('2026.08.20')).toBeInTheDocument()
  })

  it('applies completed styling when todo is completed', () => {
    renderTodoItem({ ...baseTodo, completed: true })

    const item = screen.getByText('장보기').closest('li')
    expect(item).toHaveAttribute('data-completed', 'true')
  })

  it('calls toggleTodo when the checkbox is clicked', async () => {
    const user = userEvent.setup()
    vi.mocked(todoApi.toggleTodo).mockResolvedValue({ ...baseTodo, completed: true })
    renderTodoItem(baseTodo)

    await user.click(screen.getByRole('checkbox'))

    expect(vi.mocked(todoApi.toggleTodo).mock.calls[0][0]).toBe(1)
  })

  it('calls deleteTodo when the delete button is clicked', async () => {
    const user = userEvent.setup()
    vi.mocked(todoApi.deleteTodo).mockResolvedValue(undefined)
    renderTodoItem(baseTodo)

    await user.click(screen.getByRole('button', { name: '삭제' }))

    expect(vi.mocked(todoApi.deleteTodo).mock.calls[0][0]).toBe(1)
  })
})
