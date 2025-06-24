import { View, Text, StyleSheet } from "react-native";
import { MatchingListItem } from "../../../components/MatchingList";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";

const individualData = [
  {
    id: "1",
    title: "주말 풋살 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "주말 사진 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    title: "맛집 탐방 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    title: "사진 찍기 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    title: "사진 찍기 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    title: "사진 찍기 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    title: "사진 찍기 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    title: "사진 찍기 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "9",
    title: "사진 찍기 모임",
    category: "독서/글",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const IndividualTab = () => {
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const handleToggleLike = (item: { id: string }) => {
    setLikedItems((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  const handleItemPress = (item: any) => {
    console.log("Pressed item:", item); // 나중에 navigation 연결도 가능
  };
  return (
    <View style={styles.body}>
      <Text style={styles.contentTitle}>개인 모임 둘러보기</Text>
      <FlatList
        data={individualData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchingListItem
            item={item}
            onPress={handleItemPress}
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
    margin: 15,
    fontSize: 20,
    color: "#333C4A",
  },
});
