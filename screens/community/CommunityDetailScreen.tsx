import { RouteProp } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { HomeStackParamList } from "../../App";

type Props = {
  route: RouteProp<HomeStackParamList, "CommunityDetailScreen">;
};

export default function CommnuityDetailScreen({ navigation, route }: Props) {
  const { post } = route.params;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.topBar}>
        {/* 상단 제목 */}
        <View style={styles.side}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/goback.png")}
              style={styles.goBackImg}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text style={styles.createMoimTitle}>커뮤니티</Text>
        </View>
        <View style={styles.side} />
      </View>

      {/* 본문 스크롤 영역 */}
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.postCard}>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.meta}>{post.date}</Text>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
        </View>
      </ScrollView>

      {/* 댓글 렌더링 영역 */}

      {/* 댓글 입력창 */}
      <View style={styles.commentContainer}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            placeholder="댓글을 입력하세요"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Image
              source={require("../../assets/images/send.png")}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  side: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 50,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderBottomColor: "#EEE",
  },
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  createMoimTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  postCard: {
    margin: 20,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 10,
    borderRadius: 12,
  },
  author: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: "#888",
    marginBottom: 16,
  },
  content: {
    fontSize: 12,
    lineHeight: 24,
    color: "#333",
  },
  commentContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },

  inputBox: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    backgroundColor: "#FAFAFA",
    paddingRight: 40, // 오른쪽 아이콘 공간 확보
    paddingLeft: 12,
  },

  textInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    paddingRight: 0, // 아이콘 겹침 방지
  },

  sendButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },

  sendIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
