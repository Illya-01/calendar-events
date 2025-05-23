import { User as PrismaUser, Event as PrismaEvent } from '@prisma/client'

// Request body types
export interface RegisterRequestBody {
  email: string
  password: string
  name?: string
}

export interface LoginRequestBody {
  email: string
  password: string
}

export interface EventRequestBody {
  title: string
  description?: string
  startTime: string | Date
  endTime?: string | Date
  importance?: 'normal' | 'important' | 'critical'
}

// Response types
export interface AuthResponse {
  user: {
    id: number
    email: string
    name: string | null
  }
  token: string
}

export type User = Omit<PrismaUser, 'password'>
export type Event = PrismaEvent

// Error response
export interface ErrorResponse {
  message: string
}
