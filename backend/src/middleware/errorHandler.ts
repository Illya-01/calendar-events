import { Request, Response, NextFunction } from 'express'

// Define custom error class with status code
export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

// Prisma error handling
const handlePrismaErrors = (error: any) => {
  // P2002: Unique constraint violation
  if (error.code === 'P2002') {
    const field = error.meta?.target || 'field'
    return new AppError(`Duplicate value for ${field}`, 400)
  }

  // P2025: Record not found
  if (error.code === 'P2025') {
    return new AppError('Record not found', 404)
  }

  return error
}

// Main error handling middleware
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err)

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    err = handlePrismaErrors(err)
  }

  // Check if it's our custom error
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again.',
    })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Your token has expired. Please log in again.',
    })
  }

  // Default error response for unhandled errors
  return res.status(500).json({
    status: 'error',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Something went wrong'
        : err.message || 'Internal server error',
  })
}

// Async error catcher to avoid try/catch blocks
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
