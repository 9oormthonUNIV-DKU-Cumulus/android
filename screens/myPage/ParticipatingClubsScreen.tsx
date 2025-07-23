// screens/myPage/ParticipatingClubsScreen.tsx
import React, { useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

/* ---------- 타입 ---------- */
type Nav = NativeStackNavigationProp<RootStackParamList, 'ParticipatingClubs'>;
interface Props { navigation: Nav; }

type ClubRole = '회장' | '집행부' | '부원';
interface ClubItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  members: number;
  role: ClubRole;
  liked: boolean;
  pendingApplicants: number;
}

/* ---------- 더미 ---------- */
const dummyClubs: ClubItem[] = [
  {
    id: '1',
    title: '단국대 운동 동아리',
    desc: '수업 끝나고 7시부터 9시까지',
    category: '스포츠',
    members: 45,
    role: '부원',
    liked: false,
    pendingApplicants: 0,
  },
  {
    id: '2',
    title: '단국대 창업 동아리',
    desc: '매주 월요일 비즈니스 모델 회의',
    category: '창업/경영',
    members: 28,
    role: '집행부',
    liked: true,
    pendingApplicants: 2,
  },
  {
    id: '3',
    title: '단국대 디자인 동아리',
    desc: '월 1회 전시 준비, 매주 수요일 아이디어 워크숍',
    category: '디자인/예술',
    members: 18,
    role: '회장',
    liked: false,
    pendingApplicants: 5,
  },
];

/* ---------- 메인 ---------- */
export default function ParticipatingClubsScreen({ navigation }: Props) {
  const [list, setList] = useState(dummyClubs);

  const toggleLike = (id: string) =>
    setList(p => p.map(c => (c.id === id ? { ...c, liked: !c.liked } : c)));

  const leaveClub = (id: string) =>
    Alert.alert('동아리 탈퇴', '정말 탈퇴하시겠어요?', [
      { text: '취소' },
      { text: '탈퇴', style: 'destructive', onPress: () => setList(p => p.filter(v => v.id !== id)) },
    ]);

  const goApplicants = (id: string) =>
    Alert.alert('신청자 관리', `동아리(${id}) 신청자 관리 화면 예정`);
  const goEditClub = (id: string) =>
    Alert.alert('동아리 수정', `동아리(${id}) 정보 수정 화면 예정`);
  const goNotice = (id: string) =>
    Alert.alert('공지 작성', `동아리(${id}) 공지 작성 화면 예정`);

  const renderItem = ({ item }: { item: ClubItem }) => {
    const isManager = item.role === '회장' || item.role === '집행부';

    return (
      <View style={styles.card}>
        {/* 하트 */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleLike(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={item.liked ? 'heart' : 'heart-outline'}
            size={18}
            color={item.liked ? '#FF4D4D' : '#C7C7C7'}
          />
        </TouchableOpacity>

        {/* 썸네일 */}
        <View style={styles.thumb} />

        {/* 정보 */}
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
          <Text style={styles.meta}>
            {item.category}  ·  멤버 {item.members}
          </Text>

          {/* 버튼/배지 영역 */}
          <View style={styles.bottomRow}>
            <RoleBadge role={item.role} />

            {isManager && (
              <>
                {item.pendingApplicants > 0 && (
                  <TouchableOpacity
                    style={[styles.adminBtn, styles.redBg]}
                    onPress={() => goApplicants(item.id)}
                  >
                    <Ionicons name="people-outline" size={14} color="#E24D4D" />
                    <Text style={[styles.adminBtnText, { color: '#E24D4D' }]}>
                      신청자 {item.pendingApplicants}
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.adminBtn} onPress={() => goEditClub(item.id)}>
                  <Ionicons name="create-outline" size={14} color="#357CFF" />
                  <Text style={styles.adminBtnText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.adminBtn} onPress={() => goNotice(item.id)}>
                  <Ionicons name="megaphone-outline" size={14} color="#357CFF" />
                  <Text style={styles.adminBtnText}>공지</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.smallBtn}
              onPress={() => Alert.alert('채팅', '채팅 화면 이동 예정')}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={14} color="#357CFF" />
              <Text style={styles.smallBtnText}>채팅</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.smallBtn, { backgroundColor: '#FDECEC' }]}
              onPress={() => leaveClub(item.id)}
            >
              <Ionicons name="log-out-outline" size={14} color="#E24D4D" />
              <Text style={[styles.smallBtnText, { color: '#E24D4D' }]}>탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const Empty = () => (
    <View style={styles.emptyWrap}>
      <Ionicons name="people-outline" size={40} color="#C7C7C7" />
      <Text style={styles.emptyTitle}>참여 중인 동아리가 없어요</Text>
      <Text style={styles.emptySub}>관심 있는 동아리를 찾아 가입해보세요!</Text>
      <TouchableOpacity
        style={styles.goFindBtn}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.goFindText}>동아리 찾으러 가기</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>참여 동아리</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        ListEmptyComponent={Empty}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ---------- 서브 ---------- */
function RoleBadge({ role }: { role: ClubRole }) {
  const map: Record<ClubRole, { bg: string; txt: string }> = {
    회장:   { bg: '#FFF4D9', txt: '#D9A02B' },
    집행부: { bg: '#E6F0FF', txt: '#357CFF' },
    부원:   { bg: '#E9F9EF', txt: '#22A064' },
  };
  const c = map[role];
  return (
    <View style={[styles.roleBadge, { backgroundColor: c.bg }]}>
      <Text style={[styles.roleText, { color: c.txt }]}>{role}</Text>
    </View>
  );
}

/* ---------- 스타일 ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E4E4E4',
    paddingHorizontal: 16,
  },
  backBtn: { position: 'absolute', left: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1C' },

  card: {
    position: 'relative',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    backgroundColor: '#FFF',
    marginBottom: 0,
  },
  heartBtn: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#D9D9D9',
    marginRight: 12,
  },
  info: {
    flex: 1,
    paddingRight: 40, // 하트 공간 확보
  },
  title: { fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  desc: { fontSize: 11, color: '#6F6F6F', marginTop: 4 },
  meta: { fontSize: 11, color: '#6F6F6F', marginTop: 2 },

  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',        // ★ 줄바꿈 허용
    alignItems: 'center',
    gap: 6,                  // RN 0.71+ 지원, 안되면 각 버튼 marginRight/Bottom
    maxWidth: '100%',        // 오버플로우 방지
  },

  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  roleText: { fontSize: 10, fontWeight: '600' },

  adminBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E6F0FF',
    marginRight: 6,
    marginBottom: 6,
  },
  redBg: { backgroundColor: '#FFF0F0' },
  adminBtnText: { marginLeft: 3, fontSize: 10, fontWeight: '600', color: '#357CFF' },

  smallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#E6F0FF',
    marginRight: 6,
    marginBottom: 6,
  },
  smallBtnText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#357CFF',
  },

  emptyWrap: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { marginTop: 12, fontSize: 16, fontWeight: '700', color: '#1C1C1C' },
  emptySub: { marginTop: 6, fontSize: 12, color: '#6F6F6F' },
  goFindBtn: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: '#357CFF',
  },
  goFindText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
