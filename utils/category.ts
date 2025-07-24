// label(한글) → id(영문)
export const categoryMap: Record<string, string> = {
  스포츠: "sports",
  "외국/언어": "language",
  댄스: "dance",
  봉사활동: "volunteer",
  자기계발: "self-dev",
  "독서/글": "book",
  "문화/공연": "festival",
  "음악/악기": "music",
  여행: "trip",
  "업종/직무": "work",
};

// id(영문) → label(한글)
export const categoryLabelMap: Record<string, string> = Object.entries(
  categoryMap
).reduce((acc, [label, id]) => {
  acc[id] = label;
  return acc;
}, {} as Record<string, string>);

// 유틸 함수 예시
export const getCategoryId = (label: string) => categoryMap[label] || label;
export const getCategoryLabel = (id: string) => categoryLabelMap[id] || id;

// 전체 카테고리 정보 (한글 라벨 → { id, eng })
// export const categoryMap: Record<string, { id: number; eng: string }> = {
//   스포츠: { id: 1, eng: "sports" },
//   "외국/언어": { id: 2, eng: "language" },
//   댄스: { id: 3, eng: "dance" },
//   봉사활동: { id: 4, eng: "volunteer" },
//   자기계발: { id: 5, eng: "self-dev" },
//   "독서/글": { id: 6, eng: "book" },
//   "문화/공연": { id: 7, eng: "festival" },
//   "음악/악기": { id: 8, eng: "music" },
//   여행: { id: 9, eng: "trip" },
//   "업종/직무": { id: 10, eng: "work" },
// };

// // 카테고리 한글 → 숫자 ID
// export const getCategoryId = (label: string): number | undefined =>
//   categoryMap[label]?.id;

// // 카테고리 한글 → 영문 ID
// export const getCategoryEng = (label: string): string | undefined =>
//   categoryMap[label]?.eng;

// // 영문 ID → 한글 라벨
// export const getCategoryLabelFromEng = (eng: string): string | undefined => {
//   const found = Object.entries(categoryMap).find(
//     ([, value]) => value.eng === eng
//   );
//   return found?.[0];
// };
