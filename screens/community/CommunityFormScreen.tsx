import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

export default function CommunityFormScreen({ navigation }) {
  const [inputHeight, setInputHeight] = useState(200); // 내용 입력창 초기 높이

  return (
    <View style={styles.body}>
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
          <Text style={styles.communityBarText}>글 쓰기</Text>
        </View>

        <View style={styles.side} />
      </View>
      {/* 글 작성 */}
      <View style={styles.container}>
        {/* 제목 */}
        {/* <Text style={styles.label}>제목</Text> */}
        <TextInput
          style={styles.input}
          placeholder="제목을 입력해주세요"
          keyboardType="default"
        />

        {/* 내용 */}
        {/* <Text style={styles.label}>내용</Text> */}
        <TextInput
          style={[styles.input, { height: Math.max(200, inputHeight) }]}
          placeholder="자유롭게 얘기해보세요"
          multiline={true}
          textAlignVertical="top"
          onContentSizeChange={(e) => {
            setInputHeight(e.nativeEvent.contentSize.height);
          }}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.uploadBtn}>
            <Text style={styles.uploadText}>등록</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
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
    backgroundColor: "#fff",
    marginBottom: 40,
    borderBottomColor: "#EEE",
  },
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  communityBarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // label: {
  //   fontSize: 16,
  //   color: "#333",
  //   marginBottom: 10,
  //   fontWeight: "500",
  //   marginTop: 20,
  // },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 13,
    backgroundColor: "#FAFAFA",
  },
  btnContainer: {
    alignItems: "flex-end",
    // marginTop: 10,
  },
  uploadBtn: {
    backgroundColor: "#428DFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // 안드로이드 그림자
    shadowColor: "#000", // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    height: 30,
    paddingHorizontal: 20,
  },
  uploadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
