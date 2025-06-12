import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter.js'
import { ExpressAdapter } from '@bull-board/express'

import testQueue from '@/queues/testQueue.js'

import mailQueue from '../queues/mailQueue.js'

const bullServerAdapter = new ExpressAdapter()
bullServerAdapter.setBasePath('/ui')

createBullBoard({
  queues: [new BullAdapter(mailQueue), new BullAdapter(testQueue)],
  serverAdapter: bullServerAdapter
})

export default bullServerAdapter
