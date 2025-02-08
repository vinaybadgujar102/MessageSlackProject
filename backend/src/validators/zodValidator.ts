import { NextFunction,Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { customErrorResponse } from '../utils/common/responseObject'

export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error: any) {
      const explaination: any[] = []
      let errorMessage = ''
      error.errors.forEach((key: any) => {
        explaination.push(key.path[0] + ' ' + key.message)
        errorMessage += ' : ' + key.path[0] + ' ' + key.message
      })
      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'Validation error' + errorMessage,
          explaination: explaination
        })
      )
    }
  }
}
