// screens/myPage/ManagedMeetingsScreen.tsx
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

/* -------- 타입 -------- */
type Nav = NativeStackNavigationProp<RootStackParamList, 'ManagedMeetings'>;
interface Props { navigation: Nav; }

export type MeetingStatus = '예정' | '진행중' | '종료';
interface ManagedMeeting {
  id: string;
  clubName: string;
  title: string;
  dateText: string;      // 7/6 (일)
  timeRange: string;     // 14~16시
  applicants: number;    // 신청자 수
  capacity: number;      // 정원
  participants: number;  // 실제 참여
  status: MeetingStatus | string; // 혹시 다른 값이 들어와도 죽지 않게 string 허용
}

/* -------- 더미 데이터 -------- */
const dummyData: ManagedMeeting[] = [
  {
    id: 'm1',
    clubName: '런닝 동아리',
    title: '동아리 정기 모임',
    dateText: '7/6 (일)',
    timeRange: '14~16시',
    applicants: 3,
    capacity: 15,
    participants: 12,
    status: '예정',
  },
  {
    id: 'm2',
    clubName: '독서 동아리',
    title: '동아리 자유 모임',
    dateText: '7/3 (목)',
    timeRange: '14~16시',
    applicants: 1,
    capacity: 10,
    participants: 7,
    status: '종료',
  },
  {
    id: 'm3',
    clubName: '스터디 동아리',
    title: '주간 스터디',
    dateText: '7/23 (화)',
    timeRange: '19~21시',
    applicants: 5,
    capacity: 8,
    participants: 6,
    status: '진행중',
  },
];

/* -------- 메인 -------- */
export default function ManagedMeetingsScreen({ navigation }: Props) {
  const [list, setList] = useState(dummyData);

  const deleteMeeting = (id: string) => {
    Alert.alert('모임 삭제', '정말 삭제하시겠습니까?', [
      { text: '취소' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => setList(prev => prev.filter(m => m.id !== id)),
      },
    ]);
  };

  const goApplicants = (id: string) =>
    Alert.alert('참여자/신청자', `모임(${id}) 참여자/신청자 관리 화면 예정`);
  const goEdit = (id: string) =>
    Alert.alert('수정', `모임(${id}) 수정 화면 예정`);

  const renderItem = ({ item }: { item: ManagedMeeting }) => {
    const isEnded = item.status === '종료';

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.card, isEnded && { opacity: 0.6 }]}
        onPress={() => navigation.navigate('ParticipatingMeetings')}
      >
        {/* 상태/숫자 박스 */}
        <View style={styles.topRightBox}>
          <StatusBadge status={item.status} />
          <View style={styles.countBox}>
            <Text style={styles.countText}>신청 {item.applicants}</Text>
            <View style={styles.dot} />
            <Text style={styles.countText}>정원 {item.capacity}</Text>
            <View style={styles.dot} />
            <Text style={styles.countText}>참여 {item.participants}</Text>
          </View>
        </View>

        {/* 본문 텍스트 */}
        <Text style={styles.clubName}>[{item.clubName}]</Text>
        <View style={styles.rowInline}>
          <Text style={styles.mainTitle}>{item.title}</Text>
          <Text style={styles.dateText}>{item.dateText}</Text>
        </View>
        <Text style={styles.subText}>동아리 정기 모임 {item.timeRange}</Text>

        {/* 액션 버튼들 */}
        <View style={styles.btnRow}>
          <ActionBtn
            icon="people-outline"
            label={`신청자 ${item.applicants}`}
            onPress={() => goApplicants(item.id)}
            type="blue"
          />
          <ActionBtn
            icon="create-outline"
            label="수정"
            onPress={() => goEdit(item.id)}
            type="blue"
          />
          <ActionBtn
            icon="trash-outline"
            label="삭제"
            onPress={() => deleteMeeting(item.id)}
            type="red"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const Empty = () => (
    <View style={styles.emptyWrap}>
      <Ionicons name="clipboard-outline" size={40} color="#C7C7C7" />
      <Text style={styles.emptyTitle}>개설한 모임이 없어요</Text>
      <Text style={styles.emptySub}>새 모임을 개설해보세요!</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>개설 모임 관리</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        ListEmptyComponent={Empty}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* -------- 하위 컴포넌트 -------- */
function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, { bg: string; txt: string }> = {
    예정:   { bg: '#E6F0FF', txt: '#357CFF' },
    진행중: { bg: '#FFF4D9', txt: '#D9A02B' },
    종료:   { bg: '#E9F9EF', txt: '#22A064' },
  };

  const c = map[status ?? ''] ?? { bg: '#EEEEEE', txt: '#888888' };

  return (
    <View style={[styles.statusBadge, { backgroundColor: c.bg }]}>
      <Text style={[styles.statusText, { color: c.txt }]}>{status ?? '상태미정'}</Text>
    </View>
  );
}

function ActionBtn({
  icon,
  label,
  onPress,
  type,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  type: 'blue' | 'red';
}) {
  const isRed = type === 'red';
  return (
    <TouchableOpacity
      style={[
        styles.actionBtn,
        isRed ? { backgroundColor: '#FDECEC' } : { backgroundColor: '#E6F0FF' },
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={13} color={isRed ? '#E24D4D' : '#357CFF'} />
      <Text
        style={[
          styles.actionBtnText,
          isRed ? { color: '#E24D4D' } : { color: '#357CFF' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* -------- 스타일 -------- */
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    padding: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  topRightBox: {
    position: 'absolute',
    right: 16,
    top: 16,
    alignItems: 'flex-end',
  },
  countBox: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: { fontSize: 10, color: '#6F6F6F' },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: '#6F6F6F',
    marginHorizontal: 4,
    borderRadius: 1,
  },

  clubName: { fontSize: 13, fontWeight: '700', color: '#1C1C1C', marginBottom: 4 },
  rowInline: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 2 },
  mainTitle: { fontSize: 13, fontWeight: '700', color: '#1C1C1C', marginRight: 8 },
  dateText: { fontSize: 11, color: '#6F6F6F' },
  subText: { fontSize: 11, color: '#6F6F6F', marginBottom: 14 },

  btnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  actionBtnText: { marginLeft: 4, fontSize: 11, fontWeight: '600' },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: { fontSize: 11, fontWeight: '600' },

  emptyWrap: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { marginTop: 12, fontSize: 16, fontWeight: '700', color: '#1C1C1C' },
  emptySub: { marginTop: 6, fontSize: 12, color: '#6F6F6F' },
});
