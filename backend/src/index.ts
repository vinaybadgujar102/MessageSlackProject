import express from 'express'
import { StatusCodes } from 'http-status-codes'

import { dbConfig } from './config/dbConfig'
import { PORT } from './config/serverConfig'
import apiRoutes from './routes/apiRoutes'
const app = express()

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
})
