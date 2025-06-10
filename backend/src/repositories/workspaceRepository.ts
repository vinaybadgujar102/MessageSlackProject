import { StatusCodes } from 'http-status-codes'
import Workspace from '../schema/workspace'
import ClientError from '../utils/errors/clientError'
import crudRespository from './crudRepository'
import User from '../schema/user'
import channelRepository from './channelRepository'

const workspaceRepository = {
  ...crudRespository(Workspace),

  getWorkspaceDetailsById: async function (workspaceId: string) {
    const workspace = await Workspace.findById(workspaceId)
      .populate('members.memberId', 'username email avatar')
      .populate('channels')
    return workspace
  },

  getWorkspaceByname: async function (name: string) {
    const workspace = await Workspace.findOne({ name })
    if (!workspace) {
      throw new ClientError({
        explaination: 'invalid data send from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }
    return workspace
  },

  getWorkspaceByJoinCode: async function (joinCode: string) {
    const workspace = await Workspace.findOne({ joinCode })
    if (!workspace) {
      throw new ClientError({
        explaination: 'invalid data send from the client',
        message: 'workspace not found',
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
        explaination: 'invalid data send from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const member = await User.findById(memberId)
    if (!member) {
      throw new ClientError({
        explaination: 'invalid data send from the client',
        message: 'member not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isMemberAlreadyPartOfWorkspace = workspace.members.some(
      (member) => member.memberId?.toString() === memberId
    )

    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explaination: 'invalid data send from the client',
        message: 'member already part of workspace',
        statusCode: StatusCodes.FORBIDDEN
      })
    }

    workspace.members.push({ memberId, role })
    await workspace.save()
  },
  addChannelToWorkspace: async function (
    workspaceId: string,
    channelName: string
  ) {
    const workspace = await Workspace.findById(workspaceId).populate({
      path: 'channels',
      select: 'name'
    })
    if (!workspace) {
      throw new ClientError({
        explaination: 'invalid data send from the client',
        message: 'workspace not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const isChannelAlreadyPartOfWorkspace = workspace.channels.some(
      (channel: any) => channel.name === channelName.toLowerCase()
    )

    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientError({
        explaination: 'invalid data send from the client',
        message: 'channel already part of workspace',
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

  removeChannelFromWorkspace: async function () {},

  fetchAllWorkspacesByUserId: async function (memberId: string) {
    console.log('memberId', memberId)
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate('members.memberId', 'username email avatar')

    return workspaces
  }
}

export default workspaceRepository
