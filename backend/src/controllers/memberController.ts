/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes'

import { isMemberPartOfWorkspaceService } from '../service/memberService'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject'

export const isMemberPartOfWorkspaceController = async (req: any, res: any) => {
  try {
    const response = await isMemberPartOfWorkspaceService(
      req.params.workspaceId,
      req.user
    )

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User is a member of the workspace'))
  } catch (error: any) {
    console.log('User controller error', error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error))
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
