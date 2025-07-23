import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

export default function AlbumUplaodScreen({ navigation }) {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.7,
        selectionLimit: 0,
      },
      (response) => {
        if (response.didCancel) {
          console.log("이미지를 선택하지 않음");
        } else if (response.errorCode) {
          console.log("이미지 선택 에러", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uris = response.assets
            .map((asset) => asset.uri)
            .filter(Boolean) as string[];
          setImageUris(uris);
        }
      }
    );
  };

  return (
    <View style={styles.body}>
      {/* 상단 바 */}
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
          <Text style={styles.title}>앨범</Text>
        </View>

        {/* 오른쪽 공간 (비워둠) */}
        <View style={styles.side} />
      </View>

      {/* 사진 선택 */}
      <View style={styles.uploadContainer}>
        <Text style={styles.label}>사진 추가</Text>
        <TouchableOpacity
          onPress={handleSelectImage}
          style={styles.imageUploadButton}
        >
          <Text style={styles.imageUploadText}>사진 선택하기</Text>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {imageUris.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      </View>

      {/* ─── 하단 바 ─── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.createBtn}>
          <Text style={styles.createBtnTxt}>사진 업로드</Text>
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
  goBackImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  imageUploadButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
  },

  imageUploadText: {
    fontSize: 13,
    color: "#428DFF",
    fontWeight: "500",
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  uploadContainer: {
    flex: 1,
    margin: 20,
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
