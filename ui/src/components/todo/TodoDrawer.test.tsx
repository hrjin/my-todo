import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'
import { AppUIProvider } from '../../context/AppUIContext'
import { useAppUI } from '../../context/useAppUI'
import { TodoDrawer } from './TodoDrawer'
import type { Todo } from '../../types/todo'

const sampleTodo: Todo = {
  id: 1,
  title: '장보기',
  description: null,
  completed: false,
  category: null,
  priority: 'MEDIUM',
  dueDate: null,
  createdAt: '2026-08-16T00:00:00',
  updatedAt: '2026-08-16T00:00:00',
}

function Harness({ mode }: { mode: 'create' | 'edit' }) {
  const { openCreateDrawer, openEditDrawer } = useAppUI()
  return (
    <>
      <button onClick={() => (mode === 'create' ? openCreateDrawer() : openEditDrawer(sampleTodo))}>
        open
      </button>
      <TodoDrawer />
    </>
  )
}

function renderHarness(mode: 'create' | 'edit') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <AppUIProvider>
        <Harness mode={mode} />
      </AppUIProvider>
    </QueryClientProvider>,
  )
}

describe('TodoDrawer', () => {
  it('renders nothing when closed', () => {
    renderHarness('create')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens as a create form', async () => {
    const user = userEvent.setup()
    renderHarness('create')

    await user.click(screen.getByRole('button', { name: 'open' }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('New Task')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveValue('')
  })

  it('opens pre-filled as an edit form', async () => {
    const user = userEvent.setup()
    renderHarness('edit')

    await user.click(screen.getByRole('button', { name: 'open' }))

    expect(screen.getByText('Edit Task')).toBeInTheDocument()
    expect(screen.getByLabelText('Title')).toHaveValue('장보기')
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    renderHarness('create')

    await user.click(screen.getByRole('button', { name: 'open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
