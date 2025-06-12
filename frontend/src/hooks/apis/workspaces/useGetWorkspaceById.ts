import { useQuery } from "@tanstack/react-query";

import { fetchWorkspaceDetailsRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";

export const useGetWorkspaceById = (id: string) => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    error,
    data: workspace,
  } = useQuery({
    queryFn: () =>
      fetchWorkspaceDetailsRequest({
        workspaceId: id,
        token: auth?.token as string,
      }),
    queryKey: [`fetchWorkspaceById-${id}`],
    staleTime: 10000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspace,
  };
};
