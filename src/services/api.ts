import axios from "axios";
import { defaultLocale, isLocale } from "@/config/i18n";
import { normalizeApiError } from "./api-error";

export const api = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseURL: "",
  withCredentials: true,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let isRedirectingToLogin = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeApiError(error);

    if (
      normalized.status === 401 &&
      error.config?.url === "/api/prices/latest" &&
      typeof window !== "undefined" &&
      !isRedirectingToLogin
    ) {
      isRedirectingToLogin = true;
      const pathLocale = window.location.pathname.split("/")[1];
      const locale = isLocale(pathLocale) ? pathLocale : defaultLocale;

      // The API response has cleared the HttpOnly cookie. Reload to also
      // discard cached protected pages and query data from the old session.
      window.location.replace(`/${locale}/login`);
    }

    return Promise.reject(normalized);
  }
);
