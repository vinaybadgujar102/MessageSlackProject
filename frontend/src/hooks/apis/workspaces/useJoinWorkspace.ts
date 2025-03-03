import { useMutation } from "@tanstack/react-query";

import { joinWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useJoinWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();

  const {
    mutate: joinWorkspaceMutation,
    isPending,
    isSuccess,
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
      console.log("Error in join workspace", error);
    },
  });

  return { joinWorkspaceMutation, isPending, isSuccess, error };
};
