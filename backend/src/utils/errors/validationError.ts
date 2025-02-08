/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes'

class ValidationError extends Error {
  statusCode: number
  explaination: string[]

  constructor(errorDetails: any, message: string) {
    super(message)
    this.name = 'ValidationError'
    const explaination: string[] = []
    Object.keys(errorDetails.errors).forEach((key) => {
      explaination.push(errorDetails.errors[key])
    })
    this.explaination = explaination
    this.message = message
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default ValidationError
