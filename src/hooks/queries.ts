import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "../apis/auth";
import { LoginFormValues } from "../types/auth";
import store from "../store";

// Auth API hooks using React Query

/**
 * Login mutation hook
 * Handles user authentication
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: (body: LoginFormValues) => authService.login(body),
  });
};

/**
 * Register mutation hook
 * Handles user registration
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: (body: FormData) => authService.register(body),
  });
};
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getUser(),
    retry: false, // Don't retry if unauthorized
  });
};
