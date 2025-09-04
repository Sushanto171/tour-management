import { config } from "@/config";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };
    if (
      error.response?.status === 500 &&
      ((error.response.data as object as { message: string })
        .message as string) === "jwt expired"
    ) {
      if (isRefreshing && !originalRequest._retry) {
        return new Promise((resolve, reject) =>
          pendingQueue.push({ resolve, reject })
        )
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await axiosInstance.post("/auth/refresh-token");
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (error) {
      
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
