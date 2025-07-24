import { View, Text, StyleSheet } from "react-native";
import {
  MatchingItem,
  MatchingListItem,
} from "../../../components/MatchingList";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import SortButtons from "../../../components/SortButtons";
import { api } from "../../../utils/api";
import type { Club } from "../../../App";

// 목업 데이터 (api 연결 시 삭제)
// const individualData = [
// {
//   id: "1",
//   title: "주말 풋살 모임",
//   category: "스포츠",
//   description: "수업 끝나고 7시부터 9시까지",
//   member: "45",
//   // imageUrl: "https://via.placeholder.com/150",
//   imageUrl: require("../../../assets/mockImg/activity1.png"),
// },
// {
//   id: "2",
//   title: "골프 모임",
//   category: "스포츠",
//   description: "금요일 6시부터 자유롭게",
//   member: "45",
//   // imageUrl: "https://via.placeholder.com/150",
//   imageUrl: require("../../../assets/mockImg/activity2.png"),
// },
// {
//   id: "3",
//   title: "단국대 축구 모임",
//   category: "스포츠",
//   description: "주말에 모임",
//   member: "45",
//   // imageUrl: "https://via.placeholder.com/150",
//   imageUrl: require("../../../assets/mockImg/activity3.png"),
// },
// {
//   id: "4",
//   title: "테니스 모임",
//   category: "스포츠",
//   description: "주말 / 학교 테니스장",
//   member: "45",
//   // imageUrl: "https://via.placeholder.com/150",
//   imageUrl: require("../../../assets/mockImg/activity4.png"),
// },
// {
//   id: "5",
//   title: "단국대 헬스 모임",
//   category: "스포츠",
//   description: "학교 근처 헬스장에 모임",
//   member: "45",
//   // imageUrl: "https://via.placeholder.com/150",
//   imageUrl: require("../../../assets/mockImg/activity5.png"),
// },
// {
//   id: "6",
//   title: "필라테스 모임",
//   category: "스포츠",
//   description: "학교 앞 필라테스 장",
//   member: "45",
//   // imageUrl: "https://via.placeholder.com/150",
//   imageUrl: require("../../../assets/mockImg/activity6.png"),
// },
// {
//   id: "7",
//   title: "단국대 조깅 모임",
//   category: "스포츠",
//   description: "금요일 7시 조깅",
//   member: "45",
//   // imageUrl: "https://via.placeholder.com/150",
//   imageUrl: require("../../../assets/mockImg/activity7.png"),
// },
// ];

// API 응답 타입 정의
type ClubResponse = {
  data: Club[];
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
};

const JukjeonTab = ({ categoryId }: { categoryId: number }) => {
  // 불러온 동아리 저장
  const [clubList, setClubList] = useState<Club[]>([]);

  // 죽전 동아리 불러오기
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await api.get<ClubResponse>(
          `/api/clubs?categoryId=${categoryId}&campus=JUKJEON`
        );

        const clubs = res.data?.data;

        if (Array.isArray(clubs)) {
          setClubList(clubs);
        } else {
          console.warn("동아리 목록 배열이 아닙니다", clubs);
          setClubList([]);
        }
        // console.log(res);
      } catch (err) {
        console.error("동아리 목록 불러오기 실패", err);
        setClubList([]);
      }
    };
    fetchClubs();
  }, [categoryId]);

  // 모임 좋아요 상태 저장
  const [likedItems, setLikedItems] = useState<string[]>([]);

  // 좋아요 버튼 액션
  const handleToggleLike = (item: { id: string }) => {
    setLikedItems((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  // MatchingItem 형식으로 변환
  const mappedClubList: MatchingItem[] = clubList.map((club) => ({
    id: club.id.toString(),
    title: club.clubName,
    category: club.category.toString(),
    description: club.clubDesc,
    member: "0", // 멤버 수 정보 없을 경우 기본값
    imageUrl: require("../../../assets/images/camera.png"),
  }));

  return (
    <View style={styles.body}>
      <Text style={styles.contentTitle}>둘러보기</Text>
      <SortButtons />
      <FlatList
        data={mappedClubList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchingListItem
            item={item}
            likedItems={likedItems}
            onToggleLike={handleToggleLike}
          />
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default JukjeonTab;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  contentTitle: {
    fontWeight: "bold",
    margin: 15,
    marginLeft: 20,
    marginTop: 20,
    fontSize: 17,
    color: "#333C4A",
  },
});
