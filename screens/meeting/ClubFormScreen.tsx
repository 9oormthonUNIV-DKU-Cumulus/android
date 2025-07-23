import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

export default function ClubFormScreen({ navigation }) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        maxWidth: 800,
        maxHeight: 800,
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) {
          console.log("이미지를 선택하지 않음");
        } else if (response.errorCode) {
          console.log("이미지 선택 에러", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      }
    );
  };

  // 동아리 개설 api
  const handleCreateClub = () => {};

  const [inputHeight, setInputHeight] = useState(60); // 내용 입력창 초기 높이
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<"죽전" | "천안" | null>(
    "죽전"
  );

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
          <Text style={styles.createMoimTitle}>동아리 개설</Text>
        </View>

        <View style={styles.side} />
      </View>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* 모임 종류 */}
          <Text style={styles.label}>캠퍼스</Text>
          <View style={styles.checkboxGroup}>
            <Checkbox
              label="죽전"
              selected={selectedType === "죽전"}
              onPress={() => setSelectedType("죽전")}
            />
            <Checkbox
              label="천안"
              selected={selectedType === "천안"}
              onPress={() => setSelectedType("천안")}
            />
          </View>

          {/* 제목 */}
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력해주세요"
            keyboardType="default"
          />

          {/* 카테고리 */}
          <Text style={styles.label}>카테고리</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(item) => setSelectedCategory(item)}
            style={styles.picker}
          >
            <Picker.Item label="스포츠" value={1} />
            <Picker.Item label="외국/언어" value={2} />
            <Picker.Item label="사진/영상" value={3} />
            <Picker.Item label="봉사활동" value={4} />
            <Picker.Item label="자기계발" value={5} />
            <Picker.Item label="독서/글" value={6} />
            <Picker.Item label="문화/댄스" value={7} />
            <Picker.Item label="음악/악기" value={8} />
            <Picker.Item label="여행" value={9} />
            <Picker.Item label="업종/직무" value={10} />
          </Picker>

          {/* 내용 */}
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={[styles.input, { height: inputHeight }]}
            placeholder="내용을 입력해주세요"
            multiline={true}
            textAlignVertical="top"
            onContentSizeChange={(e) => {
              setInputHeight(e.nativeEvent.contentSize.height);
            }}
          />

          {/* 모집 인원 */}
          <Text style={styles.label}>모집 인원</Text>
          <TextInput
            style={styles.input}
            placeholder="모집인원을 입력해주세요"
            keyboardType="numeric"
          />

          {/* 이미지 업로드 */}
          <Text style={styles.label}>동아리 대표 이미지</Text>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={() => handleSelectImage()}
          >
            <Text style={styles.imageUploadText}>사진 선택하기</Text>
          </TouchableOpacity>

          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: 200,
                marginTop: 10,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          )}

          {/* 가입하기 버튼 */}
          <TouchableOpacity
            style={styles.createMoimButton}
            onPress={() => handleCreateClub()}
          >
            <Text style={styles.createMoimText}>동아리 개설하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
function Checkbox({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, selected && styles.checked]}>
        {selected && <View style={styles.checkboxInner} />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#FFF",
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
    backgroundColor: "#FFF",
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
  container: {
    flex: 1,
    // paddingTop: STATUS_BAR,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  createMoimButton: {
    height: 50,
    backgroundColor: "#428DFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  createMoimText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 35,
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontWeight: "500",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 13,
    backgroundColor: "#FAFAFA",
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
  picker: {
    width: "100%",
    height: 54,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: "#FAFAFA",
  },
  date: {
    width: "100%",
    height: 30,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  checkboxGroup: {
    marginTop: 10,
    flexDirection: "row",
    gap: 80,
    justifyContent: "flex-start",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#CCC",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checked: {
    borderColor: "#5498FF",
    backgroundColor: "#fff",
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: "#5498FF",
    borderRadius: 2,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
});
