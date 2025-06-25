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
