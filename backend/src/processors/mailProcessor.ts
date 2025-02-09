import mailer from '../config/mailConfig'
import { Worker } from 'bullmq'
import redisConfig from '../config/redisConfig'

new Worker(
  'mailQueue',
  async (job) => {
    const emailData = job.data
    console.log('Processing email: ', emailData)

    try {
      const response = await mailer.sendMail(emailData)
      console.log('Email sent successfully', response)
    } catch (error) {
      console.log('Error in mailProcessor', error)
    }
  },
  { connection: redisConfig }
)
