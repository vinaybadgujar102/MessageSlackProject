import { useMutation } from "@tanstack/react-query";

import { updateWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useUpdateWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateWorkspaceMutation,
  } = useMutation({
    mutationFn: (name: string) =>
      updateWorkspaceRequest({
        workspaceId,
        name,
        token: auth?.token as string,
      }),
    onSuccess: () => {
      console.log("Workspace updated successfully");
    },
    onError: (error) => {
      console.log("Error in updating workspace", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateWorkspaceMutation,
  };
};
