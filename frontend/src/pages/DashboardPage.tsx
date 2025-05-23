import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EventList from '../components/events/EventList'
import EventFilter from '../components/events/EventFilter'
import type { Event, EventFilters } from '../types'
import * as eventService from '../services/eventService'

const DashboardPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<EventFilters>({})

  useEffect(() => {
    fetchEvents()
  }, [filters])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const data = await eventService.getEvents(filters)
      setEvents(data)
      setError(null)
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id)
        setEvents(events.filter(event => event.id !== id))
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      }
    }
  }

  const handleFilter = (newFilters: EventFilters) => {
    setFilters(newFilters)
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link to="/events/create" className="btn btn-primary">
            Create New Event
          </Link>
        </div>

        <EventFilter onFilter={handleFilter} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">Loading events...</div>
        ) : (
          <EventList events={events} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}

export default DashboardPage
