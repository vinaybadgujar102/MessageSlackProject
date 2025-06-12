import { StatusCodes } from 'http-status-codes'

import User from '../schema/user.js'
import Workspace from '../schema/workspace'
import ClientError from '../utils/errors/clientError'
import channelRepository from './channelRepository'
import crudRepository from './crudRepository'

const workspaceRepository = {
  ...crudRepository(Workspace),
  getWorkspaceDetailsById: async function (workspaceId: string) {
    const workspace = await Workspace.findById(workspaceId)
      .populate('members.memberId', 'username email avatar')
      .populate('channels')

    return workspace
  },
  getWorkspaceByName: async function (workspaceName: string) {
    const workspace = await Workspace.findOne({
      name: workspaceName
    })

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    return workspace
  },
  getWorkspaceByJoinCode: async function (joinCode: string) {
    const workspace = await Workspace.findOne({
      joinCode
    })

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    return workspace
  },
  addMemberToWorkspace: async function (
    workspaceId: string,
    memberId: string,
    role: string
  ) {
    const workspace = await Workspace.findById(workspaceId)

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isValidUser = await User.findById(memberId)
    if (!isValidUser) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId?.toString() === memberId
    )

    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'User already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      })
    }

    workspace.members.push({
      memberId,
      role
    })

    await workspace.save()

    return workspace
  },
  addChannelToWorkspace: async function (
    workspaceId: string,
    channelName: string
  ) {
    const workspace = await Workspace.findById(workspaceId).populate('channels')

    if (!workspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from the client',
        message: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (channel) => channel.toString() === channelName
    )

    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: 'Invalid data sent from client',
        message: 'Channel already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      })
    }

    const channel = await channelRepository.create({
      name: channelName,
      workspaceId: workspaceId
    })

    workspace.channels.push(channel)
    await workspace.save()

    return workspace
  },
  fetchAllWorkspaceByMemberId: async function (memberId: string) {
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar')

    return workspaces
  }
}

export default workspaceRepository
