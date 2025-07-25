import { View, Text, StyleSheet } from "react-native";
import {
  MatchingItem,
  MatchingListItem,
} from "../../../components/MatchingList";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import SortButtons from "../../../components/SortButtons";
import { Club } from "../../../App";
import { api } from "../../../utils/api";
import { categoryNameToId } from "../../../utils/category";

// API 응답 타입 정의
type ClubResponse = {
  data: Club[];
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
};

const CheonanTab = ({ categoryId }: { categoryId: number }) => {
  // 불러온 동아리 저장
  const [clubList, setClubList] = useState<Club[]>([]);

  // 천안 동아리 불러오기
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await api.get<ClubResponse>(
          `/api/clubs?categoryId=${categoryId}&campusVal=CHEONAN`
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

  // 동아리 모임 좋아요 상태 저장
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
    category: categoryNameToId[club.category.toUpperCase()] ?? 0,
    description: club.clubDesc,
    memberCount: club.memberCount,
    imageUrl: require("../../../assets/images/book.png"),
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

export default CheonanTab;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  contentTitle: {
    margin: 15,
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#333C4A",
  },
});
