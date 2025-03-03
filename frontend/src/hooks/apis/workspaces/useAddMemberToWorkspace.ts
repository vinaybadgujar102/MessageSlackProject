import { useMutation } from "@tanstack/react-query";

import { addMemberToWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useAddMemberToWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();

  const {
    mutate: addMemberToWorkspace,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: () =>
      addMemberToWorkspaceRequest({
        workspaceId,
        token: auth?.token as string,
      }),
    onSuccess: () => {
      console.log("member added to workspace");
    },
    onError: (error) => {
      console.log("error in add member to workspace", error);
    },
  });

  return { addMemberToWorkspace, isPending, isSuccess, error };
};
