import AWS from 'aws-sdk'
import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from './serverConfig'

export const s3 = new AWS.S3({
  region: 'us-east-1',
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})
