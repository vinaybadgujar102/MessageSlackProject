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
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response) => {
      console.log("Successfully signed in", response);

      const userObject = JSON.stringify(response.data);

      localStorage.setItem("user", userObject);
      localStorage.setItem("token", response.data.token);

      setAuth({
        token: response.data.token,
        user: response.data,
        isLoading: false,
      });

      toast({
        title: "Successfully signed in",
        description: "You will be redirected to the home page in a few seconds",
        type: "foreground",
      });
    },
    onError: (error) => {
      console.error("Failed to sign in", error);
      toast({
        title: "Failed to sign in",
        description: error.message,
        type: "foreground",
        variant: "destructive",
      });
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signinMutation,
  };
};
