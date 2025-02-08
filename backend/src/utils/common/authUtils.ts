import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../../config/serverConfig'

export const createJWT = (payload: object) => {
  if (!JWT_SECRET || !JWT_EXPIRES_IN) {
    throw new Error('JWT_SECRET or JWT_EXPIRES_IN is not defined')
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyJWT = (token: string) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  return jwt.verify(token, JWT_SECRET)
}
