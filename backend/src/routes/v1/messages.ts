import express from 'express'

import {
  getMessages,
  getPresignedUrlFromAWS
} from '../../controllers/messageController'
import { isAuthenticated } from '../../middlewares/authMiddleware'

const router = express.Router()

router.get('/pre-signed-url', isAuthenticated, getPresignedUrlFromAWS)
router.get('/:channelId', isAuthenticated, getMessages)

export default router
