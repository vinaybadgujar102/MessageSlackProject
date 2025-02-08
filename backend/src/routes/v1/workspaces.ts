import { Router } from 'express'

import { validate } from '../../validators/zodValidator'
import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceByJoinCodeController,
  getWorkspaceController,
  getWorkspacesUserIsMemberOfController,
  updateWorkspaceController
} from '../../controllers/workspaceController'
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema, createWorkspaceSchema } from '../../validators/workspaceSchema'
import { isAuthenticated } from '../../middlewares/authMiddleware'

const router = Router()

router.post(
  '/',
  isAuthenticated,
  validate(createWorkspaceSchema),
  createWorkspaceController
)

router.get('/', isAuthenticated, getWorkspacesUserIsMemberOfController)

router.delete('/:id', isAuthenticated, deleteWorkspaceController)

router.get('/:workspaceId', isAuthenticated, getWorkspaceController)

router.get('/join/:joinCode', isAuthenticated, getWorkspaceByJoinCodeController)

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
export default router
