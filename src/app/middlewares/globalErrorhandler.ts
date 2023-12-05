import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { TerrorSources } from '../interface/error.interface'
import config from '../config'
import handleZodError from '../errors/handleZodError'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleduplicateError'
import { AppError } from '../errors/appError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong!'

  let errorSources: TerrorSources = [
    {
      path: '',
      message: 'something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
