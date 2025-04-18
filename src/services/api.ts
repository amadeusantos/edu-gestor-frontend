import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({ baseURL: import.meta.env.VITE_URL_API });

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
    }
  }
);

export const request = {
  get: async <R = unknown>(uri: string) => {
    return (await api.get<R>(uri)).data;
  },

  post: async <R = unknown>(uri: string, body?: unknown) => {
    return (await api.post<R>(uri, body)).data;
  },

  put: async <R = unknown>(uri: string, body?: unknown) => {
    return (await api.put<R>(uri, body)).data;
  },

  patch: async <R = unknown>(uri: string, body?: unknown) => {
    return (await api.patch<R>(uri, body)).data;
  },

  delete: async (uri: string) => {
    await api.delete<void>(uri);
  },
};
