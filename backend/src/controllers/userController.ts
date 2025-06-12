/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes'

import { signInService, signUpService } from '@/service/userService'

import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject'
export const signUp = async (req: any, res: any) => {
  try {
    const user = await signUpService(req.body)

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User created successfully'))
  } catch (error: any) {
    console.log('User controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const signIn = async (req: any, res: any) => {
  try {
    const response = await signInService(req.body)
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User signed in successfully'))
  } catch (error: any) {
    console.log('User controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
