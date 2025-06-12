import express from 'express'

import channelRouter from './channels'
import memberRouter from './members'
import messageRouter from './messages'
// import paymentRouter from './payment.js';
import userRouter from './users'
import workspaceRouter from './workspaces'
const router = express.Router()

router.use('/users', userRouter)

router.use('/workspaces', workspaceRouter)

router.use('/channels', channelRouter)

router.use('/members', memberRouter)

router.use('/messages', messageRouter)

// router.use('/payments', paymentRouter);

export default router
