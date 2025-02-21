import { useMutation } from "@tanstack/react-query";

import { deleteWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useDeleteWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();

  const {
    mutate: deleteWorkspace,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: () =>
      deleteWorkspaceRequest({
        workspaceId,
        token: auth?.user?.token,
      }),
    onSuccess: () => {
      console.log("workspace deleted successfully");
    },
    onError: (error) => {
      console.log("error in deleting workspace", error);
    },
  });

  return { deleteWorkspace, isPending, error, isSuccess };
};
