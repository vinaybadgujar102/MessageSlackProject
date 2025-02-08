import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { signUpService } from '../service/userService'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject'

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await signUpService(req.body)
    res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User created successfully'))
  } catch (error: any) {
    console.log('User controller error: ', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
