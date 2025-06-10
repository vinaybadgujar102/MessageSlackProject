import { StatusCodes } from 'http-status-codes'

import channelRepository from '../repositories/channelRepository'
import messageRepository from '../repositories/messageRepository'
import ClientError from '../utils/errors/clientError'
import { isUserMemberOfWorkspace } from './workspaceService'

export const getMessagesService = async (
  messageParams: any,
  page: number,
  limit: number,
  user: any
) => {
  const channelDetails = await channelRepository.getChannelWithWorkspaceDetails(
    messageParams.channelId
  )

  if (!channelDetails) {
    throw new ClientError({
      explanation: 'Channel not found',
      message: 'Channel not found',
      statusCode: StatusCodes.NOT_FOUND
    })
  }

  const workspace = channelDetails.workspaceId

  const isMember = await isUserMemberOfWorkspace(workspace, user)

  if (!isMember) {
    throw new ClientError({
      explanation: 'User is not a member of the workspace',
      message: 'User is not a member of the workspace',
      statusCode: StatusCodes.UNAUTHORIZED
    })
  }

  const messages = await messageRepository.getPaginatedMessages(
    messageParams,
    page,
    limit
  )
  return messages
}

export const createMessageService = async (message: any) => {
  const newMessage = await messageRepository.create(message)
  return newMessage
}
