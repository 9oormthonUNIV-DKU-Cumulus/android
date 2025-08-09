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

// 특정 동아리 삭제 (동아리 리더 권한 필요)
export const deleteClub = (id: number) => {
  return api.delete(`/api/club/${id}`);
};

// 특정 동아리 상세내용 수정 (동아리 리더 권한 필요)
export const updateClub = (id: number, data: any) => {
  return api.patch(`/api/club/${id}`, data);
  
// 특정 모임 수정 (모임 주최자 권한 필요)
export const updateActivity = (id: number, data: any) => {
  return api.patch(`/api/activity/${id}`, data);
};

// 동아리 가입 신청
export const applyToClub = (clubId: number, token: string) => {
  return api.post(`/api/club/${clubId}/apply`, null, { // body는 없음(null)
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
