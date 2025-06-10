import { REDIS_PORT, REDIS_URL } from './serverConfig'

export default {
  host: REDIS_URL!,
  port: parseInt(REDIS_PORT!)
}
