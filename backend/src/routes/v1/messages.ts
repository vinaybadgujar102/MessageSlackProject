import { Router } from 'express'

import {
  getMessages,
  getPresignedUrlFromAWS
} from '../../controllers/messageController'
import { isAuthenticated } from '../../middlewares/authMiddleware'

const router = Router()

router.get('/pre-signed-url', isAuthenticated, getPresignedUrlFromAWS)
router.get('/messages/:channelId', isAuthenticated, getMessages)

export default router
