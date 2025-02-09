import { REDIS_URL } from './serverConfig'

import { REDIS_PORT } from './serverConfig'

export default {
  host: REDIS_URL!,
  port: parseInt(REDIS_PORT!)
}
