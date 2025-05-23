import { format } from 'date-fns'
import type { Event, ImportanceLevel } from '../../types'
import { Link } from 'react-router-dom'

type EventListProps = {
  events: Event[]
  onDelete: (id: number) => void
}

const EventList = ({ events, onDelete }: EventListProps) => {
  const getImportanceClass = (importance: ImportanceLevel) => {
    switch (importance) {
      case 'normal':
        return 'bg-gray-100'
      case 'important':
        return 'bg-yellow-100'
      case 'critical':
        return 'bg-red-100'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No events found</p>
      ) : (
        events.map(event => (
          <div
            key={event.id}
            className={`p-4 rounded-lg shadow border ${getImportanceClass(
              event.importance as ImportanceLevel
            )}`}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <div className="flex space-x-2">
                <Link
                  to={`/events/${event.id}/edit`}
                  className="text-blue-600 hover:text-blue-800">
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(event.id)}
                  className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>

            {event.description && (
              <p className="text-gray-700 mt-1">{event.description}</p>
            )}

            <div className="mt-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold">Start:</span>{' '}
                {format(new Date(event.startTime), 'MMM d, yyyy h:mm a')}
              </p>
              {event.endTime && (
                <p>
                  <span className="font-semibold">End:</span>{' '}
                  {format(new Date(event.endTime), 'MMM d, yyyy h:mm a')}
                </p>
              )}
              <p className="mt-1">
                <span className="font-semibold">Importance:</span>{' '}
                <span className="capitalize">{event.importance}</span>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default EventList
