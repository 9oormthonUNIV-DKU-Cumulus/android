import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import {
  MatchingItem,
  MatchingListItem,
} from "../../../components/MatchingList";
import { useState } from "react";

const screenWidth = Dimensions.get("window").width;

const recommendedData: MatchingItem[] = [
  {
    id: "1",
    title: "런닝 동아리",
    category: "스포츠",
    description: "수업 끝나고 7시부터 9시까지",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity1.png"),
  },
  {
    id: "2",
    title: "밴드 동아리",
    category: "스포츠",
    description: "금요일 6시부터 자유롭게",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity2.png"),
  },
  {
    id: "3",
    title: "댄스 동아리",
    category: "스포츠",
    description: "주말에 모임",
    member: "45",
    // imageUrl: "https://via.placeholder.com/150",
    imageUrl: require("../../../assets/mockImg/activity3.png"),
  },
];

const firstRow = [
  { id: 1, label: "스포츠", icon: require("../../../assets/images/sport.png") },
  {
    id: 2,
    label: "외국/언어",
    icon: require("../../../assets/images/language.png"),
  },
  { id: 3, label: "댄스", icon: require("../../../assets/images/dance.png") },
  {
    id: 4,
    label: "봉사활동",
    icon: require("../../../assets/images/volunteer.png"),
  },
  {
    id: 5,
    label: "자기계발",
    icon: require("../../../assets/images/goal.png"),
  },
];

const secondRow = [
  { id: 6, label: "독서/글", icon: require("../../../assets/images/book.png") },
  {
    id: 7,
    label: "문화/댄스",
    icon: require("../../../assets/images/dance.png"),
  },
  {
    id: 8,
    label: "음악/악기",
    icon: require("../../../assets/images/song.png"),
  },
  { id: 9, label: "여행", icon: require("../../../assets/images/trip.png") },
  {
    id: 10,
    label: "업종/직무",
    icon: require("../../../assets/images/work.png"),
  },
];

const DiscoverTab = ({ navigation }) => {
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const handleToggleLike = (item: MatchingItem) => {
    setLikedItems((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  const renderItem = ({ item }: { item: MatchingItem }) => (
    <MatchingListItem
      item={item}
      likedItems={likedItems}
      onToggleLike={handleToggleLike}
    />
  );

  const renderHeader = () => (
    <View>
      {/* 카테고리 */}
      <View style={styles.categories}>
        <View style={styles.row}>
          {firstRow.map((item) => (
            <View style={styles.iconContainer} key={item.label}>
              <TouchableOpacity
                style={styles.iconWrap}
                onPress={() =>
                  navigation.navigate("CategoryListScreen", {
                    label: item.label,
                    categoryId: item.id,
                  })
                }
              >
                <Image source={item.icon} style={styles.iconImage} />
              </TouchableOpacity>
              <Text style={styles.categoryTitle}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          {secondRow.map((item) => (
            <View style={styles.iconContainer} key={item.label}>
              <TouchableOpacity
                style={styles.iconWrap}
                onPress={() =>
                  navigation.navigate("CategoryListScreen", {
                    label: item.label,
                    categoryId: item.id,
                  })
                }
              >
                <Image source={item.icon} style={styles.iconImage} />
              </TouchableOpacity>
              <Text style={styles.categoryTitle}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      {/* 추천 타이틀 */}
      <Text style={styles.recommendTitle}>
        <Text style={{ color: "#5498FF" }}>단웅</Text>님이 참여중인 동아리
      </Text>
    </View>
  );

  return (
    <FlatList
      data={recommendedData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default DiscoverTab;

const styles = StyleSheet.create({
  categories: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 15,
    flexWrap: "wrap",
    marginLeft: 15,
  },
  iconContainer: {
    alignItems: "center",
    width: screenWidth / 5.5,
  },
  iconWrap: {
    backgroundColor: "#F5F5F5",
    padding: 13,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth / 7,
    height: screenWidth / 7,
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  categoryTitle: { color: "#37404C", fontSize: 12 },
  content: {
    marginTop: 30,
    alignItems: "center",
  },
  divider: {
    height: 8,
    backgroundColor: "#F5F5F5",
    marginVertical: 12,
  },
  recommendTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 28,
  },
});
