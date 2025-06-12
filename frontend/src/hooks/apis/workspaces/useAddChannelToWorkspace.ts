import { useMutation } from "@tanstack/react-query";

import { addChannelToWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useAddChannelToWorkspace = () => {
  const { auth } = useAuth();
  const {
    mutateAsync: addChannelToWorkspaceMutation,
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
      console.log("Channel added to workspace", data);
    },
    onError: (error) => {
      console.log("Error adding channel to workspace", error);
    },
  });

  return {
    addChannelToWorkspaceMutation,
    isPending,
    isSuccess,
    error,
  };
};
