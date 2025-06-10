/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";

import { signInRequest } from "@/apis/auth";
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useSignin = () => {
  const { toast } = useToast();
  const { setAuth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutate: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response: any) => {
      const userObject = JSON.stringify(response.data);

      localStorage.setItem("user", userObject);
      localStorage.setItem("token", response.data.token);

      setAuth({
        user: response.data,
        token: response.data.token,
        isLoading: false,
      });

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
