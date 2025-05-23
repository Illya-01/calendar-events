import app from './app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  console.log('Database connection closed')
  process.exit(0)
})
