import React, { useState } from "react";
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
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../../App";
import PlanTabContent from "./PlanTabContent";
import NoticeTabContent from "./NoticeTabContent";
import HomeTabContent from "./HomeTabContent";
import AlbumTabContent from "./AlbumTabContent";

/* ───────────────────────── 상수 / 리소스 */
const STATUS_BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const { width } = Dimensions.get("window");

const AVATAR = require("../../assets/images/avatar-placeholder.png");
const BANNER_DEFAULT = require("../../assets/images/banner-placeholder.png");
const HEART_ICON = require("../../assets/images/heart2.png");
const BACK_ICON = require("../../assets/images/go-back-white.png");

/* ───────────────────────── 타입 */
type Props = NativeStackScreenProps<HomeStackParamList, "MeetingDetail">;

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
export default function MeetingDetailScreen({ navigation }: Props) {
  const [tab, setTab] = useState<"홈" | "공지" | "일정" | "앨범">("홈");
  const [joined, setJoin] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      {/* ─── 배너 + 헤더 ─── */}
      <View style={styles.banner}>
        <Image source={BANNER_DEFAULT} style={styles.bannerImg} />

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={BACK_ICON} style={styles.goBackImg} />
        </TouchableOpacity>
      </View>

      {/* ─── 프로필 카드 ─── */}
      <View style={styles.profileCard}>
        <Image source={AVATAR} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.meetingName}>{MEETING.name}</Text>
          <Text style={styles.memberLine}>
            <Text style={styles.memberGrey}>멤버 {MEETING.members}</Text>
          </Text>
        </View>
      </View>

      {/* ─── 탭 바 ─── */}
      <View style={styles.tabRow}>
        {["홈", "공지", "일정", "앨범"].map((t) => (
          <TouchableOpacity
            key={t}
            style={styles.tabBtn}
            onPress={() => setTab(t as any)}
          >
            <Text style={[styles.tabTxt, tab === t && styles.tabTxtActive]}>
              {t}
            </Text>
            {tab === t && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* ─── 본문 ─── */}
      {tab === "홈" && <HomeTabContent />}
      {tab === "일정" && <PlanTabContent />}
      {tab === "공지" && <NoticeTabContent />}
      {tab === "앨범" && <AlbumTabContent />}

      {/* ─── 하단 바 ─── */}
      {tab === "홈" && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.likeBtn}>
            <Image source={HEART_ICON} style={styles.likeIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.joinBtn}
            onPress={() => navigation.navigate("MeetingApply")}
          >
            <Text style={styles.joinTxt}>
              {joined ? "가입취소" : "가입하기"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

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
});
