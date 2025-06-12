/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEnum } from '../utils/common/eventEnum.js'

export default function messageHandlers(io: any, socket: any) {
  socket.on(
    EventEnum.JOIN_CHANNEL,
    async function joinChannelHandler(data: any, cb: any) {
      const roomId = data.channelId
      socket.join(roomId)
      console.log(`User ${socket.id} joined the channel: ${roomId}`)
      cb?.({
        success: true,
        message: 'Successfully joined the channel',
        data: roomId
      })
    }
  )
}
