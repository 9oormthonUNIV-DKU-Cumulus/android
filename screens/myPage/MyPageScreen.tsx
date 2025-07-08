// import {View, Text} from 'react-native';

// export default function MyPageScreen() {
//   return (
//     <View>
//       <Text>마이페이지 화면</Text>
//     </View>
//   );
// }
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

/* ───── 타입 정의 ───── */
type RootStackParamList = {
  MyPageScreen: undefined;
  HomeScreen: undefined;
};
type MyPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MyPageScreen"
>;
interface Props {
  navigation: MyPageNavigationProp;
}

/* ───── 더미 유저 데이터 ───── */
const dummyUser = {
  name: "김단웅",
  gender: "여",
  age: 21,
  department: "커뮤니케이션 디자인",
  stats: { volunteer: 2, meetings: 5, replies: 2 },
};

/* ───── 메인 컴포넌트 ───── */
export default function MyPageScreen({ navigation }: Props) {
  const { name, gender, age, department, stats } = dummyUser;

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      {/* 프로필 */}
      <View style={styles.profileSection}>
        <Image
          style={styles.avatar}
          source={require("../../assets/images/avatar-placeholder.png")}
        />

        <View style={styles.profileTextWrapper}>
          <Text style={styles.userName}>
            {name} <Text style={styles.userAge}>({gender} / {age}세)</Text>
          </Text>

          {/* 학과 전공 */}
          <View style={styles.deptRow}>
            <Text style={styles.userLabel}>학과 </Text>
            <Text style={styles.userDept}>{department}</Text>
          </View>
        </View>
      </View>

      {/* 통계 카드 */}
      <View style={styles.statsCard}>
        <StatItem label="찜한 동아리" value={stats.volunteer} />
        <View style={styles.vertDivider} />
        <StatItem label="참여 모임" value={stats.meetings} />
        <View style={styles.vertDivider} />
        <StatItem label="참여 동아리" value={stats.replies} />
      </View>
    </SafeAreaView>
  );
}

/* ───── 하위 컴포넌트 ───── */
function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* ───── 스타일 ───── */
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  /* 헤더 */
  headerWrapper: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#E4E4E4",
    paddingHorizontal: 16,
  },
  backBtn: { position: "absolute", left: 16 },
  headerTitle: { fontFamily: "Pretendard-Bold", fontSize: 18, color: "#1C1C1C" },

  /* 프로필 */
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D9D9D9",
  },
  profileTextWrapper: { marginLeft: 16 },
  userName: { fontFamily: "Pretendard-Bold", fontSize: 22, color: "#1C1C1C" },
  userAge: { fontFamily: "Pretendard-Regular", fontSize: 18, color: "#6F6F6F" },

  /* 학과 한 줄 표현 */
  deptRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  userLabel: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#6F6F6F",
  },
  userDept: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: "#1C1C1C",
  },

  /* 통계 카드 */
  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  vertDivider: { width: 1, height: 40, backgroundColor: "#E4E4E4" },
  statItem: { flex: 1, alignItems: "center" },
  statValue: {
    fontFamily: "Pretendard-Bold",
    fontSize: 13,
    color: "#1C1C1C",
  },
  statLabel: {
    marginTop: 4,
    fontFamily: "Pretendard-Regular",
    fontSize: 10,
    color: "#6F6F6F",
  },
});

