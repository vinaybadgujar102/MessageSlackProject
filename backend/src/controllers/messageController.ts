/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes'

import { s3 } from '@/config/awsConfig'
import { AWS_BUCKET_NAME } from '@/config/serverConfig'

import { getMessagesService } from '../service/messageService'
import {
  customErrorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject'

export const getMessages = async (req: any, res: any) => {
  try {
    const messages = await getMessagesService(
      {
        channelId: req.params.channelId
      },
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    )

    return res
      .status(StatusCodes.OK)
      .json(successResponse(messages, 'Messages Fetched Successfully'))
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

export const getPresignedUrlFromAWS = async (req: any, res: any) => {
  try {
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: AWS_BUCKET_NAME,
      Key: `${Date.now()}`,
      Expires: 60 // 1 minute
    })
    return res
      .status(StatusCodes.OK)
      .json(successResponse(url, 'Presigned URL generated successfully'))
  } catch (err: any) {
    console.log('Error in getPresignedUrlFromAWS', err)
    if (err.statusCode) {
      return res.status(err.statusCode).json(customErrorResponse(err))
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(err))
  }
}
