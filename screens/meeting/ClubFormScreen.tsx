import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { api } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ClubFormScreen({ navigation, route }) {
  const { mode = "create", club = null } = route?.params ?? {};

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [inputHeight, setInputHeight] = useState(60); // 내용 입력창 초기 높이
  const [selectedCategory, setSelectedCategory] = useState<number>(
    club?.categoryId ?? 1
  );
  const [selectedType, setSelectedType] = useState<"죽전" | "천안">(
    club?.campus === "CHEONAN" ? "천안" : "죽전"
  );
  const [title, setTitle] = useState(club?.clubName ?? "");
  const [description, setDescription] = useState(club?.clubDesc ?? "");
  const [people, setPeople] = useState(club?.peopleLimit?.toString() ?? "");

  useEffect(() => {
    if (mode === "edit" && club) {
      setTitle(club.clubName);
      setDescription(club.clubDesc);
      setSelectedType(club.campus === "CHEONAN" ? "천안" : "죽전");
      setImageUri(club.imageUrl);
      setPeople(club.peopleLimit?.toString() ?? "");
      setSelectedCategory(club.categoryId ?? 1);
    }
  }, [mode, club]);

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

  // 동아리 개설 및 수정
  const handleSubmit = async () => {
    const userStr = await AsyncStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;

    if (!title || !description) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요");
      return;
    }

    const payload = {
      clubName: title,
      clubDesc: description,
      category: selectedCategory,
      campus: selectedType === "죽전" ? "JUKJEON" : "CHEONAN",
      userId: currentUser?.id,
      peopleLimit: Number(people),
      // imageUrl: imageUri, // TODO: image upload
    };

    try {
      if (mode === "edit") {
        await api.patch(`/api/club/${club.id}`, payload);
        Alert.alert("수정 완료", "동아리 정보가 수정되었습니다");
      } else {
        await api.post(`/api/club`, payload);
        Alert.alert("개설 완료", "동아리가 성공적으로 개설되었습니다");
      }
      navigation.goBack();
    } catch (err) {
      console.error("저장 오류", err);
      Alert.alert("오류", "서버 요청 중 문제가 발생했습니다");
    }
  };

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
          <Text style={styles.createMoimTitle}>
            {mode === "edit" ? "동아리 수정" : "동아리 개설"}
          </Text>
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
          <Text style={styles.label}>동아리 이름</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력해주세요"
            keyboardType="default"
            value={title}
            onChangeText={setTitle}
          />

          {/* 내용 */}
          <Text style={styles.label}>동아리 설명</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="동아리 설명을 입력해주세요"
            multiline={true}
            value={description}
            onChangeText={setDescription}
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
            value={people}
            onChangeText={setPeople}
          />

          {/* 이미지 업로드 */}
          <Text style={styles.label}>동아리 대표 이미지</Text>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={handleSelectImage}
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
            onPress={() => handleSubmit()}
          >
            <Text style={styles.createMoimText}>
              {mode === "edit" ? "수정 완료" : "동아리 개설하기"}
            </Text>
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
