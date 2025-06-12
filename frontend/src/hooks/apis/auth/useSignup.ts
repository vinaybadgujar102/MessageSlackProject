import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";

export const useSignup = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      console.log("Scuccessfuilly signed up", data);
      toast({
        title: "Successfully signed up",
        description:
          "You will be redirected to the login page in a few seconds",
        type: "foreground",
      });
    },
    onError: (error) => {
      console.error("Failed to sign up", error);
      toast({
        title: "Failed to sign up",
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
    signupMutation,
  };
};
