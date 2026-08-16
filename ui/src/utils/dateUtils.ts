function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function todayDateString(): string {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function isToday(dueDate: string | null): boolean {
  return dueDate !== null && dueDate === todayDateString()
}

export function isFuture(dueDate: string | null): boolean {
  return dueDate !== null && dueDate > todayDateString()
}

export function formatDueDate(dueDate: string | null): string {
  if (dueDate === null) return ''
  const [year, month, day] = dueDate.split('-')
  return `${year}.${month}.${day}`
}
