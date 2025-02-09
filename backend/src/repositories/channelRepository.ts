import crudRespository from './crudRepository'
import Channel from '../schema/channel'

const channelRepository = {
  ...crudRespository(Channel),
  getChannelWithWorkspaceDetails: async function (channelId: string) {
    const channel = await Channel.findById(channelId).populate('workspaceId')
    return channel;
  }
}

export default channelRepository
