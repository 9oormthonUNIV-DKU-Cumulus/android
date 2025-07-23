import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { HomeStackParamList } from "../../App";

export default function AlbumTabContent() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  // 사진 더미데이터
  const dummyImages = Array.from({ length: 20 }, (_, i) => ({
    id: i.toString(),
  }));

  return (
    <View style={styles.body}>
      {/* 사진 렌더링 영역 */}
      <FlatList
        data={dummyImages}
        numColumns={4} // ✅ 4열 설정
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <View style={styles.imagePlaceholder} />
          </View>
        )}
      />

      {/* ─── 하단 바 ─── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AlbumUploadScreen")}
          style={styles.createBtn}
        >
          <Text style={styles.createBtnTxt}>사진 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  gridContainer: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    maxWidth: "23%", // 간격 고려해서 4등분
  },
  imagePlaceholder: {
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    flex: 1,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",

    borderColor: "#E5E7EB",
  },

  createBtn: {
    flex: 1,
    height: 48,
    borderRadius: 17,
    backgroundColor: "#5498FF",
    justifyContent: "center",
    alignItems: "center",
  },
  createBtnTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
