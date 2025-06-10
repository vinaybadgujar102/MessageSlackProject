import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export type SignupState = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

export const SignupCard = ({
  signupForm,
  setSignupForm,
  validationError,
  onSignUpFormSubmit,
  isPending,
  isSuccess,
  error,
}: {
  signupForm: SignupState;
  setSignupForm: (form: SignupState) => void;
  validationError: string;
  onSignUpFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
        {validationError && (
          <div className="bg-destructive/15 p-4 rounded-md items-center gap-x-2 flex text-destructive text-sm mt-2">
            <p>{validationError}</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/15 p-4 rounded-md items-center gap-x-2 flex text-destructive text-sm mt-2">
            <p>{error.message}</p>
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-100 p-4 rounded-md items-center gap-x-2 flex text-green-800 text-sm mt-2">
            <p>Signup successful. Redirecting to home page...</p>
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSignUpFormSubmit}>
          <Input
            placeholder="Email"
            required
            type="email"
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            value={signupForm.email}
            disabled={isPending}
          />
          <Input
            placeholder="Username"
            required
            type="text"
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
            value={signupForm.username}
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            type="password"
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            value={signupForm.password}
            disabled={isPending}
          />
          <Input
            placeholder="Confirm Password"
            required
            type="password"
            onChange={(e) =>
              setSignupForm({ ...signupForm, confirmPassword: e.target.value })
            }
            value={signupForm.confirmPassword}
            disabled={isPending}
          />
          <Button type="submit" size="lg" disabled={isPending}>
            Continue
          </Button>
        </form>

        <Separator className="my-4" />

        <p className="text-s text-muted-foreground mt-4">
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/auth/signin")}
            className="text-sky-500 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
