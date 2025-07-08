import { View, Text, StyleSheet } from "react-native";
import { MatchingListItem } from "../../../components/MatchingList";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import SortButtons from "../../../components/SortButtons";

// 목업 데이터 (api 연결 시 삭제)
const individualData = [
  {
    id: "1",
    title: "주말 풋살 모임",
    category: "스포츠",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity1.png"),
  },
  {
    id: "2",
    title: "골프 모임",
    category: "스포츠",
    description: "금요일 6시부터 자유롭게",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity2.png"),
  },
  {
    id: "3",
    title: "단국대 축구 모임",
    category: "스포츠",
    description: "주말에 모임",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity3.png"),
  },
  {
    id: "4",
    title: "테니스 모임",
    category: "스포츠",
    description: "주말 / 학교 테니스장",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity4.png"),
  },
  {
    id: "5",
    title: "단국대 헬스 모임",
    category: "스포츠",
    description: "학교 근처 헬스장에 모임",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity5.png"),
  },
  {
    id: "6",
    title: "필라테스 모임",
    category: "스포츠",
    description: "학교 앞 필라테스 장",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity6.png"),
  },
  {
    id: "7",
    title: "단국대 조깅 모임",
    category: "스포츠",
    description: "금요일 7시 조깅",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity7.png"),
  },
];

const IndividualTab = ({
  categoryId,
}: // sort,
{
  categoryId: string;
  // sort: string;
}) => {
  // 개인 모임 상태 저장
  // const [individualData, setIndividualData] = useState<any[]>([]);

  // 모임 좋아요 상태 저장
  const [likedItems, setLikedItems] = useState<string[]>([]);

  // 개인 모임 api 호출
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // json-server로 api 테스트
  //       const response = await fetch(
  //         `http://10.0.2.2:3001/activities?category=${categoryId}`
  //       );
  //       const json = await response.json();
  //       setIndividualData(json);
  //     } catch (error) {
  //       console.error("데이터 불러오기 실패: ", error);
  //     }
  //   };

  //   fetchData();
  // }, [categoryId]);

  // 좋아요 버튼 액션
  const handleToggleLike = (item: { id: string }) => {
    setLikedItems((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  return (
    <View style={styles.body}>
      <Text style={styles.contentTitle}>개인 모임 둘러보기</Text>
      <SortButtons />
      <FlatList
        data={individualData}
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

export default IndividualTab;

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
