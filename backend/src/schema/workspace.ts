import { Schema, model } from 'mongoose'

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Workspace name is required'],
    unique: true
  },
  description: {
    type: String
  },
  members: [
    {
      memberId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      }
    }
  ],
  joinCode: {
    type: String,
    required: [true, 'Join code is required']
  },
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Channel'
    }
  ]
})

const Workspace = model('Workspace', workspaceSchema)

export default Workspace
