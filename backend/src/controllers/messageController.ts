import { Request, Response } from 'express'
import { getMessagesService } from '../service/messageService'
import { StatusCodes } from 'http-status-codes'
import {
  customErrorResponse,
  successResponse
} from '../utils/common/responseObject'

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await getMessagesService(
      {
        channelId: req.params.channelId
      },
      Number(req.query.page) || 1,
      Number(req.query.limit) || 20,
      req.user
    )

    res
      .status(StatusCodes.OK)
      .json(successResponse(messages, 'Messages fetched successfully'))
  } catch (error: any) {
    console.log('Error in getMessages controller: ', error)
    res.status(error.statusCode).json(
      customErrorResponse({
        message: error.message,
        explaination: error.explaination
      })
    )
  }
}
