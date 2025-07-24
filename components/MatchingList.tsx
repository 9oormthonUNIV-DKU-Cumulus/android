import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import { getCategoryLabel } from "../utils/category";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../screens/category/CategoryListScreen"; // 여기 경로는 MatchingListItem 기준

export type MatchingItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  member: string;
  imageUrl: string | number;
};

type MatchingListItemProps = {
  item: MatchingItem;
  likedItems: string[];
  onToggleLike: (item: MatchingItem) => void;
  onDelete: (id: string) => void;
  isOwner: boolean;
};

export const MatchingListItem = ({
  item,
  onToggleLike,
  likedItems,
  onDelete,
  isOwner,
}: MatchingListItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.item}>
      <View style={styles.imageWrapper}>
        {/* <Image source={{ uri: item.imageUrl }} style={styles.image} /> */}
        <Image
          source={
            typeof item.imageUrl === "string"
              ? { uri: item.imageUrl }
              : item.imageUrl
          }
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => onToggleLike(item)}
        >
          {/* 좋아요 버튼 */}
          <Image
            source={
              likedItems.includes(item.id)
                ? require("../assets/images/like-btn-filled.png")
                : require("../assets/images/like-btn.png")
            }
            style={styles.likeIcon}
          />
        </TouchableOpacity>
      </View>
      {/* 모임 내용 */}
      {/* 항목 클릭 시 상세 화면 이동 */}
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate("MeetingDetail", { id: item.id })}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.text}>{getCategoryLabel(item.category)}</Text>
          <Text style={styles.text}>멤버 {item.member}</Text>
        </View>
      </TouchableOpacity>
      {isOwner && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("ClubForm", { club: item })} style={styles.editButton}>
            <Text style={styles.editButtonText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
    marginLeft: 10,
  },
  likeButton: {
    position: "absolute",
    bottom: 1,
    left: 18,
    padding: 4,
  },
  likeIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  item: {
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 71,
    height: 71,
    borderRadius: 8,
    marginLeft: 15,
  },
  title: {
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    color: "#868686",
  },
  deleteButton: {
    marginLeft: 'auto',
    marginRight: 15,
    padding: 8,
    backgroundColor: '#EF4444',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 5,
    marginBottom: 5,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
