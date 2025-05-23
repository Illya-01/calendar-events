import api from './api'
import { type AuthResponse } from '../types'

interface RegisterData {
  email: string
  password: string
  name?: string
}

interface LoginData {
  email: string
  password: string
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data)
  return response.data
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data)
  return response.data
}

export const getProfile = async (): Promise<
  Omit<AuthResponse['user'], 'password'>
> => {
  const response = await api.get('/auth/profile')
  return response.data
}

export const logout = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
