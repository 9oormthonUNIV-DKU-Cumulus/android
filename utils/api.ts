// utils/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestHeaders } from "axios";

export const api = axios.create({
  // 백엔드 URL (EC2 퍼블릭 IP + 포트)
  baseURL: "http://3.38.46.60:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 7000, // 필요하면 조정
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const createActivity = async (data: any) => {
  const token = await AsyncStorage.getItem("accessToken");

  console.log("📤 [createActivity] 요청 보냄");
  console.log("🔐 token:", token);
  console.log("📦 data:", data);

  try {
    const response = await api.post("/api/activity", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ 성공 응답:", response.data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log("❌ 서버 응답 에러");
      console.log("🔻 status:", error.response.status);
      console.log("🔻 data:", error.response.data);
    } else if (error.request) {
      console.log("❌ 요청은 보냈지만 응답 없음");
      console.log("🔻 request:", error.request);
    } else {
      console.log("❌ 요청 설정 중 에러:", error.message);
    }
    throw error; // 상위에서 catch 할 수 있도록 다시 던짐
  }
};

// 특정 모임 삭제 (모임 주최자 권한 필요)
export const deleteActivity = (id: number, clubId: number) => {
  return api.delete(`/api/activity/${id}`, { params: { clubId } });
};

// 특정 동아리 삭제 (동아리 리더 권한 필요)
export const deleteClub = (id: number) => {
  return api.delete(`/api/club/${id}`);
};

// 특정 동아리 상세내용 수정 (동아리 리더 권한 필요)
export const updateClub = (id: number, data: any) => {
  return api.patch(`/api/club/${id}`, data);
};

// 특정 모임 수정 (모임 주최자 권한 필요)
export const updateActivity = (id: number, data: any) => {
  return api.patch(`/api/activity/${id}`, data);
};

// 동아리내 모임 목록 조회
export const getAllActivities = (clubId: number) => {
  return api.get(`/api/activities/${clubId}`);
};

// 특정모임 상세조회
export const getActivityById = (id: number) => {
  return api.get(`/api/activity/${id}`);
};
