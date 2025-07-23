import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import { HomeStackParamList } from "../../App";

type MoimFormScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "MoimForm"
>;

type Props = {
  navigation: MoimFormScreenNavigationProp;
};

export default function MoimFormScreen({ navigation }: Props) {
  const [selectedType, setSelectedType] = useState<"정기" | "자유" | null>(
    "정기"
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

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
          {/* 모임 종류 */}
          <Text style={styles.label}>모임 종류</Text>
          <View style={styles.checkboxGroup}>
            <Checkbox
              label="정기 모임"
              selected={selectedType === "정기"}
              onPress={() => setSelectedType("정기")}
            />
            <Checkbox
              label="자유 모임"
              selected={selectedType === "자유"}
              onPress={() => setSelectedType("자유")}
            />
          </View>

          {/* 제목 */}
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            placeholder="제목을 입력해주세요"
            keyboardType="default"
          />

          {/* 위치 */}
          <Text style={styles.label}>위치</Text>
          <TextInput
            style={styles.input}
            placeholder="위치를 입력해주세요"
            autoCapitalize="none"
          />

          {/* 날짜 */}
          <Text style={styles.label}>날짜</Text>
          <TouchableOpacity
            style={styles.date}
            onPress={() => setShowPicker(true)}
          >
            <Text style={{ color: selectedDate ? "#000" : "#999" }}>
              {selectedDate
                ? selectedDate.toISOString().split("T")[0]
                : "날짜를 선택해주세요"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowPicker(false);
                if (date) setSelectedDate(date);
              }}
            />
          )}

          {/* 내용 */}
          <Text style={styles.label}>내용</Text>
          <TextInput style={styles.input} placeholder="내용을 입력해주세요" />

          {/* 모집 인원 */}
          <Text style={styles.label}>모집 인원</Text>
          <TextInput
            style={styles.input}
            placeholder="모집인원을 입력해주세요"
          />

          {/* 가입하기 버튼 */}
          <TouchableOpacity style={styles.createMoimButton}>
            <Text style={styles.createMoimText}>모임 개설하기</Text>
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
