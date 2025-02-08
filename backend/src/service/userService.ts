/* eslint-disable @typescript-eslint/no-explicit-any */
import userRepository from '../repositories/userRepository'
import ValidationError from '../utils/errors/validationError'

export const signUpService = async (data: any) => {
  try {
    const newUser = await userRepository.create(data)
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
