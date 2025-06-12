import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/serverConfig'
import userRepository from '../repositories/userRepository'
import {
  customErrorResponse,
  internalServerError
} from '../utils/common/responseObject'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) {
      res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'No auth token provided'
        })
      )
      return
    }

    const response = jwt.verify(token as string, JWT_SECRET as string)

    if (!response) {
      res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid data sent from the client',
          message: 'Invalid auth token provided'
        })
      )
      return
    }

    const user = await userRepository.getById(response.id as string)
    req.user = user.id
    next()
  } catch (error: any) {
    console.log('Auth middleware error', error)
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid data sent from the client',
          message: 'Invalid auth token provided'
        })
      )
      return
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
    return
  }
}
