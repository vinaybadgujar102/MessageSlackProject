import { useMutation, useQueryClient } from "@tanstack/react-query";

import { resetWorkspaceJoinCodeRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useResetJoinCode = (workspaceId: string) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutateAsync: resetJoinCodeMutation,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: () =>
      resetWorkspaceJoinCodeRequest({ workspaceId, token: auth?.token || "" }),
    onSuccess: () => {
      console.log("Join code reset successfully");
      queryClient.invalidateQueries({
        queryKey: [`fetchWorkspaceById-${workspaceId}`],
      });
    },
    onError: (error) => {
      console.log("Error in resetting join code", error);
    },
  });

  return {
    resetJoinCodeMutation,
    isSuccess,
    isPending,
    error,
  };
};
