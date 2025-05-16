import axios from "axios";
import { getAccessToken } from "./auth";

const api = axios.create({
  baseURL: "https://ts-project-management-api-production.up.railway.app",
});

// Interceptor untuk attach Authorization token
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
