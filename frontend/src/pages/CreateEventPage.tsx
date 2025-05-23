// src/pages/CreateEventPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventForm from '../components/events/EventForm'
import type { EventFormData } from '../types'
import * as eventService from '../services/eventService'

const CreateEventPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true)
      await eventService.createEvent(data)
      navigate('/dashboard')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <EventForm onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>
      </div>
    </div>
  )
}

export default CreateEventPage
