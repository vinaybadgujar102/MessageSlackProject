import mailQueue from '../queues/mailQueue'

import '../processors/mailProcessor'

export const addEmailToMailQueue = async (emailData: any) => {
  try {
    await mailQueue.add(emailData, {
      jobId: emailData.to
    })
    console.log('Email added to mail queue')
  } catch (error) {
    console.log('Add email to mail queue failed', error)
  }
}
