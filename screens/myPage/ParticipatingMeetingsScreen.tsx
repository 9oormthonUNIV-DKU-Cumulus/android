import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { cancelApplication } from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* ---------- 타입 ---------- */
type Nav = NativeStackNavigationProp<RootStackParamList, 'ParticipatingMeetings'>;
interface Props { navigation: Nav; }

interface ApplicationItem {
  id: number; // 신청 ID (applicationId)
  title: string;
  timeRange: string;
  dateText: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
}

/* ---------- 목업 데이터 (API 연동 전 임시 사용) ---------- */
const mockApplications: ApplicationItem[] = [
  { id: 101, title: '농구 동아리 주말 경기', timeRange: '14~16시', dateText: '8/10(토) 오후 14:00', status: 'PENDING' },
  { id: 102, title: '코딩 스터디 그룹', timeRange: '19~21시', dateText: '8/12(월) 오후 19:00', status: 'APPROVED' },
  { id: 103, title: '영화 감상 모임', timeRange: '20~22시', dateText: '8/14(수) 오후 20:00', status: 'PENDING' },
  { id: 104, title: '봉사 활동', timeRange: '09~12시', dateText: '8/17(토) 오전 09:00', status: 'REJECTED' },
];

/* ---------- 컴포넌트 ---------- */
export default function ParticipatingMeetingsScreen({ navigation }: Props) {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null); // 로딩 중인 항목의 ID

  useEffect(() => {
    // TODO: 실제로는 여기서 API를 호출하여 신청 목록을 가져와야 합니다.
    // 예: fetchMyApplications().then(data => setApplications(data));
    setApplications(mockApplications);
  }, []);

  const getAuthToken = async () => {
    // 실제 구현 시 AsyncStorage에서 사용자 토큰을 가져와야 합니다.
    return "your_hardcoded_user_access_token_for_testing";
  };

  const handleCancel = (item: ApplicationItem) => {
    Alert.alert(
      "신청 취소",
      `'${item.title}' 신청을 정말로 취소하시겠습니까?`,
      [
        { text: "닫기", style: "cancel" },
        {
          text: "확인",
          style: "destructive",
          onPress: async () => {
            setLoadingId(item.id);
            try {
              const token = await getAuthToken();
              if (!token) {
                Alert.alert("인증 오류", "로그인이 필요합니다.");
                return;
              }
              await cancelApplication(item.id, token);
              Alert.alert("성공", "신청이 취소되었습니다.");
              setApplications(prev => prev.filter(app => app.id !== item.id));
            } catch (error: any) {
              let errorMessage = "알 수 없는 오류가 발생했습니다.";
              if (error.response?.data?.error) {
                const { code, message } = error.response.data.error;
                switch (code) {
                  case 'NOT_OWNER': errorMessage = '본인 신청만 취소할 수 있습니다.'; break;
                  case 'ALREADY_APPROVED': errorMessage = '이미 승인되어 취소할 수 없습니다.'; break;
                  case 'ALREADY_REJECTED': errorMessage = '이미 거부된 신청입니다.'; break;
                  case 'ALREADY_CANCELED': errorMessage = '이미 취소된 신청입니다.'; break;
                  case 'NOT_FOUND': errorMessage = '신청 내역을 찾을 수 없습니다.'; break;
                  default: errorMessage = message;
                }
              }
              Alert.alert("오류", errorMessage);
            } finally {
              setLoadingId(null);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: ApplicationItem }) => {
    const isPending = item.status === 'PENDING';
    const isLoading = loadingId === item.id;

    const statusInfo = {
      PENDING: { text: '승인 대기중', color: '#F59E0B' },
      APPROVED: { text: '참여 확정', color: '#10B981' },
      REJECTED: { text: '거부됨', color: '#EF4444' },
      CANCELED: { text: '취소됨', color: '#6B7280' },
    }[item.status];

    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.itemTitle}>
            {item.title} <Text style={styles.itemTime}>{item.timeRange}</Text>
          </Text>
          <Text style={styles.itemLabel}>
            일시 <Text style={styles.itemDate}>{item.dateText}</Text>
          </Text>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
        </View>
        {isPending && (
          <TouchableOpacity
            style={[styles.cancelBtn, isLoading && styles.cancelBtnDisabled]}
            onPress={() => handleCancel(item)}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.cancelBtnText}>취소하기</Text>}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ... (기존 헤더) ... */}
      <FlatList
        data={applications}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

/* ---------- 스타일 ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { /* ... 기존 스타일 ... */ },
  backBtn: { /* ... 기존 스타일 ... */ },
  headerTitle: { /* ... 기존 스타일 ... */ },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemTitle: { fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  itemTime: { fontSize: 12, fontWeight: '400', color: '#6F6F6F' },
  itemLabel: { marginTop: 6, fontSize: 12, color: '#6F6F6F' },
  itemDate: { fontSize: 12, fontWeight: '600', color: '#1C1C1C' },
  statusText: { fontSize: 12, fontWeight: 'bold', marginTop: 8 },
  cancelBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelBtnDisabled: {
    backgroundColor: '#FCA5A5',
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});
