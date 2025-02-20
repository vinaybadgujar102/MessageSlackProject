import { useMutation } from "@tanstack/react-query";

import { createWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useCreateWorkspace = () => {
  const { auth } = useAuth();

  const {
    mutate: createWorkspaceMutation,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      createWorkspaceRequest({
        ...data,
        token: auth.token || "",
      }),
    onSuccess: (data) => {
      console.log("Workspace created successfully", data);
    },
    onError: (error) => {
      console.log("Error in creating workspace", error);
    },
  });

  return {
    createWorkspaceMutation,
    isPending,
    isSuccess,
    error,
  };
};
