import axios from "axios";
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(normalizeApiError(error));
  }
);
