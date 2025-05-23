import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, startTime, endTime, importance } = req.body

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : undefined,
        importance: importance || 'normal',
        userId: req.user.id,
      },
    })

    res.status(201).json(event)
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getEvents = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    // Parse query parameters
    const { importance, search, startDate, endDate } = req.query

    // Build the where clause
    const where: any = {
      userId: req.user.id,
    }

    // Filter by importance if provided
    if (importance) {
      where.importance = importance.toString()
    }

    // Search by title or description if search query is provided
    if (search) {
      where.OR = [
        { title: { contains: search.toString(), mode: 'insensitive' } },
        { description: { contains: search.toString(), mode: 'insensitive' } },
      ]
    }

    // Filter by date range if provided
    if (startDate || endDate) {
      where.startTime = {}

      if (startDate) {
        where.startTime.gte = new Date(startDate.toString())
      }

      if (endDate) {
        where.startTime.lte = new Date(endDate.toString())
      }
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startTime: 'asc' },
    })

    res.json(events)
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const event = await prisma.event.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    })

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json(event)
  } catch (error) {
    console.error('Get event by ID error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, startTime, endTime, importance } = req.body

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    // Check if the event exists and belongs to the user
    const existingEvent = await prisma.event.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    })

    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }

    // Update the event
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        startTime: startTime ? new Date(startTime) : undefined,
        endTime: endTime ? new Date(endTime) : undefined,
        importance,
      },
    })

    res.json(updatedEvent)
  } catch (error) {
    console.error('Update event error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    // Check if the event exists and belongs to the user
    const existingEvent = await prisma.event.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    })

    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found' })
    }

    // Delete the event
    await prisma.event.delete({
      where: { id: parseInt(id) },
    })

    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
