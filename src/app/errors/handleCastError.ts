import mongoose from 'mongoose'
import {
  TGenericErrorResponse,
  TerrorSources,
} from '../interface/error.interface'

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TerrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid user id',
    errorSources,
  }
}
export default handleCastError
