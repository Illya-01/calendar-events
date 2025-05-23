import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventForm from '../components/events/EventForm'
import type { Event, EventFormData } from '../types'
import * as eventService from '../services/eventService'

const EditEventPage = () => {
  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true)
        if (!id) return
        const data = await eventService.getEventById(parseInt(id))
        setEvent(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleSubmit = async (data: EventFormData) => {
    try {
      setIsSubmitting(true)
      if (!id) return
      await eventService.updateEvent(parseInt(id), data)
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
          <h1 className="text-2xl font-bold mb-6">Edit Event</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">Loading event...</div>
          ) : event ? (
            <EventForm
              onSubmit={handleSubmit}
              initialData={event}
              isLoading={isSubmitting}
            />
          ) : (
            <div className="text-center py-8">Event not found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditEventPage
