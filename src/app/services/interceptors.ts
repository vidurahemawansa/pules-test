import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";

export function setupInterceptors(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      // Ensure headers are set securely
      config.headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY as string;
      config.headers["x-api-secret"] = process.env
        .NEXT_PUBLIC_API_SECRET as string;

      return config;
    },
    (error: AxiosError) => {
      console.error("Request Error:", error.message);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      console.error("Response Error:", error.message);
      if (error.response?.status === 401) {
        console.error("Unauthorized, redirecting to login");
      }
      return Promise.reject(error);
    }
  );
}
