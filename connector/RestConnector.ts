import axios, { AxiosInstance } from "axios";

export const restConnector: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
