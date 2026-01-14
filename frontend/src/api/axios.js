import axios from "axios";
import { useLoading } from "../context/LoadingContext";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

let setLoading;

export const injectLoader = (_setLoading) => {
  setLoading = _setLoading;
};

// Request interceptor
api.interceptors.request.use(
  config => {
    setLoading?.(true);

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    setLoading?.(false);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    setLoading?.(false);
    return response;
  },
  error => {
    setLoading?.(false);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
