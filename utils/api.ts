// utils/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  // 백엔드 URL (EC2 퍼블릭 IP + 포트)
  baseURL: "http://3.38.46.60:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 7000, // 필요하면 조정
});

api.interceptors.request.use(
  (config) => {
    return AsyncStorage.getItem("accessToken").then((token) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  },
  (error) => Promise.reject(error)
);
