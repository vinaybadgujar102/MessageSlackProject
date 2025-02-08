import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '../utils/common/authUtils'
import { StatusCodes } from 'http-status-codes'
import {
  customErrorResponse,
  internalServerError
} from '../utils/common/responseObject'

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

    req.user = response
    next()
  } catch (error: any) {
    console.log('Auth middleware error: ', error)
    if (error.name === 'JsonWebTokenError') {
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
