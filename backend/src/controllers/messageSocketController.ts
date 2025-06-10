import { Server, Socket } from 'socket.io'

import { createMessageService } from '../service/messageService'
import { EventEnum } from '../utils/common/eventEnum'

export default function messageHandlers(io: Server, socket: Socket) {
  socket.on(
    EventEnum.NEW_MESSAGE,
    async function createMessageHandler(data: any, cb: any) {
      const { channelId } = data
      const messageResponse = await createMessageService(data)
      // socket.broadcast.emit(EventEnum.NEW_MESSAGE, messageResponse)
      io.to(channelId).emit(EventEnum.NEW_MESSAGE, messageResponse)
      cb({
        success: true,
        message: 'Message created successfully',
        data: messageResponse
      })
    }
  )
}
