import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignup } from "@/hooks/apis/auth/useSignup";

import { SignupCard, SignupState } from "./SignupCard";

export const SignupContainer = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState<SignupState>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [validationError, setValidationError] = useState("");

  const { isPending, isSuccess, error, signupMutation } = useSignup();

  async function onSignUpFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword ||
      !signupForm.username
    ) {
      console.error("Please fill all the fields");
      setValidationError("Please fill all the fields");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      console.error("Passwords do not match");
      setValidationError("Passwords do not match");
      return;
    }

    setValidationError("");

    await signupMutation({
      email: signupForm.email,
      password: signupForm.password,
      username: signupForm.username,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <SignupCard
        isPending={isPending}
        isSuccess={isSuccess}
        error={error}
        signupForm={signupForm}
        setSignupForm={setSignupForm}
        validationError={validationError}
        onSignUpFormSubmit={onSignUpFormSubmit}
      />
    </div>
  );
};
