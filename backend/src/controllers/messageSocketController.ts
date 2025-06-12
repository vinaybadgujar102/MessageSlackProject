/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMessageService } from '@/service/messageService'

import { EventEnum } from '../utils/common/eventEnum'

export default function messageHandlers(io: any, socket: any) {
  socket.on(
    EventEnum.NEW_MESSAGE,
    async function createMessageHandler(data: any, cb: any) {
      console.log(data, typeof data)
      const { channelId } = data
      const messageResponse = await createMessageService(data)
      // socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
      console.log('Channel', channelId)
      io.to(channelId).emit(EventEnum.NEW_MESSAGE, messageResponse) // Implementation of rooms
      cb({
        success: true,
        message: 'Successfully created the message',
        data: messageResponse
      })
    }
  )
}
