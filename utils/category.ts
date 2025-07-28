export const categoryNameToId: Record<string, number> = {
  SPORTS: 1,
  LANGUAGE: 2,
  camera: 3,
  VOLUNTEER: 4,
  "SELF-DEV": 5,
  BOOK: 6,
  FESTIVAL: 7,
  MUSIC: 8,
  TRIP: 9,
  WORK: 10,
};

// 라벨 → ID
export const categoryLabelToIdMap: Record<string, number> = {
  스포츠: 1,
  "외국/언어": 2,
  "사진 /영상": 3,
  봉사활동: 4,
  자기계발: 5,
  "독서/글": 6,
  "문화/댄스": 7,
  "음악/악기": 8,
  여행: 9,
  "업종/직무": 10,
};

// 숫자 categoryId → 한글 이름
export const categoryIdLabelMap: Record<number, string> = {
  1: "스포츠",
  2: "외국/언어",
  3: "사진/영상",
  4: "봉사활동",
  5: "자기계발",
  6: "독서/글",
  7: "문화/댄스",
  8: "음악/악기",
  9: "여행",
  10: "업종/직무",
};

export const getCategoryLabelById = (id: number): string =>
  categoryIdLabelMap[id] || "기타";

export const getCategoryId = (label: string) => categoryLabelToIdMap[label];
