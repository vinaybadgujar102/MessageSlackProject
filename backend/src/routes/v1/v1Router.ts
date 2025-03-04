import { Router } from 'express'

import usersRouter from './users'
import workspacesRouter from './workspaces'
import channelsRouter from './channels'
import membersRouter from './members'
import messagesRouter from './messages'
const router = Router()

router.use('/users', usersRouter)

router.use('/workspaces', workspacesRouter)

router.use('/channels', channelsRouter)

router.use('/members', membersRouter)

router.use('/messages', messagesRouter)

export default router
