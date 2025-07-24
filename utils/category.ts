// // label(한글) → id(영문)
// export const categoryMap: Record<string, string> = {
//   스포츠: "sports",
//   "외국/언어": "language",
//   댄스: "dance",
//   봉사활동: "volunteer",
//   자기계발: "self-dev",
//   "독서/글": "book",
//   "문화/공연": "festival",
//   "음악/악기": "music",
//   여행: "trip",
//   "업종/직무": "work",
// };

// // id(영문) → label(한글)
// export const categoryLabelMap: Record<string, string> = Object.entries(
//   categoryMap
// ).reduce((acc, [label, id]) => {
//   acc[id] = label;
//   return acc;
// }, {} as Record<string, string>);

// // 유틸 함수 예시
// export const getCategoryId = (label: string) => categoryMap[label] || label;
// export const getCategoryLabel = (id: string) => categoryLabelMap[id] || id;

// 숫자 ID → 문자열 enum 매핑
export const categoryIdToEnumMap: Record<number, string> = {
  1: "SPORTS",
  2: "LANGUAGE",
  3: "DANCE",
  4: "VOLUNTEER",
  5: "SELF_DEV",
  6: "BOOK",
  7: "FESTIVAL",
  8: "MUSIC",
  9: "TRIP",
  10: "WORK",
};

// 라벨 → ID
export const categoryLabelToIdMap: Record<string, number> = {
  스포츠: 1,
  "외국/언어": 2,
  댄스: 3,
  봉사활동: 4,
  자기계발: 5,
  "독서/글": 6,
  "문화/공연": 7,
  "음악/악기": 8,
  여행: 9,
  "업종/직무": 10,
};

export const categoryIdToLabelMap: Record<number, string> = {
  1: "스포츠",
  2: "외국/언어",
  3: "댄스",
  4: "봉사활동",
  5: "자기계발",
  6: "독서/글",
  7: "문화/공연",
  8: "음악/악기",
  9: "여행",
  10: "업종/직무",
};

export const getCategoryLabel = (id: number): string =>
  categoryIdToLabelMap[id] || "기타";

export const getCategoryId = (label: string) => categoryLabelToIdMap[label];
export const getCategoryEnum = (id: number) => categoryIdToEnumMap[id];
