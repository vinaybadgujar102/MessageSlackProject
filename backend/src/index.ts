// import mailer from './config/mailConfig'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { Server } from 'socket.io'

import { dbConfig } from './config/dbConfig'
import { PORT } from './config/serverConfig'
import ChannelSocketHandlers from './controllers/channelSocketController'
import MessageSocketHandlers from './controllers/messageSocketController'
import { verifyEmailController } from './controllers/workspaceController'
import mailQueue from './queues/mailQueue'
import apiRoutes from './routes/apiRoutes'

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

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
  // await dbConfig.connect().then(() => {
  //   console.log(`Server is running on port ${PORT}`)
  // })

  await mongoose.connect(
    'mongodb+srv://vinaybadgujar8:Badgujar%40102@cluster0.pixrm7d.mongodb.net/chat-app'
  )

  // const mailResponse = await mailer.sendMail({
  //   from: 'vinaybadgujar@gmail.com',
  //   to: 'vinaybadgujar@gmail.com',
  //   subject: 'Test Email',
  //   text: 'This is a test email'
  // })
  // console.log(mailResponse)
})
