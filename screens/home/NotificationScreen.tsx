import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";

export default function NotificationScreen({ navigation }: any) {
  // 공지 더미 데이터
  const dummyNotices = [
    {
      id: "1",
      message: "신청한 단국대 러닝 동아리가 승인되었습니다.",
      date: "2025.07.23 09:00",
    },
    {
      id: "2",
      message: "신청한 단국대 봉사 동아리가 거절되었습니다.",
      date: "2025.07.20 14:30",
    },
  ];

  return (
    <View style={styles.body}>
      <View style={styles.topBar}>
        {/* 왼쪽: 뒤로가기 버튼 */}
        <View style={styles.side}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/goback.png")}
              style={styles.goBackImg}
            />
          </TouchableOpacity>
        </View>

        {/* 가운데: 타이틀 */}
        <View style={styles.center}>
          <Text style={styles.title}>알림</Text>
        </View>

        {/* 오른쪽 공간 (비워둠) */}
        <View style={styles.side} />
      </View>

      {/* 알림 목록 */}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dummyNotices}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  side: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});
