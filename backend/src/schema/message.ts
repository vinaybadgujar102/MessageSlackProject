import { Schema, model } from 'mongoose'

const messageSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, 'Message body is required']
    },
    image: {
      type: String
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
      required: [true, 'Channel id is required']
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender id is required']
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: [true, 'Workspace id is required']
    }
  },
  { timestamps: true }
)

const Message = model('Message', messageSchema)

export default Message
