import Queue from 'bull'

import redisConfig from '../config/redisConfig'

export default new Queue('mailQueue', {
  redis: redisConfig
})
