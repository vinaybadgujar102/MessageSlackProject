import {
  internalServerError,
  successResponse
} from '../utils/common/responseObject'

import { Request, Response } from 'express'
import { customErrorResponse } from '../utils/common/responseObject'
import { StatusCodes } from 'http-status-codes'
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
} from '../service/workspaceService'
import { verifyTokenService } from '../service/userService'

export const createWorkspaceController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user._id
    })

    res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Workspace created successfully'))
  } catch (error: any) {
    console.log(error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspacesUserIsMemberOfController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await getWorkspacesUserIsMemberOfService(req.user._id)
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspaces fetched successfully'))
  } catch (error: any) {
    console.log(error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const deleteWorkspaceController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await deleteWorkspaceService(req.params.id, req.user._id)
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace deleted successfully'))
  } catch (error: any) {
    console.log(error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspaceController = async (req: Request, res: Response) => {
  try {
    const response = await getWorkspaceService(
      req.params.workspaceId,
      req.user._id
    )
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'))
  } catch (error: any) {
    console.log('Error in getWorkspaceController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const getWorkspaceByJoinCodeController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await getWorkspaceByJoinCodeService(
      req.params.joinCode,
      req.user
    )
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'))
  } catch (error: any) {
    console.log('Error in getWorkspaceByJoinCodeController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const updateWorkspaceController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await updateWorkspaceService(
      req.params.workspaceId,
      req.body,
      req.user
    )
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace updated successfully'))
  } catch (error: any) {
    console.log('Error in updateWorkspaceController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
  }
}

export const addMemberToWorkspaceController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await addMemberToWorkspaceService(
      req.params.workspaceId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    )
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Member added to workspace successfully'))
  } catch (error: any) {
    console.log('Error in addMemberToWorkspaceController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const addChannelToWorkspaceController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await addChannelToWorkspaceService(
      req.params.workspaceId,
      req.body.channelName,
      req.user
    )
    res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Channel added to workspace successfully')
      )
  } catch (error: any) {
    console.log('Error in addChannelToWorkspaceController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const resetWorkspaceJoinCodeController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await resetWorkspaceJoinCodeService(
      req.params.workspaceId,
      req.user
    )
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace join code reset successfully'))
  } catch (error: any) {
    console.log('Error in resetWorkspaceJoinCodeController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const joinWorkspaceController = async (req: Request, res: Response) => {
  try {
    const response = await joinWorkspaceService(
      req.params.workspaceId,
      req.user,
      req.body.joinCode
    )
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace joined successfully'))
  } catch (error: any) {
    console.log('Error in joinWorkspaceController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}

export const verifyEmailController = async (req: Request, res: Response) => {
  try {
    const response = await verifyTokenService(req.params.token)
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Email verified successfully'))
  } catch (error: any) {
    console.log('Error in verifyEmailController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
