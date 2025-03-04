import axios from "@/config/axiosConfig";

export const getChannelById = async ({
  channelId,
  token,
}: {
  channelId: string;
  token: string;
}) => {
  try {
    const response = await axios.get(`/channels/${channelId}`, {
      headers: {
        "x-access-token": token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error in getChannelByIdRequest", error);
  }
};

export const getPaginatedMessages = async ({
  channelId,
  limit,
  offset,
  token,
}: {
  channelId: string;
  token: string;
  limit: number;
  offset: number;
}) => {
  try {
    const response = await axios.get(`/messages/${channelId}`, {
      headers: {
        "x-access-token": token,
      },
      params: {
        limit: limit || 20,
        offset: offset || 0,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("Error in getPaginatedMessages", error);
  }
};
