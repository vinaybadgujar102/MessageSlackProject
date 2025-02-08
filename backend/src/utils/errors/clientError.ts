import { StatusCodes } from 'http-status-codes'

class ClientError extends Error {
  statusCode: number
  explaination: any

  constructor(error: any) {
    super()
    this.name = 'ClientError'
    this.message = error.message
    this.statusCode = error.statusCode
      ? error.statusCode
      : StatusCodes.BAD_REQUEST
    this.explaination = error.explaination
  }
}

export default ClientError
