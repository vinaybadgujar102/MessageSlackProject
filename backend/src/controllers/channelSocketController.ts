import { Server, Socket } from 'socket.io'
import { EventEnum } from '../utils/common/eventEnum'

export default function messageHandlers(io: Server, socket: Socket) {
  socket.on(
    EventEnum.JOIN_CHANNEL,
    async function joinChannelHandler(data: any, cb: any) {
      const roomId = data.channelId
      socket.join(roomId)
      cb({
        success: true,
        message: 'Joined channel successfully',
        data: roomId
      })
    }
  )
}
