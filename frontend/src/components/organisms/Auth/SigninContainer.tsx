import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignin } from "@/hooks/apis/auth/useSignin";

import { SigninCard, SigninForm } from "./SigninCard";

export const SigninContainer = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState<string>("");
  const [signinForm, setSigninForm] = useState<SigninForm>({
    email: "",
    password: "",
  });

  const { signinMutation, isPending, isSuccess, error } = useSignin();

  const onSigninFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!signinForm.email || !signinForm.password) {
      console.log("please fill all the fields");
      setValidationError("Please fill all the fields");
      return;
    }

    setValidationError("");

    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate]);

  return (
    <SigninCard
      signinForm={signinForm}
      setSigninForm={setSigninForm}
      onSigninFormSubmit={onSigninFormSubmit}
      validationError={validationError}
      isPending={isPending}
      isSuccess={isSuccess}
      error={error}
    />
  );
};
