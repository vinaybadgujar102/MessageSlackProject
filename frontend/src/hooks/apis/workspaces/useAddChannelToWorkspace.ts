import { useMutation } from "@tanstack/react-query";

import { addChannelToWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
export const useAddChannelToWorkspace = () => {
  const { auth } = useAuth();

  const {
    mutateAsync: addChannelToWorkspace,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      workspaceId,
      channelName,
    }: {
      workspaceId: string;
      channelName: string;
    }) =>
      addChannelToWorkspaceRequest({
        workspaceId,
        channelName,
        token: auth?.token as string,
      }),
    onSuccess: (data) => {
      console.log("data in add channel to workspace", data);
    },
    onError: (error) => {
      console.log("error in add channel to workspace", error);
    },
  });

  return { addChannelToWorkspace, isPending, isSuccess, error };
};
