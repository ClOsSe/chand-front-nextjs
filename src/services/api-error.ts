import axios, { AxiosError } from "axios";

export type ApiErrorResponse = {
  message?: string;
  errors?: unknown;
  status?: number;
  error?: string;
};

export class AppError extends Error {
  status?: number;
  code?: string;
  errors?: unknown;

  constructor(params: {
    message: string;
    status?: number;
    code?: string;
    errors?: unknown;
  }) {
    super(params.message);
    this.name = "AppError";
    this.status = params.status;
    this.code = params.code;
    this.errors = params.errors;
  }
}

const serverMessageToKey: Record<string, string> = {
  "Unauthorized": "errors.unauthorized",
  "Invalid or expired token": "errors.invalidOrExpiredToken",
  "Invalid email or password": "errors.invalidEmailOrPassword",
  "User already exists": "errors.userAlreadyExists",
  "Invalid input": "errors.invalidInput",
  "Invalid email": "errors.invalidEmail",
  "Failed to fetch latest prices": "errors.priceServiceFailed",
  "Something went wrong while fetching latest prices": "errors.serverError",
};

export function getErrorTranslationKey(message?: string, status?: number) {
  if (message && serverMessageToKey[message]) {
    return serverMessageToKey[message];
  }

  if (status === 401) return "errors.unauthorized";
  if (status === 403) return "errors.forbidden";
  if (status === 404) return "errors.notFound";
  if (status === 409) return "errors.conflict";
  if (status && status >= 500) return "errors.serverError";

  return "errors.unknown";
}

export function normalizeApiError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (axiosError.code === "ERR_NETWORK") {
      return new AppError({
        message: "errors.network",
        code: axiosError.code,
      });
    }

    if (axiosError.code === "ECONNABORTED") {
      return new AppError({
        message: "errors.timeout",
        code: axiosError.code,
      });
    }

    const status = axiosError.response?.status;
    const data = axiosError.response?.data;
    const backendMessage = data?.message;

    return new AppError({
      message: getErrorTranslationKey(backendMessage, status),
      status,
      code: axiosError.code,
      errors: data?.errors,
    });
  }

  if (error instanceof Error) {
    return new AppError({
      message: error.message || "errors.unknown",
    });
  }

  return new AppError({
    message: "errors.unknown",
  });
}

export function getDisplayErrorMessage(
  error: unknown,
  t: (key: string) => string
) {
  const normalized = error instanceof AppError ? error : normalizeApiError(error);

  try {
    return t(normalized.message);
  } catch {
    return normalized.message;
  }
}