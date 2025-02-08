import { Schema, model } from 'mongoose'

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required']
    }
  },
  { timestamps: true }
)

const Channel = model('Channel', channelSchema)

export default Channel
