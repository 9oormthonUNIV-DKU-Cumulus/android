// utils/api.ts
import axios from "axios";

export const api = axios.create({
  // 백엔드 URL (EC2 퍼블릭 IP + 포트)
  baseURL: "http://3.38.46.60:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 7000,          // 필요하면 조정
});

// 특정 모임 삭제 (모임 주최자 권한 필요)
export const deleteActivity = (id: number, clubId: number) => {
  return api.delete(`/api/activity/${id}`, { params: { clubId } });
};

// 특정 모임 수정 (모임 주최자 권한 필요)
export const updateActivity = (id: number, data: any) => {
  return api.patch(`/api/activity/${id}`, data);
};
