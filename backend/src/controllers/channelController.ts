/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getChannelById } from '../service/channelService'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject'

export const getChannelByIdController = async (req: Request, res: Response) => {
  try {
    const channel = await getChannelById(req.params.channelId, req.user)
    res
      .status(StatusCodes.OK)
      .json(successResponse(channel, 'Channel fetched successfully'))
  } catch (error: any) {
    console.log('Error in getChannelByIdController', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(customErrorResponse(error))
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error))
  }
}
