// screens/myPage/MyPageScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type MyPageNav = NativeStackNavigationProp<RootStackParamList, 'Main'>;
interface Props { navigation: MyPageNav; }

/* -------- 더미 -------- */
const dummyUser = {
  name: '김단웅',
  gender: '여',
  age: 21,
  department: '커뮤니케이션 디자인',
  stats: { like: 2, manage: 1, joined: 5, clubJoined: 2 },
};

type ApplyStatus = '승인 대기' | '승인 완료' | '승인 거절';
interface ApplyItem {
  id: string;
  title: string;
  place: string;
  time: string;
  members: string;
  status: ApplyStatus;
}
const dummyApplies: ApplyItem[] = [
  { id: '1', title: '단국대 운동 동아리', place: '수업 끝나고 7시부터 9시까지', time: '독서/글 · 멤버 45', members: '2명 / 45명', status: '승인 대기' },
  { id: '2', title: '단국대 운동 동아리', place: '수업 끝나고 7시부터 9시까지', time: '독서/글 · 멤버 45', members: '2명 / 45명', status: '승인 거절' },
];

/* -------- 메인 -------- */
export default function MyPageScreen({ navigation }: Props) {
  const { name, gender, age, department, stats } = dummyUser;

  const [likedIds, setLikedIds] = useState<string[]>([]);
  const toggleLike = (id: string) =>
    setLikedIds(prev => (prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]));

  const onCancel = (id: string) => {
    Alert.alert('신청 취소', '정말 취소하시겠어요?', [
      { text: '아니오' },
      { text: '예', style: 'destructive', onPress: () => console.log('cancel:', id) },
    ]);
  };

  const goFavorites = () => navigation.navigate('Favorites'); // 찜 동아리 화면

  const renderItem = ({ item }: { item: ApplyItem }) => {
    const liked = likedIds.includes(item.id);
    return (
      <View style={styles.applyCard}>
        <View style={styles.thumbWrap}>
          <View style={styles.applyThumb} />
          <TouchableOpacity
            style={styles.heartBtn}
            onPress={() => toggleLike(item.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={16}
              color={liked ? '#FF4D4D' : '#C7C7C7'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.applyInfo}>
          <Text style={styles.applyTitle}>{item.title}</Text>
          <Text style={styles.applySub}>{item.place}</Text>
          <Text style={styles.applySub}>{item.time}</Text>
        </View>

        <View style={styles.applyRight}>
          <StatusBadge status={item.status} />
          <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel(item.id)}>
            <Text style={styles.cancelBtnText}>신청 취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /* 통계 데이터 배열화 */
  const statItems = [
    { key: 'like', label: '찜 동아리', value: stats.like, onPress: goFavorites },
    { key: 'manage', label: '개설 모임 관리', value: stats.manage },
    { key: 'joined', label: '참여 모임', value: stats.joined },
    { key: 'clubJoined', label: '참여 동아리', value: stats.clubJoined },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      <FlatList
        data={dummyApplies}
        keyExtractor={i => i.id}
        ListHeaderComponent={
          <>
            {/* 프로필 */}
            <View style={styles.profileSection}>
              <Image
                style={styles.avatar}
                source={require('../../assets/images/avatar-placeholder.png')}
              />
              <View style={styles.profileTextWrapper}>
                <Text style={styles.userName}>
                  {name} <Text style={styles.userAge}>({gender} / {age}세)</Text>
                </Text>
                <View style={styles.deptRow}>
                  <Text style={styles.userLabel}>학과 </Text>
                  <Text style={styles.userDept}>{department}</Text>
                </View>
              </View>
            </View>

            {/* 통계 카드 - 균등 너비 */}
            <View style={styles.statsCard}>
              {statItems.map((item, idx) => (
                <React.Fragment key={item.key}>
                  <TouchableOpacity
                    style={styles.statCell}
                    activeOpacity={item.onPress ? 0.6 : 1}
                    onPress={item.onPress}
                  >
                    <Text style={styles.statValue}>{item.value}</Text>
                    <Text style={styles.statLabel}>{item.label}</Text>
                  </TouchableOpacity>
                  {idx !== statItems.length - 1 && <View style={styles.vertDivider} />}
                </React.Fragment>
              ))}
            </View>

            <Text style={styles.sectionTitle}>동아리 신청 내역</Text>
          </>
        }
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* -------- 컴포넌트 -------- */
function StatusBadge({ status }: { status: ApplyStatus }) {
  const map: Record<ApplyStatus, { bg: string; txt: string }> = {
    '승인 대기': { bg: '#E6F0FF', txt: '#357CFF' },
    '승인 완료': { bg: '#E9F9EF', txt: '#22A064' },
    '승인 거절': { bg: '#FDECEC', txt: '#E24D4D' },
  };
  const c = map[status];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeText, { color: c.txt }]}>{status}</Text>
    </View>
  );
}

/* -------- 스타일 -------- */
const { width: W } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },

  headerWrapper: {
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

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#D9D9D9' },
  profileTextWrapper: { marginLeft: 16 },
  userName: { fontSize: 20, fontWeight: '700', color: '#1C1C1C' },
  userAge: { fontSize: 16, fontWeight: '400', color: '#6F6F6F' },
  deptRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  userLabel: { fontSize: 14, color: '#6F6F6F' },
  userDept: { fontSize: 12, fontWeight: '600', color: '#1C1C1C' },

  /* 통계 카드 */
  statsCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 12,
    overflow: 'hidden',
  },
  statCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  vertDivider: { width: 1, backgroundColor: '#E4E4E4' },
  statValue: { fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  statLabel: { marginTop: 2, fontSize: 10, color: '#6F6F6F', textAlign: 'center' },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    marginHorizontal: 24,
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1C',
  },

  applyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  thumbWrap: { marginRight: 12, position: 'relative' },
  applyThumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#D9D9D9' },
  heartBtn: {
    position: 'absolute',
    left: -8,
    bottom: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  applyInfo: { flex: 1 },
  applyTitle: { fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  applySub: { fontSize: 11, color: '#6F6F6F', marginTop: 2 },

  applyRight: { alignItems: 'flex-end', justifyContent: 'space-between', height: 56 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  badgeText: { fontSize: 11, fontWeight: '600' },

  cancelBtn: {
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#357CFF',
  },
  cancelBtnText: { color: '#fff', fontSize: 11, fontWeight: '600' },
});
