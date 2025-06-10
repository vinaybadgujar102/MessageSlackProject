/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'

import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig'
import userRepository from '../repositories/userRepository'
import { createJWT } from '../utils/common/authUtils'
import ClientError from '../utils/errors/clientError'
import ValidationError from '../utils/errors/validationError'

export const verifyTokenService = async (token: string) => {
  try {
    const user = await userRepository.getByToken(token)
    if (!user) {
      throw new ClientError({
        explaination: 'Invalid data sent by the client',
        message: 'no registered user found with this email',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    // check if the token is expired
    if (
      user.verificationTokenExpiry &&
      user.verificationTokenExpiry < new Date()
    ) {
      throw new ClientError({
        explaination: 'Invalid data sent by the client',
        message: 'token expired',
        statusCode: StatusCodes.BAD_REQUEST
      })
    }

    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiry = undefined
    await user.save()

    return user
  } catch (error) {
    console.log('User service error: ', error)
    throw new Error('Internal server error')
  }
}

export const signUpService = async (data: any) => {
  try {
    const newUser = await userRepository.signUpUser(data)
    if (ENABLE_EMAIL_VERIFICATION === 'true') {
      // TODO - later add this from repo
    }
    return newUser
  } catch (error: any) {
    console.log('User service error: ', error)
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      )
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A user with same email or username already exists']
        },
        'User already exists'
      )
    }
    throw new Error('Internal server error')
  }
}

export const signInService = async (data: any) => {
  try {
    const user = await userRepository.getUserByEmail(data.email)
    if (!user) {
      throw new ClientError({
        explaination: 'Invalid data sent by the client',
        message: 'no registered user found with this email',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    //match the incoming password with the hashed password
    const isPasswordMatch = await bcrypt.compare(data.password, user.password)
    if (!isPasswordMatch) {
      throw new ClientError({
        explaination: 'Invalid data sent by the client',
        message: 'Invalid password, please try again',
        statusCode: StatusCodes.BAD_REQUEST
      })
    }

    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
      token: createJWT({
        id: user._id,
        email: user.email
      })
    }
  } catch (error) {
    console.log('User service error: ', error)
    throw new Error('Internal server error')
  }
}
