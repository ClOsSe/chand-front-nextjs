import axios from "axios";

export const api = axios.create({
  baseURL: "https://chand-api.webinaexpert.workers.dev",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
