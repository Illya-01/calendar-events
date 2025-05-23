import { Router } from 'express'
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/event'
import { authenticateToken } from '../middleware/auth'

const router = Router()

// Apply authentication to all event routes
router.use(authenticateToken)

router.post('/', createEvent)
router.get('/', getEvents)
router.get('/:id', getEventById)
router.put('/:id', updateEvent)
router.delete('/:id', deleteEvent)

export default router
