import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { PORT } from './config/serverConfig'
import apiRoutes from './routes/apiRoutes'
import mailer from './config/mailConfig'

import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'
import mailQueue from './queues/mailQueue'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { dbConfig } from './config/dbConfig'
import MessageSocketHandlers from './controllers/messageSocketController'
import ChannelSocketHandlers from './controllers/channelSocketController'

import cors from 'cors'
import { verifyEmailController } from './controllers/workspaceController'

const app = express()
const server = createServer(app)

const io = new Server(server)

const bullServerAdapter = new ExpressAdapter()

createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  serverAdapter: bullServerAdapter
})

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)

app.get('/verify/:token', verifyEmailController)

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'pong' })
})

io.on('connection', (socket) => {
  MessageSocketHandlers(io, socket)
  ChannelSocketHandlers(io, socket)
})

server.listen(PORT, async () => {
  await dbConfig.connect().then(() => {
    console.log(`Server is running on port ${PORT}`)
  })

  const mailResponse = await mailer.sendMail({
    from: 'vinaybadgujar@gmail.com',
    to: 'vinaybadgujar@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email'
  })
  console.log(mailResponse)
})
