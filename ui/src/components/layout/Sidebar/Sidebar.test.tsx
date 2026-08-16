import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { AppUIProvider } from '../../../context/AppUIContext'
import { Sidebar } from './Sidebar'

function renderSidebar() {
  return render(
    <AppUIProvider>
      <Sidebar todos={[]} />
    </AppUIProvider>,
  )
}

describe('Sidebar', () => {
  it('marks Inbox as the active view by default', () => {
    renderSidebar()

    expect(screen.getByRole('button', { name: /inbox/i })).toHaveAttribute('aria-current', 'true')
  })

  it('switches the active view when a different menu item is clicked', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: /today/i }))

    expect(screen.getByRole('button', { name: /today/i })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('button', { name: /inbox/i })).not.toHaveAttribute('aria-current')
  })

  it('switches to a category list view', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('button', { name: /work/i }))

    expect(screen.getByRole('button', { name: /work/i })).toHaveAttribute('aria-current', 'true')
  })
})
