/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";

import { signInRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";

export const useSignin = () => {
  const { toast } = useToast();

  const {
    isPending,
    isSuccess,
    error,
    mutate: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (data: any) => {
      console.log(data);
      toast({
        title: "Signin successful",
        description: "You have successfully signed in",
      });
    },
    onError: (error: any) => {
      console.log("Failed to signin ", error);
      toast({
        title: "Signin failed",
        description: "Please try again",
      });
    },
  });

  return {
    signinMutation,
    isPending,
    isSuccess,
    error,
  };
};
