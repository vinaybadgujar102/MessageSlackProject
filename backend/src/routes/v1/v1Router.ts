import { Router } from 'express'

import channelsRouter from './channels'
import membersRouter from './members'
import messagesRouter from './messages'
import usersRouter from './users'
import workspacesRouter from './workspaces'
const router = Router()

router.use('/users', usersRouter)

router.use('/workspaces', workspacesRouter)

router.use('/channels', channelsRouter)

router.use('/members', membersRouter)

router.use('/messages', messagesRouter)

export default router
