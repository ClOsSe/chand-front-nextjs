import { api } from "@/services/api";

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthResponse = {
  message: string;
  user: AuthUser;
};

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/register", payload);

  return data;
}

export async function loginUser(
  payload: LoginPayload
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/login", payload);

  return data;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload
): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>(
    "/api/auth/forgot-password",
    payload
  );

  return data;
}

export async function logoutUser(): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>("/api/auth/logout");

  return data;
}