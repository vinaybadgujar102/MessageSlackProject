import { Request, Response } from 'express'
import { getMessagesService } from '../service/messageService'
import { StatusCodes } from 'http-status-codes'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject'
import { s3 } from '../config/awsConfig'
import { AWS_BUCKET_NAME } from '../config/serverConfig'

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

export const getPresignedUrlFromAWS = async (req: Request, res: Response) => {
  try {
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: AWS_BUCKET_NAME,
      Key: `${Date.now}`,
      Expires: 60 // 1 minute
    })
    res
      .status(StatusCodes.OK)
      .json(successResponse(url, 'Presigned url fetched successfully'))
  } catch (error: any) {
    console.log('Error in getPresignedUrlFromAWS controller: ', error)
    if (error.statusCode) {
      res.status(error.statusCode).json(
        customErrorResponse({
          message: error.message,
          explaination: error.explaination
        })
      )
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      internalServerError({
        message: 'Internal server error',
        explaination: error.message
      })
    )
  }
}
