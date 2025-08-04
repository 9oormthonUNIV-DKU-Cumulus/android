import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { HomeStackParamList } from "../../App";
import { createActivity, updateActivity } from "../../utils/api";

type Props = NativeStackScreenProps<HomeStackParamList, "MoimForm">;

export default function MoimFormScreen({ route, navigation }: Props) {
  const { meeting, clubId, categoryId } = route.params || {};
  const isEditing = !!meeting;
  const [selectedType, setSelectedType] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [maxParticipants, setMaxParticipants] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setTitle(meeting.title);
      setDescription(meeting.description);
      setMeetingDate(new Date(meeting.meetingDate));
      setDeadline(new Date(meeting.deadline));
      setMaxParticipants(meeting.maxParticipants.toString());
    }
  }, [isEditing, meeting]);

  const handleCreate = async () => {
    if (!title || !description || !maxParticipants) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }

    const data = {
      clubId: clubId,
      title,
      description,
      meetingDate: meetingDate.toISOString(),
      deadline: deadline.toISOString(),
      maxParticipants: parseInt(maxParticipants),
    };

    try {
      console.log("Creating activity with data:", data);
      await createActivity(data);
      Alert.alert("생성 완료", "모임이 성공적으로 생성되었습니다.");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "모임 생성 중 오류가 발생했습니다.");
    }
  };

  const toLocalISOString = (date: Date) => {
    return date.toISOString().split(".")[0]; // 밀리초와 Z 제거
  };

  const handleUpdate = async () => {
    if (!title || !description || !maxParticipants || !clubId) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }

    const data = {
      clubId: meeting.clubId, // clubId는 수정되지 않는다고 가정
      title,
      description,
      meetingDate: toLocalISOString(meetingDate),
      deadline: toLocalISOString(deadline),
      maxParticipants: parseInt(maxParticipants, 10),
    };

    try {
      await updateActivity(meeting.id, data);
      Alert.alert("수정 완료", "모임이 성공적으로 수정되었습니다.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("오류", "모임 수정 중 오류가 발생했습니다.");
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
          <Text style={styles.createMoimTitle}>모임 개설</Text>
        </View>

        <View style={styles.side} />
      </View>

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* 제목 */}
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력해주세요"
            value={title}
            onChangeText={setTitle}
          />

          {/* 내용 */}
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={styles.input}
            placeholder="내용을 입력해주세요"
            value={description}
            onChangeText={setDescription}
          />

          {/* 날짜 */}
          <Text style={styles.label}>날짜</Text>
          <TouchableOpacity
            style={styles.date}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: meetingDate ? "#000" : "#999" }}>
              {meetingDate.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={meetingDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                if (date) setMeetingDate(date);
              }}
            />
          )}

          {/* 마감일 */}
          <Text style={styles.label}>마감일</Text>
          <TouchableOpacity
            style={styles.date}
            onPress={() => setShowDeadlinePicker(true)}
          >
            <Text style={{ color: deadline ? "#000" : "#999" }}>
              {deadline.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>

          {showDeadlinePicker && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDeadlinePicker(false);
                if (date) setDeadline(date);
              }}
            />
          )}

          {/* 모집 인원 */}
          <Text style={styles.label}>모집 인원</Text>
          <TextInput
            style={styles.input}
            placeholder="모집인원을 입력해주세요"
            keyboardType="numeric"
            value={maxParticipants}
            onChangeText={setMaxParticipants}
          />

          {/* 가입하기 버튼 */}
          <TouchableOpacity
            style={styles.createMoimButton}
            onPress={isEditing ? handleUpdate : handleCreate}
          >
            <Text style={styles.createMoimText}>
              {isEditing ? "모임 수정하기" : "모임 개설하기"}
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
    fontSize: 14,
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
    gap: 16,
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
