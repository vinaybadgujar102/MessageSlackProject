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

export interface SigninForm {
  email: string;
  password: string;
}

export const SigninCard = ({
  signinForm,
  setSigninForm,
  onSigninFormSubmit,
  validationError,
  error,
  isSuccess,
  isPending,
}: {
  signinForm: SigninForm;
  setSigninForm: (form: SigninForm) => void;
  onSigninFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  validationError: string;
  error: Error | null;
  isSuccess: boolean;
  isPending: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Signin</CardTitle>
        <CardDescription>Signin to your account to get started</CardDescription>

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
        <form className="space-y-4" onSubmit={onSigninFormSubmit}>
          <Input
            placeholder="Email"
            required
            type="email"
            onChange={(e) =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
            value={signinForm.email}
            disabled={isPending}
          />
          <Input
            placeholder="Password"
            required
            type="password"
            onChange={(e) =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
            value={signinForm.password}
            disabled={isPending}
          />

          <Button type="submit" size="lg" disabled={isPending}>
            Continue
          </Button>
        </form>

        <Separator className="my-4" />

        <p className="text-s text-muted-foreground mt-4">
          Don't have an account ?{" "}
          <span
            onClick={() => navigate("/auth/signup")}
            className="text-sky-500 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
