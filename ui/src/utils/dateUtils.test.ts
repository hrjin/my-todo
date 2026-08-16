import { describe, expect, it, vi } from 'vitest'
import { formatDueDate, isFuture, isToday, todayDateString } from './dateUtils'

describe('dateUtils', () => {
  it('todayDateString returns YYYY-MM-DD for the current date', () => {
    vi.setSystemTime(new Date(2026, 7, 16)) // 2026-08-16 (month is 0-indexed)

    expect(todayDateString()).toBe('2026-08-16')

    vi.useRealTimers()
  })

  it('isToday is true only when dueDate matches today', () => {
    vi.setSystemTime(new Date(2026, 7, 16))

    expect(isToday('2026-08-16')).toBe(true)
    expect(isToday('2026-08-17')).toBe(false)
    expect(isToday(null)).toBe(false)

    vi.useRealTimers()
  })

  it('isFuture is true only when dueDate is strictly after today', () => {
    vi.setSystemTime(new Date(2026, 7, 16))

    expect(isFuture('2026-08-17')).toBe(true)
    expect(isFuture('2026-08-16')).toBe(false)
    expect(isFuture('2026-08-15')).toBe(false)
    expect(isFuture(null)).toBe(false)

    vi.useRealTimers()
  })

  it('formatDueDate renders dot-separated date, empty string for null', () => {
    expect(formatDueDate('2026-08-16')).toBe('2026.08.16')
    expect(formatDueDate(null)).toBe('')
  })
})
