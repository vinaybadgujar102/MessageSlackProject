import { useQuery } from "@tanstack/react-query";

import { getChannelById } from "@/apis/channels";
import { useAuth } from "@/hooks/context/useAuth";

export const useGetChannelById = (channelId: string) => {
  const { auth } = useAuth();

  const { isFetching, isError, error, data } = useQuery({
    queryFn: () => getChannelById({ channelId, token: auth?.token as string }),
    queryKey: [`get-channel-${channelId}`],
  });

  return {
    isFetching,
    isError,
    error,
    data,
  };
};
