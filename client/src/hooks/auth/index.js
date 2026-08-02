"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "@/services/auth.service";

export const useLogin = (options = {}) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};
export const useRegister = (options = {}) => {
  return useMutation({
    mutationFn: register,
    ...options,
  });
};
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });
};

export const useLogout = (options = {}) => {
  return useMutation({
    mutationFn: logout,
    ...options,
  });
};
