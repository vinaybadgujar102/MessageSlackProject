import crudRespository from './crudRepository'
import Channel from '../schema/channel'

const channelRepository = {
  ...crudRespository(Channel)
}

export default channelRepository
