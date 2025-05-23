import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        email: string
      }
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

    jwt.verify(token, JWT_SECRET, async (err: any, payload: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' })
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      req.user = {
        id: user.id,
        email: user.email,
      }

      next()
    })
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
