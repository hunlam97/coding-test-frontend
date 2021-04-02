import axios, { AxiosInstance } from "axios";

export const restConnector: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});
