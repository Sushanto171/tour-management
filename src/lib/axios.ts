import { config } from "@/config";
import axios, { AxiosError } from "axios";
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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
