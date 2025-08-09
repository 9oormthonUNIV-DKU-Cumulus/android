import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";
import PlanTabContent from "./PlanTabContent";
import NoticeTabContent from "./NoticeTabContent";
import HomeTabContent from "./HomeTabContent";
import AlbumTabContent from "./AlbumTabContent";
import { deleteActivity, applyToClub } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ───────────────────────── 상수 / 리소스 */
const STATUS_BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const { width } = Dimensions.get("window");

const AVATAR = require("../../assets/images/avatar-placeholder.png");
const BANNER_DEFAULT = require("../../assets/images/banner-placeholder.png");
const HEART_ICON = require("../../assets/images/heart2.png");
const BACK_ICON = require("../../assets/images/go-back-white.png");

/* ───────────────────────── 타입 */
type Props = NativeStackScreenProps<HomeStackParamList, "MeetingDetail">;
type ApplyStatus = "idle" | "pending" | "approved" | "rejected";

/* ───────────────────────── 데모 데이터 */
const MEETING = {
  name: "단국대 스포츠 모임 1",
  members: 45,
  intro: `"함께하는 스포츠, 함께 성장하는"
우리 단국대학교 스포츠 모임은 다양한 운동과 스포츠 활동을 통해
학생들이 건강하고 즐거운 대학 생활을 할 수 있는 모임입니다.
운동을 좋아하는 사람, 처음 시작하는 사람도 환영합니다.`,
  tags: ["단국대", "봉사", "20~30세"],
  leader: { name: "김단웅", intro: "안녕하세요 김단웅입니다" },
  posts: 53,
  schedules: [
    {
      date: "7월 16일",
      title: "크루에게만 공개된 일정이에요",
      status: "모집중",
      time: "오전 08:12",
      count: "3/20명",
    },
    {
      date: "7월 18일",
      title: "서울 반려동물 봉사활동 모집",
      status: "모집중",
      time: "오전 08:12",
      count: "3/20명",
    },
  ],
};

/* ───────────────────────── 메인 컴포넌트 */
export default function MeetingDetailScreen({ route, navigation }: Props) {
  const [tab, setTab] = useState<"홈" | "공지" | "일정" | "앨범">("홈");
  const [isOwner, setIsOwner] = useState(false); // 실제로는 API 응답으로 소유자 여부 판단해야 함

  // API 연동을 위한 상태
  const [isLoading, setIsLoading] = useState(false);
  const [applyStatus, setApplyStatus] = useState<ApplyStatus>("idle"); // 'idle', 'pending', 'approved'

  // route.params에서 meeting 객체 전체를 가져옵니다.
  const { meeting } = route.params;
  const clubId = meeting.clubId; // clubId 추출

  // 토큰을 가져오는 함수 (실제 앱에서는 로그인 시 저장한 토큰을 가져와야 함)
  const getAuthToken = async () => {
    // 임시로 하드코딩된 토큰을 반환합니다. 실제 구현 시 AsyncStorage에서 가져오세요.
    // 예: return await AsyncStorage.getItem('accessToken');
    return "your_hardcoded_access_token_for_testing";
  };

  const handleApply = async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert("인증 오류", "로그인이 필요합니다. 다시 로그인 후 시도해주세요.");
        return;
      }

      await applyToClub(clubId, token);
      setApplyStatus("pending");
      Alert.alert("신청 완료", "동아리 신청이 완료되었습니다. 승인을 기다려주세요.");

    } catch (error: any) {
      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error.response && error.response.data && error.response.data.error) {
        const errorCode = error.response.data.error.code;
        switch (errorCode) {
          case "ALREADY_MEMBER":
            errorMessage = "이미 가입된 동아리입니다.";
            setApplyStatus("approved");
            break;
          case "ALREADY_APPLIED":
            errorMessage = "이미 신청 내역이 있습니다. 승인 대기 또는 거절 이력을 확인해주세요.";
            setApplyStatus("pending");
            break;
          case "CLUB_NOT_FOUND":
            errorMessage = "동아리를 찾을 수 없습니다.";
            break;
          case "AUTH_REQUIRED":
            errorMessage = "다시 로그인 후 시도해주세요.";
            break;
          default:
            errorMessage = error.response.data.error.message || errorMessage;
        }
      }
      Alert.alert("신청 실패", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    // ... (기존 삭제 로직)
  };

  const getButtonText = () => {
    switch (applyStatus) {
      case "pending":
        return "승인 대기중";
      case "approved":
        return "가입된 동아리";
      default:
        return "동아리 신청";
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* ... (배너, 프로필 카드, 탭 바 등 기존 UI) ... */}
      
      {/* ─── 하단 바 ─── */}
      {tab === "홈" && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.likeBtn}>
            <Image source={HEART_ICON} style={styles.likeIcon} />
          </TouchableOpacity>

          {isOwner ? (
            <View style={{ flex: 1, flexDirection: "row" }}>
              {/* ... (수정하기, 삭제하기 버튼) ... */}
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.joinBtn,
                (isLoading || applyStatus === 'pending' || applyStatus === 'approved') && styles.joinBtnDisabled
              ]}
              onPress={handleApply}
              disabled={isLoading || applyStatus === 'pending' || applyStatus === 'approved'}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.joinTxt}>{getButtonText()}</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

/* ... (기존 스타일 코드) ... */
const styles = StyleSheet.create({
  // ... (기존 스타일)
  joinBtnDisabled: {
    backgroundColor: '#A5B4FC', // 비활성화 시 버튼 색상
  },
  // ... (나머지 스타일)
});


/* ───────────────────────── 홈 탭 내용 */

/* ───────────────────────── 스타일 */
const GREY = "#6B7280";
const LIGHTGREY = "#9CA3AF";
const BLUE = "#3B82F6";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F5F7FA" },
  backIcon: { width: 24, height: 24, resizeMode: "contain" },

  /* 배너 */
  banner: { width, height: width * 0.5, backgroundColor: "#E5EFFF" },
  bannerImg: { width: "100%", height: "100%", resizeMode: "cover" },
  backBtn: { position: "absolute", top: STATUS_BAR, left: 16 },
  goBackImg: {
    marginLeft: 12,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },

  /* 프로필 카드 */
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -30,
    width: "100%",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#E5E7EB",
    marginRight: 16,
  },
  meetingName: { fontSize: 16, fontWeight: "600", color: "#1F2937" },
  memberLine: { flexDirection: "row", marginTop: 4 },
  memberGrey: { fontSize: 12, color: GREY },
  memberBlue: { fontSize: 12, color: BLUE },

  /* 탭 */
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  tabBtn: { flex: 1, alignItems: "center", paddingVertical: 12 },
  tabTxt: { fontSize: 13, color: "#7A7A7A", fontWeight: "500" },
  tabTxtActive: { color: "#333C4A", fontWeight: "700" },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    width: "80%",
    height: 3,
    backgroundColor: BLUE,
  },

  /* 하단 바 */
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
  },
  likeBtn: { padding: 6 }, // 회색 원 제거, 터치 영역만
  likeIcon: { width: 20, height: 20, resizeMode: "contain" },
  joinBtn: {
    flex: 1,
    height: 48,
    borderRadius: 17,
    backgroundColor: "#5498FF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  joinTxt: { color: "#fff", fontSize: 16, fontWeight: "600" },
  deleteBtn: { backgroundColor: "#EF4444" },
});
