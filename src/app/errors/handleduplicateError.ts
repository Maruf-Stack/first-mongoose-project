import {
  TGenericErrorResponse,
  TerrorSources,
} from '../interface/error.interface'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/)

  const extractedMessage = match && match[1]

  const errorSources: TerrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already existsss`,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  }
}

export default handleDuplicateError
