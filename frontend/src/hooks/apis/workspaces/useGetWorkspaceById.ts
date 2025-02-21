/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";

import { fetchWorkspaceDetailsRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useGetWorkspaceById = (workspaceId: string) => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    error,
    data: workspace,
  } = useQuery({
    queryKey: [`workspace-${workspaceId}`],
    queryFn: () =>
      fetchWorkspaceDetailsRequest({
        workspaceId,
        token: auth?.token || "",
      }),
    staleTime: 10000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspace,
  };
};
