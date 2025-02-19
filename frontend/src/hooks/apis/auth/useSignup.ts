/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";

export const useSignup = () => {
  const { toast } = useToast();

  const {
    isPending,
    isSuccess,
    error,
    mutate: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data: any) => {
      console.log(data);
      toast({
        title: "Signup successful",
        description: "You have successfully signed up",
      });
    },
    onError: (error: any) => {
      console.log("Failed to signup ", error);
      toast({
        title: "Signup failed",
        description: "Please try again",
      });
    },
  });

  return {
    signupMutation,
    isPending,
    isSuccess,
    error,
  };
};
