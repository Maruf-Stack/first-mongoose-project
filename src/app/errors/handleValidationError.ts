import mongoose from 'mongoose'
import {
  TGenericErrorResponse,
  TerrorSources,
} from '../interface/error.interface'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TerrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      }
    },
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleValidationError
