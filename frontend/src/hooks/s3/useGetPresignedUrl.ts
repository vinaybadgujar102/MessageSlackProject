import { useQuery } from "@tanstack/react-query";

import { getPreginedUrl } from "@/apis/s3";

import { useAuth } from "../context/useAuth";

export const useGetPresignedUrl = () => {
  const { auth } = useAuth();

  const { isFetching, isError, isSuccess, data, error } = useQuery({
    queryKey: ["getPresignedUrl"],
    queryFn: () => getPreginedUrl({ token: auth?.token || "" }),
  });

  return { isFetching, isError, isSuccess, data, error };
};
