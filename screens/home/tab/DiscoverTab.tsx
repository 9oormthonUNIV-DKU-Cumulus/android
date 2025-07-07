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

const firstRow = [
  { label: "스포츠", icon: require("../../../assets/images/sport.png") },
  {
    label: "외국/언어",
    icon: require("../../../assets/images/language.png"),
  },
  { label: "댄스", icon: require("../../../assets/images/dance.png") },
  {
    label: "봉사활동",
    icon: require("../../../assets/images/volunteer.png"),
  },
  { label: "자기계발", icon: require("../../../assets/images/goal.png") },
];

const secondRow = [
  { label: "독서/글", icon: require("../../../assets/images/book.png") },
  {
    label: "문화/댄스",
    icon: require("../../../assets/images/dance.png"),
  },
  { label: "음악/악기", icon: require("../../../assets/images/song.png") },
  { label: "여행", icon: require("../../../assets/images/trip.png") },
  { label: "업종/직무", icon: require("../../../assets/images/work.png") },
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
        <Text style={{ color: "#5498FF" }}>단웅</Text>님께 추천하는 모임
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
  container: { backgroundColor: "#FAFAFA" },

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
