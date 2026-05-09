import { mutationOptions } from "@tanstack/react-query";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "./auth.service";

export const authMutationKeys = {
  register: ["auth", "register"] as const,
  login: ["auth", "login"] as const,
  forgotPassword: ["auth", "forgot-password"] as const,
  logout: ["auth", "logout"] as const,
};

export const registerMutationOptions = mutationOptions({
  mutationKey: authMutationKeys.register,
  mutationFn: registerUser,
});

export const loginMutationOptions = mutationOptions({
  mutationKey: authMutationKeys.login,
  mutationFn: loginUser,
});

export const forgotPasswordMutationOptions = mutationOptions({
  mutationKey: authMutationKeys.forgotPassword,
  mutationFn: forgotPassword,
});

export const logoutMutationOptions = mutationOptions({
  mutationKey: authMutationKeys.logout,
  mutationFn: logoutUser,
});