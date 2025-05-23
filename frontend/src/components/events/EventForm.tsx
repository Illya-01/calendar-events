import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import type { Event, EventFormData, ImportanceLevel } from '../../types'

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  startTime: z.date(),
  endTime: z.date().optional(),
  importance: z.enum(['normal', 'important', 'critical']),
})

type EventFormProps = {
  onSubmit: (data: EventFormData) => void
  initialData?: Event
  isLoading?: boolean
}

const EventForm = ({ onSubmit, initialData, isLoading }: EventFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description || '',
          startTime: new Date(initialData.startTime),
          endTime: initialData.endTime ? new Date(initialData.endTime) : undefined,
          importance: initialData.importance as ImportanceLevel,
        }
      : {
          importance: 'normal',
          startTime: new Date(),
        },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input id="title" className="form-input" {...register('title')} />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="form-input min-h-[100px]"
          {...register('description')}></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Start Time</label>
          <Controller
            control={control}
            name="startTime"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-input w-full"
              />
            )}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">End Time (Optional)</label>
          <Controller
            control={control}
            name="endTime"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-input w-full"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="importance">
          Importance
        </label>
        <select id="importance" className="form-input" {...register('importance')}>
          <option value="normal">Normal</option>
          <option value="important">Important</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
        {isLoading ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  )
}

export default EventForm
