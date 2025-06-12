import { model, Schema } from 'mongoose'

const channelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Channel name is required']
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true
    }
  },
  { timestamps: true }
)

const Channel = model('Channel', channelSchema)

export default Channel
