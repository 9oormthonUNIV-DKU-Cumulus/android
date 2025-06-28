// screens/meeting/ApplicantInfoScreen.tsx
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";
import { Applicant } from "./JoinConfirmScreen";

type Props = NativeStackScreenProps<HomeStackParamList, "ApplicantInfo">;

/* ───── 상수 · 리소스 */
const BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const BACK_ICON = require("../../assets/images/goback.png");

export default function ApplicantInfoScreen({ navigation, route }: Props) {
  const { applicant } = route.params as { applicant: Applicant };

  /* ── (1) careers 없어도 오류 안 나도록 기본값 */
  const careers = applicant.careers ?? [];

  return (
    <SafeAreaView style={styles.root}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BACK_ICON} style={styles.goBackImg} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>신청 정보</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
      >
        {/* 신청일 · 이름 */}
        <Text style={styles.dateTxt}>{applicant.appliedDate}</Text>
        <Text style={styles.nameTxt}>{applicant.name}</Text>

        <View style={styles.hr} />

        {/* 간단 소개글 */}
        <Text style={styles.secTitle}>간단 소개글</Text>
        <Text style={styles.secBody}>{applicant.intro}</Text>

        <View style={styles.hr} />

        {/* 지원 동기 */}
        <Text style={styles.secTitle}>지원 동기</Text>
        <Text style={styles.secBody}>{applicant.motive}</Text>

        <View style={styles.hr} />

        {/* 기본 정보 */}
        <InfoRow label="소속" value={applicant.dept} />
        <InfoRow label="연락처" value={applicant.phone} />
        <InfoRow label="포트폴리오" value={applicant.portfolio} />

        <View style={styles.hr} />

        {/* 경력 사항 */}
        {/* ── (2) 배열이 비어있으면 섹션을 생략해도 되고, 그대로 남겨두어도 됩니다 */}
        {careers.length > 0 && (
          <>
            <Text style={styles.secTitle}>경력 사항</Text>
            {careers.map((c, idx) => (
              <Text key={idx} style={styles.careerItem}>
                {c}
              </Text>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ───── 서브 컴포넌트 */
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "-"}</Text>
    </View>
  );
}

/* ───── 색상 상수 */
const GREY = "#6B7280";
const DARK = "#1F2937";

/* ───── 스타일 */
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
    color: DARK,
    marginRight: 24,
  },

  /* 기본 헤드라인 */
  dateTxt: { fontSize: 13, color: GREY, marginTop: 8 },
  nameTxt: { fontSize: 26, fontWeight: "700", color: DARK, marginTop: 8 },

  /* 섹션 헤더 + 본문 */
  secTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: DARK,
    marginTop: 28,
    marginBottom: 8,
  },
  secBody: { fontSize: 15, color: GREY, lineHeight: 22 },

  /* 구분선 */
  hr: { height: 1, backgroundColor: "#E5E7EB", marginTop: 28 },

  /* 기본 정보(소속/연락처/포트폴리오) */
  infoRow: { flexDirection: "row", marginTop: 12 },
  infoLabel: { width: 70, fontSize: 15, color: GREY },
  infoValue: { flex: 1, fontSize: 15, color: DARK },

  /* 경력 */
  careerItem: { fontSize: 15, color: GREY, marginTop: 6 },
});
