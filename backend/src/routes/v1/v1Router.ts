import { Router } from 'express'

import usersRouter from './users'
import workspacesRouter from './workspaces'

const router = Router()

router.use('/users', usersRouter)

router.use('/workspaces', workspacesRouter)

export default router
