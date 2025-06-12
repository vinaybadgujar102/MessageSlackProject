/* eslint-disable @typescript-eslint/no-explicit-any */
import Message from '../schema/message'
import crudRepository from './crudRepository'

const messageRepository = {
  ...crudRepository(Message),
  getPaginatedMessaged: async (
    messageParams: any,
    page: number,
    limit: number
  ) => {
    const messages = await Message.find(messageParams)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('senderId', 'username email avatar')

    return messages
  },
  getMessageDetails: async (messageId: string) => {
    const message = await Message.findById(messageId).populate(
      'senderId',
      'username email avatar'
    )
    return message
  }
}

export default messageRepository
