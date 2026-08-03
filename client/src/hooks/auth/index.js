"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "@/services/auth.service";
import { toast } from "sonner";

export const useLogin = (dispatch, setUser, router) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log({ data })
      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        router.replace("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};
export const useRegister = (dispatch, setUser, router) => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setUser(data.user));
        toast.success(data.message);
        router.replace("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });
};

export const useLogout = (dispatch, clearUser, router) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(clearUser());
        toast.success(data.message);
        router.replace("/login");
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    }
  });
};
