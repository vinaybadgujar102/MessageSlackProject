import { StatusCodes } from 'http-status-codes'
import channelRepository from '../repositories/channelRepository'
import ClientError from '../utils/errors/clientError'
import { isUserMemberOfWorkspace } from './workspaceService'
import messageRepository from '../repositories/messageRepository'

export const getChannelById = async (channelId: string, userId: string) => {
  try {
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId)
    if (!channel || !channel.workspaceId) {
      throw new ClientError({
        message: 'Channel not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isUserPartOfWorkspace = await isUserMemberOfWorkspace(
      channel.workspaceId,
      userId
    )
    if (!isUserPartOfWorkspace) {
      throw new ClientError({
        message:
          'User is not part of this workspace and he is not allowed to access this channel',
        statusCode: StatusCodes.FORBIDDEN
      })
    }

    const messages = await messageRepository.getPaginatedMessages(
      {
        channelId
      },
      1,
      20
    )

    return {
      messages,
      _id: channel._id,
      name: channel.name,
      createdAt: channel.createdAt,
      updatedAt: channel.updatedAt,
      workspaceId: channel.workspaceId
    }
  } catch (error: any) {
    console.log('Error in getChannelById', error)
    throw new Error('Internal server error')
  }
}
