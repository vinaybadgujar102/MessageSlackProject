import { Router } from 'express'
import { getChannelByIdController } from '../../controllers/channelController'
import { isAuthenticated } from '../../middlewares/authMiddleware'
import { isMemberPartOfWorkspaceController } from '../../controllers/memberController'

const router = Router()

router.get(
  '/workspace/:workspace',
  isAuthenticated,
  isMemberPartOfWorkspaceController
)

export default router
