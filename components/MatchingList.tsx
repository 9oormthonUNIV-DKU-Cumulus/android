import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type MatchingItem = {
  id: string;
  title: string;
  imageUrl: string;
};

type MatchingListProps = {
  data: MatchingItem[];
  onItemPress: (item: MatchingItem) => void;
};

const MatchingList = ({ data, onItemPress }: MatchingListProps) => {
  const renderItem = ({ item }: { item: MatchingItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default MatchingList;

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
