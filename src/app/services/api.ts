import axios, { AxiosInstance } from "axios";
import { setupInterceptors } from "./interceptors";

const api: AxiosInstance = axios.create({
  baseURL: "/api",
});

setupInterceptors(api);

export default api;
