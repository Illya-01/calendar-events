export interface User {
  id: number
  email: string
  name: string | null
}

export interface AuthResponse {
  user: User
  token: string
}

export type ImportanceLevel = 'normal' | 'important' | 'critical'

export interface Event {
  id: number
  title: string
  description: string | null
  startTime: string
  endTime: string | null
  importance: ImportanceLevel
  userId: number
  createdAt: string
  updatedAt: string
}

export interface EventFormData {
  title: string
  description?: string
  startTime: Date
  endTime?: Date
  importance: ImportanceLevel
}

export interface EventFilters {
  importance?: ImportanceLevel
  search?: string
  startDate?: Date
  endDate?: Date
}

export interface ApiError {
  message: string
}
