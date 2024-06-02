import * as SecureStore from 'expo-secure-store';
import axios, { InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://192.168.0.22:8080";

const excludedPaths = ["/login", "/forgot"];

export const http = axios.create({
  baseURL: BASE_URL,
});

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const isExcluded = excludedPaths.includes(config.url || "");
  if (isExcluded) return config;

  const token = SecureStore.getItem("session");

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

http.interceptors.request.use(authInterceptor);
