import express from 'express'

import { isMemberPartOfWorkspaceController } from '../../controllers/memberController'
import { isAuthenticated } from '../../middlewares/authMiddleware'

const router = express.Router()

router.get(
  '/workspace/:workspace',
  isAuthenticated,
  isMemberPartOfWorkspaceController
)

export default router
