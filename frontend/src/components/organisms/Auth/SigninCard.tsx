import { useState } from "react";
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

export const SigninCard = () => {
  const navigate = useNavigate();

  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input
            placeholder="Email"
            required
            type="email"
            onChange={(e) =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
            value={signinForm.email}
            disabled={false}
          />

          <Button type="submit" size="lg" disabled={false}>
            Continue
          </Button>
        </form>

        <Separator className="my-4" />

        <p className="text-s text-muted-foreground mt-4">
          Don't have an account ?{" "}
          <span
            onClick={() => navigate("/auth/signup")}
            className="text-sky-100 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
