import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { PORT } from './config/serverConfig'
import apiRoutes from './routes/apiRoutes'
import mailer from './config/mailConfig'

import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'
import mailQueue from './queues/mailQueue'

const app = express()

const bullServerAdapter = new ExpressAdapter()

createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  serverAdapter: bullServerAdapter
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRoutes)
app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'pong' })
})

app.listen(PORT, async () => {
  //   await dbConfig.connect().then(() => {
  //     console.log(`Server is running on port ${PORT}`)
  //   })

  const mailResponse = await mailer.sendMail({
    from: 'vinaybadgujar@gmail.com',
    to: 'vinaybadgujar@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email'
  })
  console.log(mailResponse)
})
