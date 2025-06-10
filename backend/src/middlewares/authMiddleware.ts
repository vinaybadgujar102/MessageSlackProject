import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { verifyJWT } from '../utils/common/authUtils'
import {
  customErrorResponse,
  internalServerError
} from '../utils/common/responseObject'
import userRepository from '../repositories/userRepository'

// Add this interface to extend Request
declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

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
          message: 'No token provided',
          explaination: 'invalid data sent by the client'
        })
      )
    }

    const response = verifyJWT(token as string)
    if (!response) {
      res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid token',
          explaination: 'invalid token sent by the client'
        })
      )
    }
    const decodedToken = response as { id: string }
    const user = await userRepository.getById(decodedToken.id)
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json(
        customErrorResponse({
          message: 'User not found',
          explaination: 'User associated with token no longer exists'
        })
      )
    }

    req.user = user.id
    next()
  } catch (error: unknown) {
    console.log('Auth middleware error: ', error)
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid token',
          explaination: 'invalid token sent by the client'
        })
      )
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
