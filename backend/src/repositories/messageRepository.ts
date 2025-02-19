import Message from '../schema/message'
import crudRespository from './crudRepository'

const messageRepository = {
  ...crudRespository(Message),

  getPaginatedMessages: async (
    messageParams: any,
    page: number,
    limit: number
  ) => {
    const messages = await Message.find(messageParams)
      .sort({
        createdAt: -1
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: 'senderId',
        select: 'username email avatar'
      })
    return messages
  }
}

export default messageRepository
