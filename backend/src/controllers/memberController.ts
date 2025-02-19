import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { isMemberPartOfWorkspaceService } from '../service/memberService'

export const isMemberPartOfWorkspaceController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await isMemberPartOfWorkspaceService(
      req.params.workspaceId,
      req.user
    )
    res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log('Error in isMemberPartOfWorkspaceController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json({
        message: error.message
      })
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error'
    })
  }
}
