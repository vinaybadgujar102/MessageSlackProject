import express from 'express'

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceByJoinCodeController,
  getWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  joinWorkspaceController,
  resetJoinCodeController,
  updateWorkspaceController
} from '../../controllers/workspaceController'
import { isAuthenticated } from '../../middlewares/authMiddleware'
import {
  addChannelToWorkspaceSchema,
  addMemberToWorkspaceSchema,
  createWorkspaceSchema
} from '../../validators/workspaceSchema'
import { validate } from '../../validators/zodValidator'

const router = express.Router()

router.post(
  '/',
  isAuthenticated,
  validate(createWorkspaceSchema),
  createWorkspaceController
)

router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController)

router.delete('/:workspaceId', isAuthenticated, deleteWorkspaceController)

router.get('/:workspaceId', isAuthenticated, getWorkspaceController)

router.get('/join/:joinCode', isAuthenticated, getWorkspaceByJoinCodeController)

router.put('/:workspaceId/join', isAuthenticated, joinWorkspaceController)

router.put('/:workspaceId', isAuthenticated, updateWorkspaceController)

router.put(
  '/:workspaceId/members',
  isAuthenticated,
  validate(addMemberToWorkspaceSchema),
  addMemberToWorkspaceController
)

router.put(
  '/:workspaceId/channels',
  isAuthenticated,
  validate(addChannelToWorkspaceSchema),
  addChannelToWorkspaceController
)

router.put(
  '/:workspaceId/joinCode/reset',
  isAuthenticated,
  resetJoinCodeController
)

export default router
