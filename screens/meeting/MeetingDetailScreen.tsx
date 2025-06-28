// screens/MeetingDetailScreen.tsx
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
  Dimensions,
} from "react-native";

/* ─────────────────────────────── 상수 */
const STATUS_BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const { width }  = Dimensions.get("window");

/* 이미지 & 아이콘 ── 📂 android/assets/images */
const AVATAR         = require("../../assets/images/avatar-placeholder.png");
const BANNER_DEFAULT = require("../../assets/images/banner-placeholder.png");
const HEART_ICON     = require("../../assets/images/heart2.png");     // ← 하단 “좋아요” 아이콘
const BELL_ICON      = require("../../assets/images/bell.png");
const BACK_ICON      = require("../../assets/images/backback.png");
const CERT_ICON      = require("../../assets/images/certified.png");
const GOOD_ICON      = require("../../assets/images/good.png");
const TALK_ICON      = require("../../assets/images/talk.png");

/* ─────────────────────────────── 데모 데이터 */
const MEETING = {
  name: "단국대 스포츠 모임 1",
  members: 45,
  active: "26분 전 활동",
  intro: `"함께하는 스포츠, 함께 성장하는"

우리 단국대학교 스포츠 모임은 다양한 운동과 스포츠 활동을 통해
학생들이 건강하고 즐거운 대학 생활을 할 수 있는 모임입니다.
운동을 좋아하는 사람, 처음 시작하는 사람도 환영합니다.`,
  tags: ["단국대", "봉사", "20~30세"],
  leader: { name: "김단웅", intro: "안녕하세요 김단웅입니다" },
  posts: 53,
  schedules: [
    { date: "7월 16일", title: "크루에게만 공개된 일정이에요", status: "모집중", time: "오전 08:12", count: "3/20명" },
    { date: "7월 18일", title: "서울 반려동물 봉사활동 모집",  status: "모집중", time: "오전 08:12", count: "3/20명" },
  ],
};

/* ─────────────────────────────── 메인 스크린 */
export default function MeetingDetailScreen() {
  const [tab,    setTab] = useState<"홈" | "게시판" | "일정" | "앨범">("홈");
  const [joined, setJoin] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      {/* ─── 배너 + 헤더 ─── */}
      <View style={styles.banner}>
        <Image source={BANNER_DEFAULT} style={styles.bannerImg} />

        <TouchableOpacity style={styles.backBtn}>
          <Image source={BACK_ICON} style={styles.headerIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.alarmBtn}>
          <Image source={BELL_ICON} style={styles.headerIcon} />
          <View style={styles.badge}><Text style={styles.badgeTxt}>3</Text></View>
        </TouchableOpacity>
      </View>

      {/* ─── 프로필 카드 (화면 가득) ─── */}
      <View style={styles.profileCard}>
        <Image source={AVATAR} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.meetingName}>{MEETING.name}</Text>
          <Text style={styles.memberLine}>
            <Text style={styles.memberGrey}>멤버 {MEETING.members} · </Text>
            <Text style={styles.memberBlue}>{MEETING.active}</Text>
          </Text>
        </View>
      </View>

      {/* ─── 탭 바 ─── */}
      <View style={styles.tabRow}>
        {["홈", "게시판", "일정", "앨범"].map((t) => (
          <TouchableOpacity
            key={t}
            style={styles.tabBtn}
            onPress={() => setTab(t as any)}
          >
            <Text style={[styles.tabTxt, tab === t && styles.tabTxtActive]}>{t}</Text>
            {tab === t && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* ─── 본문 ─── */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {tab === "홈" ? <HomeTabContent /> : <TabPlaceholder label={tab} />}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ─── 하단 좋아요 + 가입 버튼 ─── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.likeBtn}>
          <Image source={HEART_ICON} style={styles.likeIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinBtn} onPress={() => setJoin(!joined)}>
          <Text style={styles.joinTxt}>{joined ? "가입취소" : "가입하기"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ─────────────────────────────── 홈 탭 내용 */
function HomeTabContent() {
  return (
    <View style={styles.content}>
      {/* 소개 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>소개</Text>
        <Text style={styles.introTxt}>{MEETING.intro}</Text>
        <View style={styles.tagRow}>
          {MEETING.tags.map((tg) => (
            <View key={tg} style={styles.tagChip}><Text style={styles.tagTxt}>{tg}</Text></View>
          ))}
        </View>
      </View>

      {/* 모임장 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>모임장</Text>
        <View style={styles.leaderRow}>
          <Image source={AVATAR} style={styles.leaderAvatar} />
          <View>
            <Text style={styles.leaderName}>{MEETING.leader.name}</Text>
            <Text style={styles.leaderIntro}>{MEETING.leader.intro}</Text>
            <View style={styles.verifyRow}>
              <Image source={CERT_ICON} style={styles.certIcon} />
              <Text style={styles.verifyTxt}>본인인증 완료</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 멤버 요약 */}
      <View style={styles.section}>
        <SectionHeader title={`모임 멤버 ${MEETING.members}`} />
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.memberItem}>
            <Image source={AVATAR} style={styles.memberAvatar} />
            <View>
              <Text style={styles.memberName}>크루 멤버 {i}</Text>
              <Text style={styles.memberIntro}>크루 소개글</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 게시판 요약 */}
      <View style={styles.section}>
        <SectionHeader title={`게시판 ${MEETING.posts}`} />
        <View style={styles.postItem}>
          <Image source={AVATAR} style={styles.postAvatar} />
          <View style={styles.postContent}>
            <Text style={styles.postWriter}>김단웅</Text>
            <Text style={styles.postTime}>1시간 전</Text>
            <Text style={styles.postText} numberOfLines={2}>
              커뮤니티 글 내용 적기 커뮤니티 글 내용 적기{"\n"}
              커뮤니티 글 내용 적기 커뮤니티 글 내용 적기
            </Text>
            <View style={styles.postReactions}>
              <Image source={GOOD_ICON} style={styles.reactionIcon} />
              <Text style={styles.postMeta}>50</Text>
              <Image source={TALK_ICON} style={[styles.reactionIcon, { marginLeft: 16 }]} />
              <Text style={styles.postMeta}>50</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 일정 요약 */}
      <View style={styles.section}>
        <SectionHeader title={`일정 ${MEETING.schedules.length}`} />
        {MEETING.schedules.map((s, idx) => {
          const [month, day] = s.date.replace("일", "").split(" ");
          return (
            <View key={idx} style={styles.scheduleItem}>
              <View style={styles.dateBox}>
                <Text style={styles.monthTxt}>{month}</Text>
                <Text style={styles.dayTxt}>{day}</Text>
              </View>
              <View style={styles.scheduleContent}>
                <Text style={styles.scheduleTitle}>{s.title}</Text>
                <Text style={styles.scheduleStatus}>{s.status}</Text>
                <Text style={styles.scheduleTime}>{`${s.time} · ${s.count}`}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/* ─────────────────────────────── 보조 컴포넌트 */
function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity><Text style={styles.moreTxt}>전체보기 〉</Text></TouchableOpacity>
    </View>
  );
}
function TabPlaceholder({ label }: { label: string }) {
  return (
    <View style={styles.placeholderWrap}>
      <Text style={styles.placeholderTxt}>{`${label} 탭은 추후 구현됩니다.`}</Text>
    </View>
  );
}

/* ─────────────────────────────── 스타일 */
const GREY      = "#6B7280";
const LIGHTGREY = "#9CA3AF";
const BLUE      = "#3B82F6";

const styles = StyleSheet.create({
  root:{ flex:1, backgroundColor:"#F5F7FA" },

  /* 배너 */
  banner:{ width, height: width*0.5, backgroundColor:"#E5EFFF" },
  bannerImg:{ width:"100%", height:"100%", resizeMode:"cover" },
  backBtn:{ position:"absolute", top:STATUS_BAR+16, left:16, width:32, height:32,
            justifyContent:"center", alignItems:"center" },
  alarmBtn:{ position:"absolute", top:STATUS_BAR+16, right:16, width:32, height:32,
             justifyContent:"center", alignItems:"center" },
  headerIcon:{ width:24, height:24, tintColor:"#fff" },
  badge:{ position:"absolute", top:-3, right:-3, width:18, height:18, borderRadius:9,
          backgroundColor:"#EF4444", justifyContent:"center", alignItems:"center" },
  badgeTxt:{ color:"#fff", fontSize:11, fontWeight:"700" },

  /* 프로필 카드 (화면 가득) */
  profileCard:{ flexDirection:"row", alignItems:"center", padding:20, backgroundColor:"#fff",
                marginTop:-30, width:"100%" },
  avatar:{ width:80, height:80, borderRadius:40, backgroundColor:"#E5E7EB", marginRight:16 },
  meetingName:{ fontSize:20, fontWeight:"700", color:"#1F2937" },
  memberLine:{ flexDirection:"row", marginTop:4 },
  memberGrey:{ fontSize:14, color:GREY },
  memberBlue:{ fontSize:14, color:BLUE },

  /* 탭 */
  tabRow:{ flexDirection:"row", backgroundColor:"#fff", paddingTop:8 },
  tabBtn:{ flex:1, alignItems:"center", paddingVertical:12 },
  tabTxt:{ fontSize:16, color:LIGHTGREY, fontWeight:"500" },
  tabTxtActive:{ color:BLUE, fontWeight:"700" },
  tabUnderline:{ position:"absolute", bottom:0, width:"80%", height:3, backgroundColor:BLUE, borderRadius:1.5 },

  /* 본문 공통 */
  content:{ backgroundColor:"#F5F7FA" },
  section:{ backgroundColor:"#fff", padding:20, marginBottom:8 },
  sectionHeader:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:16 },
  sectionTitle:{ fontSize:18, fontWeight:"700", color:"#1F2937" },
  moreTxt:{ fontSize:14, color:GREY },

  introTxt:{ fontSize:15, lineHeight:24, color:"#374151", marginTop:12, marginBottom:16 },

  tagRow:{ flexDirection:"row", flexWrap:"wrap" },
  tagChip:{ backgroundColor:"#E5E7EB", borderRadius:16, paddingHorizontal:12, paddingVertical:4,
            marginRight:8, marginBottom:8 },
  tagTxt:{ fontSize:13, color:GREY },

  /* 모임장 */
  leaderRow:{ flexDirection:"row", alignItems:"center" },
  leaderAvatar:{ width:56, height:56, borderRadius:28, backgroundColor:"#E5E7EB", marginRight:12 },
  leaderName:{ fontSize:16, fontWeight:"600", color:"#1F2937" },
  leaderIntro:{ fontSize:14, color:GREY, marginTop:2 },
  verifyRow:{ flexDirection:"row", alignItems:"center", marginTop:4 },
  certIcon:{ width:14, height:14, marginRight:4 },
  verifyTxt:{ fontSize:12, color:GREY },

  /* 멤버 */
  memberItem:{ flexDirection:"row", alignItems:"center", marginBottom:12 },
  memberAvatar:{ width:40, height:40, borderRadius:20, backgroundColor:"#E5E7EB", marginRight:12 },
  memberName:{ fontSize:15, fontWeight:"600", color:"#1F2937" },
  memberIntro:{ fontSize:13, color:GREY },

  /* 게시판 */
  postItem:{ flexDirection:"row" },
  postAvatar:{ width:44, height:44, borderRadius:22, backgroundColor:"#E5E7EB", marginRight:12 },
  postContent:{ flex:1 },
  postWriter:{ fontSize:15, fontWeight:"600", color:"#1F2937" },
  postTime:{ fontSize:12, color:LIGHTGREY, marginBottom:4 },
  postText:{ fontSize:14, color:"#374151", lineHeight:20, marginBottom:8 },
  postReactions:{ flexDirection:"row", alignItems:"center" },
  reactionIcon:{ width:16, height:16, tintColor:GREY },
  postMeta:{ fontSize:13, color:GREY, marginLeft:4 },

  /* 일정 */
  scheduleItem:{ flexDirection:"row", alignItems:"center", marginBottom:12 },
  dateBox:{ width:48, height:48, borderRadius:8, backgroundColor:"#EFF6FF",
            justifyContent:"center", alignItems:"center", marginRight:12 },
  monthTxt:{ fontSize:11, color:BLUE, lineHeight:13 },
  dayTxt:{ fontSize:18, fontWeight:"700", color:BLUE, lineHeight:22 },
  scheduleContent:{ flex:1 },
  scheduleTitle:{ fontSize:15, fontWeight:"600", color:"#1F2937", marginBottom:2 },
  scheduleStatus:{ fontSize:13, color:BLUE, marginBottom:2 },
  scheduleTime:{ fontSize:13, color:GREY },

  /* 다른 탭 Placeholder */
  placeholderWrap:{ height:300, justifyContent:"center", alignItems:"center" },
  placeholderTxt:{ fontSize:16, color:LIGHTGREY },

  /* 하단 바 */
  bottomBar:{ flexDirection:"row", alignItems:"center",
              paddingHorizontal:16, paddingVertical:10,
              backgroundColor:"#fff", borderTopWidth:1, borderColor:"#E5E7EB" },
  likeBtn:{ width:48, height:48, borderRadius:24, backgroundColor:"#F3F4F6",
            justifyContent:"center", alignItems:"center", marginRight:12 },
  likeIcon:{ width:24, height:24 },                   // heart2.png 자체 색상 사용
  joinBtn:{ flex:1, height:48, borderRadius:24, backgroundColor:BLUE,
            justifyContent:"center", alignItems:"center" },
  joinTxt:{ color:"#fff", fontSize:16, fontWeight:"600" },
});
