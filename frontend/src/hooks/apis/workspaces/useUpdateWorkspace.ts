import { useMutation } from "@tanstack/react-query";

import { updateWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useUpdateWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();

  const {
    mutate: updateWorkspace,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ name }: { name: string }) =>
      updateWorkspaceRequest({
        workspaceId,
        name,
        token: auth?.user?.token,
      }),
    onSuccess: () => {
      console.log("workspace updated successfully");
    },
    onError: (error) => {
      console.log("error in updating workspace", error);
    },
  });

  return { updateWorkspace, isPending, error, isSuccess };
};
