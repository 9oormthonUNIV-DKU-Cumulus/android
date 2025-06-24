import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";

export type MatchingItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  member: string;
  imageUrl: string;
};

type MatchingListItemProps = {
  item: MatchingItem;
  onPress: (item: MatchingItem) => void;
  likedItems: string[];
  onToggleLike: (item: MatchingItem) => void;
};

export const MatchingListItem = ({
  item,
  onPress,
  onToggleLike,
  likedItems,
}: MatchingListItemProps) => (
  <View style={styles.item}>
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
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
    <TouchableOpacity
      style={styles.textContainer}
      onPress={() => onPress(item)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>{item.category}</Text>
        <Text style={styles.text}>멤버 {item.member}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    paddingLeft: 10,
    flex: 1,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 12,
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
    width: 60,
    height: 60,
    borderWidth: 2,
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
    marginTop: 3,
    color: "#868686",
  },
});
