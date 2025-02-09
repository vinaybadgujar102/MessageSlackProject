import workspaceRepository from '../repositories/workspaceRepository'

import { v4 as uuidv4 } from 'uuid'
import ValidationError from '../utils/errors/validationError'
import { StatusCodes } from 'http-status-codes'
import ClientError from '../utils/errors/clientError'
import channelRepository from '../repositories/channelRepository'
import userRepository from '../repositories/userRepository'
import { addEmailToMailQueue } from '../producers/mailQueueProducer'
import { workspaceJoinMail } from '../utils/common/mailObject'

const isUserAdminOfWorkspace = async (workspace: any, userId: string) => {
  return workspace.members.find(
    (member: any) =>
      (member.memberId.toString() === userId ||
        member.memberId._id.toString() === userId) &&
      member.role === 'admin'
  )
}

export const isUserMemberOfWorkspace = async (
  workspace: any,
  userId: string
) => {
  return workspace.members.find(
    (member: any) => member.memberId.toString() === userId
  )
}

const isChannelAlreadyPresentInWorkspace = async (
  workspace: any,
  channelName: string
) => {
  return workspace.channels.find((channel: any) => channel.name === channelName)
}

export const createWorkspaceService = async (workspaceData: any) => {
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase()

    const response = await workspaceRepository.create({
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode
    })

    await workspaceRepository.addMemberToWorkspace(
      response._id,
      workspaceData.owner,
      'admin'
    )

    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
      response._id,
      'general'
    )

    return updatedWorkspace
  } catch (error: any) {
    console.log('Error in createWorkspaceService', error)
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      )
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['a workspace with same details already exists']
        },
        'Workspace already exists'
      )
    }
    throw new Error('Internal server error')
  }
}

export const getWorkspacesUserIsMemberOfService = async (userId: string) => {
  try {
    const workspaces =
      await workspaceRepository.fetchAllWorkspacesByUserId(userId)
    return workspaces
  } catch (error: any) {
    console.log('Error in getWorkspacesUserIsMemberOfService', error)
    throw new Error('Internal server error')
  }
}

export const deleteWorkspaceService = async (
  workspaceId: string,
  userId: string
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isAllowed = await isUserAdminOfWorkspace(workspace, userId)

    if (!isAllowed) {
      throw new ClientError({
        message: 'You are not allowed to delete this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }

    await channelRepository.deleteMany(workspace.channels)

    const response = await workspaceRepository.delete(workspaceId)
    return response
  } catch (error: any) {
    console.log('Error in deleteWorkspaceService', error)
    throw new Error('Internal server error')
  }
}

export const getWorkspaceService = async (
  workspaceId: string,
  userId: string
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const isMember = await isUserMemberOfWorkspace(workspace, userId)
    if (!isMember) {
      throw new ClientError({
        message: 'You are not a member of this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }
    return workspace
  } catch (error: any) {
    console.log('Error in getWorkspaceService', error)
    throw new Error('Internal server error')
  }
}

export const getWorkspaceByJoinCodeService = async (
  joinCode: string,
  userId: string
) => {
  try {
    const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const isMember = await isUserMemberOfWorkspace(workspace, userId)
    if (!isMember) {
      throw new ClientError({
        message: 'You are not a member of this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }
    return workspace
  } catch (error: any) {
    console.log('Error in getWorkspaceByJoinCodeService', error)
    throw new Error('Internal server error')
  }
}

export const updateWorkspaceService = async (
  workspaceId: string,
  workspaceData: any,
  userId: string
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const isAdmin = await isUserAdminOfWorkspace(workspace, userId)
    if (!isAdmin) {
      throw new ClientError({
        message: 'You are not allowed to update this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }
    const updatedWorkspace = await workspaceRepository.update(
      workspaceId,
      workspaceData
    )
    return updatedWorkspace
  } catch (error: any) {
    console.log('Error in updateWorkspaceService', error)
    throw new Error('Internal server error')
  }
}

export const addMemberToWorkspaceService = async (
  workspaceId: string,
  memberId: string,
  role: string,
  userId: string
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const isAdmin = await isUserAdminOfWorkspace(workspace, userId)
    if (!isAdmin) {
      throw new ClientError({
        message: 'You are not allowed to add a member to this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }
    const isValidUser = await userRepository.getById(memberId)
    if (!isValidUser) {
      throw new ClientError({
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const isMember = await isUserMemberOfWorkspace(workspace, memberId)
    if (isMember) {
      throw new ClientError({
        explaination: 'You are already a member of this workspace',
        message: 'You are already a member of this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }
    const response = await workspaceRepository.addMemberToWorkspace(
      workspaceId,
      memberId,
      role
    )
    addEmailToMailQueue({
      ...workspaceJoinMail(workspace),
      to: isValidUser.email
    })
    return response
  } catch (error: any) {
    console.log('Error in addMemberToWorkspaceService', error)
    throw new Error('Internal server error')
  }
}

export const addChannelToWorkspaceService = async (
  workspaceId: string,
  channelName: string,
  userId: string
) => {
  try {
    const workspace =
      await workspaceRepository.getWorkspaceDetailsById(workspaceId)
    if (!workspace) {
      throw new ClientError({
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    const isAdmin = await isUserAdminOfWorkspace(workspace, userId)
    if (!isAdmin) {
      throw new ClientError({
        message: 'You are not allowed to add a channel to this workspace',
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }

    const isChannelAlreadyPresent = await isChannelAlreadyPresentInWorkspace(
      workspace,
      channelName
    )
    if (isChannelAlreadyPresent) {
      throw new ClientError({
        message: 'Channel already exists',
        statusCode: StatusCodes.BAD_REQUEST
      })
    }

    const response = await workspaceRepository.addChannelToWorkspace(
      workspaceId,
      channelName
    )
    return response
  } catch (error: any) {
    console.log('Error in addChannelToWorkspaceService', error)
    throw new Error('Internal server error')
  }
}
