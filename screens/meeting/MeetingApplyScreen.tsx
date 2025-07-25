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

/* ────────── 상수 · 리소스 ────────── */
const BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const GREY = "#6B7280";
const LINE = "#E5E7EB";
const BACK_ICON = require("../../assets/images/goback.png");

/* ────────── 메인 ────────── */
export default function MeetingApplyScreen({ navigation }: Props) {
  // const [form] = useState(INIT); // *읽기 전용* 더미 데이터를 상태로
  const [introInputHeight, setIntroInputHeight] = useState(60);
  const [motiveInputHeight, setMotiveInputHeight] = useState(60);

  return (
    <SafeAreaView style={styles.root}>
      {/* ── 헤더 ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BACK_ICON} style={styles.goBackImg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>동아리 신청</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        {/* ===== 이름 ===== */}
        <Label text="이름" />
        <TextInput placeholder="이름" style={styles.input} />
        <View style={styles.hr} />

        {/* ===== 간단 소개글 ===== */}
        <Label text="간단 소개글" top={28} />
        <TextInput
          placeholder="간단 소개글 입력"
          style={[
            styles.input,
            { height: introInputHeight, textAlignVertical: "top" },
          ]}
          multiline
          onContentSizeChange={(e) => {
            setIntroInputHeight(e.nativeEvent.contentSize.height);
          }}
        />
        <View style={styles.hr} />

        {/* ===== 지원 동기 ===== */}
        <Label text="지원 동기" top={28} />
        <TextInput
          placeholder="지원 동기 입력"
          style={[
            styles.input,
            { height: motiveInputHeight, textAlignVertical: "top" },
          ]}
          onContentSizeChange={(e) => {
            setMotiveInputHeight(e.nativeEvent.contentSize.height);
          }}
          multiline
        />

        {/* 기본 정보 (소속/연락처/포트폴리오) */}
        <View style={styles.hr} />
        <Label text="소속" top={24} />
        <TextInput placeholder="전공 입력" style={styles.input} />

        <Label text="연락처" top={20} />
        <TextInput
          placeholder="연락처"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </ScrollView>

      {/* ── 하단 버튼 ── */}
      <TouchableOpacity style={styles.submitBtn}>
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

  /* 제출 버튼 */
  submitBtn: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 10,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#428DFF",
    justifyContent: "center",
    alignItems: "center",
  },
  submitTxt: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
