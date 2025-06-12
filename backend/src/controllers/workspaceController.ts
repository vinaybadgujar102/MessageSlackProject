import { StatusCodes } from 'http-status-codes'

import { verifyTokenService } from '@/service/userService'
import {
  addChannelToWorkspaceService,
  addMemberToWorkspaceService,
  createWorkspaceService,
  deleteWorkspaceService,
  getWorkspaceByJoinCodeService,
  getWorkspaceService,
  getWorkspacesUserIsMemberOfService,
  joinWorkspaceService,
  resetWorkspaceJoinCodeService,
  updateWorkspaceService
} from '@/service/workspaceService'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '@/utils/common/responseObject'

export const createWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user
    })
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Workspace created successfully'))
  } catch (error: any) {
    console.log(error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspacesUserIsMemberOfController = async (
  req: any,
  res: any
) => {
  try {
    const response = await getWorkspacesUserIsMemberOfService(req.user)
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspaces fetched successfully'))
  } catch (error: any) {
    console.log(error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const deleteWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await deleteWorkspaceService(
      req.params.workspaceId,
      req.user
    )
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'))
  } catch (error: any) {
    console.log(error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await getWorkspaceService(req.params.workspaceId, req.user)
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'))
  } catch (error: any) {
    console.log('Get workspace controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspaceByJoinCodeController = async (req: any, res: any) => {
  try {
    const response = await getWorkspaceByJoinCodeService(
      req.params.joinCode,
      req.user
    )
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'))
  } catch (error: any) {
    console.log('Get workspace by joincode controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const updateWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await updateWorkspaceService(
      req.params.workspaceId,
      req.body,
      req.user
    )
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace updated successfully'))
  } catch (error: any) {
    console.log('update workspace controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const addMemberToWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    )
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Member added to workspace successfully'))
  } catch (error: any) {
    console.log('add member to workspace controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const addChannelToWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await addChannelToWorkspaceService(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    )
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Channel added to workspace successfully')
      )
  } catch (error: any) {
    console.log('add channel to workspace controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const resetJoinCodeController = async (req: any, res: any) => {
  try {
    const response = await resetWorkspaceJoinCodeService(
      req.params.workspaceId,
      req.user
    )
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Join code reset successfully'))
  } catch (error: any) {
    console.log('reset join code controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const joinWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await joinWorkspaceService(
      req.params.workspaceId,
      req.body.joinCode,
      req.user
    )
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Joined workspace successfully'))
  } catch (error: any) {
    console.log('join workspace controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const verifyEmailController = async (req: any, res: any) => {
  try {
    const response = await verifyTokenService(req.params.token)
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Email verified successfully'))
  } catch (error: any) {
    console.log('verify email controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
