import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { HomeStackParamList } from "../../App";

export default function NoticeTabContent() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // 게시글 목업
  const mockPosts = [
    {
      id: "1",
      author: "홍길동",
      date: "2025-07-19",
      title: "동아리 모임 관련 공지입니다",
      content:
        "동아리 MT는 다음주 금요일입니다. 가실 분들은 모임에 참여해주세요",
    },
    {
      id: "2",
      author: "김단웅",
      date: "2025-07-19",
      title: "1학년 새내기인데 동아리 추천좀..",
      content: "1학년인데 재밌는거 들어가고 싶어요",
    },
    {
      id: "3",
      author: "김단웅",
      date: "2025-07-19",
      title: "1학년 새내기인데 동아리 추천좀..",
      content: "1학년인데 재밌는거 들어가고 싶어요",
    },
  ];

  const hasPosts = true; // 등록된 글이 있는지 여부

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("NoticeDetailScreen", { post: item })}
      style={styles.postContainer}
    >
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
      <Text numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {hasPosts ? (
        <FlatList
          data={mockPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>아직 글이 없습니다</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("NoticeFormScreen")}
        style={styles.fab}
      >
        <Text style={styles.fabText}>글 쓰기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  title: {
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    left: "50%",
    bottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    transform: [{ translateX: -30 }],
    backgroundColor: "#428DFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // 안드로이드 그림자
    shadowColor: "#000", // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
