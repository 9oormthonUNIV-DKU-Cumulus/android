import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import type { Club } from "../../App";

type Props = {
  club: Club;
};
const AVATAR = require("../../assets/images/avatar-placeholder.png");

export default function HomeTabContent({ club }: Props) {
  return (
    <ScrollView style={styles.content}>
      {/* 소개 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>소개</Text>
        <Text style={styles.introTxt}>{club.clubDesc}</Text>
      </View>

      {/* 모임장 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>회장</Text>
        <View style={styles.leaderRow}>
          <Image source={AVATAR} style={styles.leaderAvatar} />
          <View>
            <Text style={styles.leaderName}>{club.leader.memberName}</Text>
            {/* <Text style={styles.leaderIntro}>{MEETING.leader.intro}</Text> 개설자 연락처로 대체 */}
          </View>
        </View>
      </View>

      {/* 멤버 */}
      <View style={styles.section}>
        <SectionHeader title={`동아리 멤버 ${club.memberCount}`} />

        <View style={styles.memberItem}>
          <Image source={AVATAR} style={styles.memberAvatar} />
          <View>
            <Text style={styles.memberName}>크루 멤버</Text>
            {/* <Text style={styles.memberIntro}>크루 소개글</Text> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

/* ───────────────────────── 보조 컴포넌트 */
function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.moreTxt}>전체보기 〉</Text>
      </TouchableOpacity>
    </View>
  );
}
/* ───────────────────────── 스타일 */
const GREY = "#6B7280";

const styles = StyleSheet.create({
  /* 본문 공통 */
  content: { backgroundColor: "#F5F7FA" },
  section: { backgroundColor: "#fff", padding: 20, marginBottom: 8 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1F2937" },
  moreTxt: { fontSize: 14, color: GREY },

  introTxt: {
    fontSize: 12,
    lineHeight: 24,
    color: "#374151",
    marginTop: 12,
    marginBottom: 16,
  },

  /* 모임장 */
  leaderRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  leaderAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E5E7EB",
    marginRight: 12,
    marginTop: 14,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 14,
    marginLeft: 10,
    marginBottom: 2,
  },
  leaderIntro: {
    fontSize: 13,
    color: GREY,
    marginTop: 2,
    marginLeft: 10,
    marginBottom: 2,
  },

  /* 멤버 */
  memberItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 12,
  },
  memberName: { fontSize: 15, fontWeight: "600", color: "#1F2937" },
  memberIntro: { fontSize: 13, color: GREY },
});
