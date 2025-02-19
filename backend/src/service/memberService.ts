import { StatusCodes } from 'http-status-codes'
import workspaceRepository from '../repositories/workspaceRepository'
import ClientError from '../utils/errors/clientError'
import userRepository from '../repositories/userRepository'

export const isMemberPartOfWorkspaceService = async (
  workspaceId: string,
  memberId: string
) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId)
    if (!workspace) {
      throw new ClientError({
        explaination: 'Workspace not found',
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Workspace not found'
      })
    }
    const isUserAMember = await workspaceRepository.getById(workspaceId)

    if (!isUserAMember) {
      throw new ClientError({
        explaination: 'User is not a member of the workspace',
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'User is not a member of the workspace'
      })
    }

    const user = await userRepository.getById(memberId)
    if (!user) {
      throw new ClientError({
        explaination: 'User not found',
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User not found'
      })
    }

    return user
  } catch (error: any) {
    console.log('Error in isMemberPartOfWorkspaceService', error)
  }
}
