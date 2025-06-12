import { useMutation } from "@tanstack/react-query";

import { joinWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useJoinWorkspaceRequest = (workspaceId: string) => {
  const { auth } = useAuth();
  const {
    mutateAsync: joinWorkspaceMutation,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: (joinCode: string) =>
      joinWorkspaceRequest({
        workspaceId,
        joinCode,
        token: auth?.token as string,
      }),
    onSuccess: () => {
      console.log("Workspace joined successfully");
    },
    onError: (error) => {
      console.log("Error in joining workspace", error);
    },
  });

  return {
    joinWorkspaceMutation,
    isSuccess,
    isPending,
    error,
  };
};
