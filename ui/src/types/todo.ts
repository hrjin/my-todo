export type Category = 'WORK' | 'PERSONAL' | 'STUDY'

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Todo {
  id: number
  title: string
  description: string | null
  completed: boolean
  category: Category | null
  priority: Priority
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateTodoInput {
  title: string
  description?: string | null
  category?: Category | null
  priority?: Priority | null
  dueDate?: string | null
}

export type UpdateTodoInput = CreateTodoInput
