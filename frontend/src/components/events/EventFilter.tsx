import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import type { EventFilters, ImportanceLevel } from '../../types'

type EventFilterProps = {
  onFilter: (filters: EventFilters) => void
}

const EventFilter = ({ onFilter }: EventFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { register, control, handleSubmit, reset } = useForm<EventFilters>({
    defaultValues: {
      search: '',
      importance: undefined,
      startDate: undefined,
      endDate: undefined,
    },
  })

  const onSubmit = (data: EventFilters) => {
    onFilter(data)
    setIsOpen(false)
  }

  const handleReset = () => {
    reset()
    onFilter({})
    setIsOpen(false)
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Events</h2>
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label" htmlFor="search">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by title or description"
                className="form-input"
                {...register('search')}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="importance">
                Importance
              </label>
              <select
                id="importance"
                className="form-input"
                {...register('importance')}>
                <option value="">All</option>
                <option value="normal">Normal</option>
                <option value="important">Important</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Start Date</label>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    placeholderText="Select start date"
                    className="form-input w-full"
                    isClearable
                  />
                )}
              />
            </div>

            <div>
              <label className="form-label">End Date</label>
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    placeholderText="Select end date"
                    className="form-input w-full"
                    isClearable
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-secondary">
              Clear Filters
            </button>
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default EventFilter
