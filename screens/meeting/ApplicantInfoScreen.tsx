import React, { useState } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";
import { Applicant } from "./JoinConfirmScreen"; // Applicant 타입에 id(applicationId)가 포함되어 있다고 가정
import { approveApplication, rejectApplication } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<HomeStackParamList, "ApplicantInfo">;

/* ───── 상수 · 리소스 */
const BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const BACK_ICON = require("../../assets/images/goback.png");

export default function ApplicantInfoScreen({ navigation, route }: Props) {
  // route.params에서 applicant 객체를 가져옵니다. applicant.id가 applicationId라고 가정합니다.
  const { applicant } = route.params as { applicant: Applicant & { id: number } };
  const [isLoading, setIsLoading] = useState(false);

  // 토큰을 가져오는 임시 함수
  const getAuthToken = async () => {
    // 실제 구현 시 AsyncStorage에서 관리자 토큰을 가져와야 합니다.
    return "your_hardcoded_admin_access_token_for_testing";
  };

  // 요청 처리 핸들러 (승인/거부 공통 로직)
  const handleRequest = async (action: "approve" | "reject") => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert("인증 오류", "로그인이 필요합니다.");
        return;
      }

      const actionFunc = action === "approve" ? approveApplication : rejectApplication;
      await actionFunc(applicant.id, token);

      Alert.alert("처리 완료", `신청이 성공적으로 ${action === "approve" ? "승인" : "거부"}되었습니다.`,
        [
          { text: "확인", onPress: () => navigation.goBack() } // 확인 후 이전 화면으로 이동
        ]
      );

    } catch (error: any) {
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error.response && error.response.data && error.response.data.error) {
        const errorCode = error.response.data.error.code;
        switch (errorCode) {
          case "ALREADY_APPROVED":
            errorMessage = "이미 승인된 신청입니다.";
            break;
          case "ALREADY_REJECTED":
            errorMessage = "이미 거부된 신청입니다.";
            break;
          case "NOT_FOUND":
            errorMessage = "신청 정보를 찾을 수 없습니다.";
            break;
          default:
            errorMessage = error.response.data.error.message || errorMessage;
        }
      }
      Alert.alert("처리 실패", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* ... (기존 헤더 및 스크롤뷰) ... */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
        {/* ... (기존 신청자 정보 UI) ... */}
      </ScrollView>

      {/* 하단 승인/거부 버튼 */}
      <View style={styles.bottomBar}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#5498FF" />
        ) : (
          <>
            <TouchableOpacity
              style={[styles.actionBtn, styles.rejectBtn]}
              onPress={() => handleRequest("reject")}
              disabled={isLoading}
            >
              <Text style={styles.actionBtnText}>거부하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.approveBtn]}
              onPress={() => handleRequest("approve")}
              disabled={isLoading}
            >
              <Text style={styles.actionBtnText}>승인하기</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

/* ... (기존 서브 컴포넌트 및 스타일) ... */

const styles = StyleSheet.create({
  // ... (기존 스타일)
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 90,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  rejectBtn: {
    backgroundColor: "#EF4444",
    marginRight: 8,
  },
  approveBtn: {
    backgroundColor: "#5498FF",
    marginLeft: 8,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
