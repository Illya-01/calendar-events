import api from './api'
import type { Event, EventFormData, EventFilters } from '../types'

export const createEvent = async (data: EventFormData): Promise<Event> => {
  const response = await api.post<Event>('/events', data)
  return response.data
}

export const getEvents = async (filters?: EventFilters): Promise<Event[]> => {
  const params = new URLSearchParams()

  if (filters?.importance) {
    params.append('importance', filters.importance)
  }

  if (filters?.search) {
    params.append('search', filters.search)
  }

  if (filters?.startDate) {
    params.append('startDate', filters.startDate.toISOString())
  }

  if (filters?.endDate) {
    params.append('endDate', filters.endDate.toISOString())
  }

  const query = params.toString() ? `?${params.toString()}` : ''
  const response = await api.get<Event[]>(`/events${query}`)
  return response.data
}

export const getEventById = async (id: number): Promise<Event> => {
  const response = await api.get<Event>(`/events/${id}`)
  return response.data
}

export const updateEvent = async (
  id: number,
  data: Partial<EventFormData>
): Promise<Event> => {
  const response = await api.put<Event>(`/events/${id}`, data)
  return response.data
}

export const deleteEvent = async (id: number): Promise<void> => {
  await api.delete(`/events/${id}`)
}
