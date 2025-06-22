import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

export type MatchingItem = {
  id: string;
  title: string;
  imageUrl: string;
};

type MatchingListItemProps = {
  item: MatchingItem;
  onPress: (item: MatchingItem) => void;
};

export const MatchingListItem = ({ item, onPress }: MatchingListItemProps) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
    <Image source={{ uri: item.imageUrl }} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 8,
  },
  title: {
    marginTop: 8,
    fontWeight: "bold",
  },
});
