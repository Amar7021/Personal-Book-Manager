"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import AuthLayout from "../_components/AuthLayout";
import { useLogin } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { loginSchema } from "../_validations";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { setUser } from "@/redux/slices/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useLogin(dispatch, setUser, router);
  const onSubmit = (values) => {
    console.log({ values });
    mutate(values);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      description="Sign in to continue managing your personal library."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input
              placeholder="Enter Email"
              {...register("email")}
              className={
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            <FieldError>{errors.email?.message}</FieldError>
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className={
                  errors.password
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <FieldError>{errors.password?.message}</FieldError>
          </FieldContent>
        </Field>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing In..." : "Sign In"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
