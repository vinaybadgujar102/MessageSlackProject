import User from '../schema/user'
import crudRespository from './crudRepository'

//type UserType = typeof User

// export const getUserByEmail = async (email: string) => {
//   const user = await User.findOne({ email })
//   return user
// }

// export const getUserByUsername = async (username: string) => {
//   const user = await User.findOne({ username })
//   return user
// }

// export const getUsers = async () => {
//   const users = await User.find()
//   return users
// }

// export const getUserById = async (id: string) => {
//   const user = await User.findById(id)
//   return user
// }

// export const createUser = async (user: UserType) => {
//   const newUser = await User.create(user)
//   return newUser
// }

// export const updateUser = async (id: string, user: UserType) => {
//   const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
//   return updatedUser
// }

// export const deleteUser = async (id: string) => {
//   const deletedUser = await User.findByIdAndDelete(id)
//   return deletedUser
// }

const userRepository = {
  ...crudRespository(User),
  getUserByEmail: async (email: string) => {
    const user = await User.findOne({ email })
    return user
  },
  getUserByUsername: async (username: string) => {
    const user = await User.findOne({ username }).select('-password') // -password to exclude the password from the response
    return user
  }
}

export default userRepository
