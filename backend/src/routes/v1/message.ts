import { Router } from 'express'

import { getMessages } from '../../controllers/messageController'
import { isAuthenticated } from '../../middlewares/authMiddleware'

const router = Router()

router.get('/messages/:channelId', isAuthenticated, getMessages)

export default router
