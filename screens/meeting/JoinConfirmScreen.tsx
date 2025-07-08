// screens/meeting/JoinConfirmScreen.tsx
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";

/* ───────────── 상수 · 리소스 */
const BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const { width } = Dimensions.get("window");
// const ARROW_ICON = require("../../assets/images/backback.png");
const BACK_ICON = require("../../assets/images/goback.png");

/* ───────────── 타입 */
export interface Applicant {
  id: string;
  photo: any;
  name: string;
  gender: "남" | "여";
  age: number;
  major: string;
  date: string;
}

type Props = NativeStackScreenProps<HomeStackParamList, "JoinConfirm">;

/* DEMO 지원자 목록 ─ 나중에 API 데이터로 교체 */
const APPLICANTS: Applicant[] = [
  {
    id: "1",
    photo: require("../../assets/images/userProfile1.png"),
    name: "김단웅",
    gender: "여",
    age: 21,
    major: "커뮤니케이션디자인",
    date: "2024-02-28",
  },
  {
    id: "2",
    photo: require("../../assets/images/userProfile2.png"),
    name: "최단국",
    gender: "남",
    age: 22,
    major: "경영학과",
    date: "2024-02-27",
  },
  {
    id: "3",
    photo: require("../../assets/images/userProfile3.png"),
    name: "이대학",
    gender: "여",
    age: 21,
    major: "커뮤니케이션디자인",
    date: "2024-02-27",
  },
  {
    id: "4",
    photo: require("../../assets/images/userProfile4.png"),
    name: "김단국",
    gender: "여",
    age: 24,
    major: "패션디자인학과",
    date: "2024-02-26",
  },
];

/* ───────────── 메인 컴포넌트 */
export default function JoinConfirmScreen({ navigation }: Props) {
  const onApprove = (id: string) => {
    // TODO: 승인 로직
    console.log(`approve ${id}`);
  };
  const onReject = (id: string) => {
    // TODO: 거절 로직
    console.log(`reject ${id}`);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BACK_ICON} style={styles.goBackImg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>가입확인</Text>
      </View>

      {/* 지원자 목록 */}
      <FlatList
        data={APPLICANTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              {/* 프로필 이미지 */}
              <Image source={item.photo} style={styles.profileImg} />

              {/* 이름 · 세부 정보 */}
              <View style={{ flex: 1 }}>
                {/* 이름 + 나이  /  자세히보기 */}
                <View style={styles.nameRow}>
                  <View style={styles.nameGroup}>
                    <Text style={styles.nameTxt}>{item.name}</Text>
                    <Text style={styles.metaTxt}>
                      {`  ( ${item.gender} / ${item.age}세 )`}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ApplicantInfo", { applicant: item })
                    }
                  >
                    <Text style={styles.moreTxt}>자세히보기 〉</Text>
                  </TouchableOpacity>
                </View>

                {/* 학과, 신청일 */}
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>학과</Text>
                  <Text style={styles.infoValue}>{item.major}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>신청일</Text>
                  <Text style={styles.infoValue}>{item.date}</Text>
                </View>
              </View>
            </View>

            {/* 거절 / 승인 버튼 */}
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={[styles.button, styles.rejectBtn]}
                onPress={() => onReject(item.id)}
              >
                <Text style={[styles.btnTxt, { color: "#5498FF" }]}>거절</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.approveBtn]}
                onPress={() => onApprove(item.id)}
              >
                <Text style={[styles.btnTxt, { color: "#fff" }]}>승인</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

/* ───────────── 스타일 */
const BLUE = "#3B82F6";
const GREY = "#6B7280";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F3F4F6" },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },

  /* 헤더 */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: BAR - 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
  },
  goBackImg: {
    marginLeft: 12,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginRight: 24,
  },

  /* 카드 */
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 15,
    marginBottom: 12,
  },
  row: { flexDirection: "row" },
  profileImg: { width: 72, height: 72, borderRadius: 36, marginRight: 20 },

  /* 이름 + 자세히보기 라인 */
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // 왼·오른쪽 정렬
    marginBottom: 6,
  },
  nameGroup: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  nameTxt: { fontSize: 14, fontWeight: "700", color: "#1F2937" },
  metaTxt: { fontSize: 11, color: GREY },
  moreTxt: { fontSize: 9, color: GREY },

  /* 학과/신청일 */
  infoRow: { flexDirection: "row", marginBottom: 2 },
  infoLabel: { width: 50, fontSize: 11, color: GREY },
  infoValue: { fontSize: 11, color: "#1F2937" },

  /* 버튼 */
  btnRow: { flexDirection: "row", marginTop: 18 },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  rejectBtn: { backgroundColor: "#E2EDFF", marginRight: 12 },
  approveBtn: { backgroundColor: BLUE },
  btnTxt: { fontSize: 14, fontWeight: "500" },
});
