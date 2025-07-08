// screens/meeting/MeetingApplyScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";

type Props = NativeStackScreenProps<HomeStackParamList, "MeetingApply">;

/* ────────── 더미 기본값 (원하면 props 로 주입) ────────── */
const TODAY = "2025. 09. 16";
const INIT = {
  name: "김단웅",
  intro: "안녕하세요 동아리 가입하는 김단웅입니다.",
  motive: "다양한 공모전을 참여해보고 싶어 신청하게 되었습니다.",
  dept: "음악예술대학 디자인학부",
  phone: "010-1234-5678",
  portfolio: "https://portal.dankook.ac.kr",
  careers: [
    "2024 용인시 공모전 대상",
    "2025 포스터 대상",
    "대한민국 디자인 공모전 수상",
  ],
};

/* ────────── 상수 · 리소스 ────────── */
const BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const BLUE = "#3B82F6";
const GREY = "#6B7280";
const LINE = "#E5E7EB";
const BACK_ICON = require("../../assets/images/goback.png");

/* ────────── 메인 ────────── */
export default function MeetingApplyScreen({ navigation }: Props) {
  const [form] = useState(INIT); // *읽기 전용* 더미 데이터를 상태로

  return (
    <SafeAreaView style={styles.root}>
      {/* ── 헤더 ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BACK_ICON} style={styles.goBackImg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>모임 신청</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        {/* 날짜 */}
        <Text style={styles.dateTxt}>{TODAY}</Text>

        {/* ===== 이름 ===== */}
        <Label text="이름" />
        <Input value={form.name} />
        <View style={styles.hr} />

        {/* ===== 간단 소개글 ===== */}
        <Label text="간단 소개글" top={28} />
        <Input value={form.intro} multiline />
        <View style={styles.hr} />

        {/* ===== 지원 동기 ===== */}
        <Label text="지원 동기" top={28} />
        <Input value={form.motive} multiline />

        {/* 기본 정보 (소속/연락처/포트폴리오) */}
        <View style={styles.hr} />
        <Label text="소속" top={24} />
        <Input value={form.dept} />

        <Label text="연락처" top={20} />
        <Input value={form.phone} keyboardType="phone-pad" />

        <Label text="포트폴리오" top={20} />
        <Input value={form.portfolio} />

        {/* 경력 사항 */}
        <View style={styles.hr} />
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>경력 사항</Text>
        {form.careers.map((c, idx) => (
          <View key={idx} style={{ marginTop: idx ? 12 : 12 }}>
            <Text style={styles.careerLabel}>{`경력${idx + 1}`}</Text>
            <Input value={c} />
          </View>
        ))}
      </ScrollView>

      {/* ─── 하단 바 ─── */}
      <View style={styles.bottomBar}></View>
      {/* ── 하단 버튼 ── */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.submitTxt}>모임 신청하기</Text>
      </TouchableOpacity>
      <View />
    </SafeAreaView>
  );
}

/* ────────── 재사용 서브 ────────── */
function Label({ text, top = 10 }: { text: string; top?: number }) {
  return <Text style={[styles.label, { marginTop: top }]}>{text}</Text>;
}
function Input(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      pointerEvents="none"
      editable={false}
      {...props}
      style={[
        styles.input,
        props.multiline && { height: 88, textAlignVertical: "top" },
      ]}
    />
  );
}

/* ────────── 스타일 ────────── */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  /* 헤더 */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: BAR - 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  // backIcon: { width: 24, height: 24, tintColor: GREY },
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

  /* 날짜 */
  dateTxt: { fontSize: 13, color: GREY, marginTop: 20 },

  /* 공통 라벨 & 인풋 */
  label: { fontSize: 17, fontWeight: "600", color: "#1F2937" },
  input: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    backgroundColor: "#F9FAFB",
    fontSize: 13,
    color: GREY,
  },

  /* 구분선 */
  hr: { height: 1, backgroundColor: LINE, marginTop: 32 },

  /* 섹션 타이틀 */
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  careerLabel: { fontSize: 15, color: GREY, marginBottom: 6 },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  /* 제출 버튼 */
  submitBtn: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 0,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#428DFF",
    justifyContent: "center",
    alignItems: "center",
  },
  submitTxt: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
