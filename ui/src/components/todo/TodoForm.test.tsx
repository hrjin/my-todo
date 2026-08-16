import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TodoForm } from './TodoForm'

describe('TodoForm', () => {
  it('shows a validation error and does not submit when title is blank', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<TodoForm submitLabel="Create" onSubmit={onSubmit} onCancel={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(screen.getByText('제목은 필수입니다.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits a payload with all fields when filled in', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<TodoForm submitLabel="Create" onSubmit={onSubmit} onCancel={vi.fn()} />)

    await user.type(screen.getByLabelText('Title'), '장보기')
    await user.type(screen.getByLabelText('Description'), '우유 사기')
    await user.selectOptions(screen.getByLabelText('Category'), 'PERSONAL')
    await user.selectOptions(screen.getByLabelText('Priority'), 'HIGH')
    await user.type(screen.getByLabelText('Due Date'), '2026-08-20')
    await user.click(screen.getByRole('button', { name: 'Create' }))

    expect(onSubmit).toHaveBeenCalledWith({
      title: '장보기',
      description: '우유 사기',
      category: 'PERSONAL',
      priority: 'HIGH',
      dueDate: '2026-08-20',
    })
  })

  it('calls onCancel when Cancel is clicked', async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    render(<TodoForm submitLabel="Create" onSubmit={vi.fn()} onCancel={onCancel} />)

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(onCancel).toHaveBeenCalled()
  })
})
