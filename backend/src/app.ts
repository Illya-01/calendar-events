import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth'
import eventRoutes from './routes/event'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)

app.use(errorHandler)

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`,
  })
})

export default app
