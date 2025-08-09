import React, { useState, useCallback } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { cancelApplication, fetchMyApplications } from '../../utils/api';

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

/* ---------- 컴포넌트 ---------- */
export default function ParticipatingMeetingsScreen({ navigation }: Props) {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 전체 화면 로딩 상태
  const [cancellingId, setCancellingId] = useState<number | null>(null); // 취소 중인 항목 ID

  const getAuthToken = async () => {
    // 실제 구현 시 AsyncStorage에서 사용자 토큰을 가져와야 합니다.
    return "your_hardcoded_user_access_token_for_testing";
  };

  const loadApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert("인증 오류", "로그인이 필요합니다.");
        setApplications([]);
        return;
      }
      const response = await fetchMyApplications(token);
      // API 응답의 data 필드에 실제 배열이 있다고 가정합니다.
      setApplications(response.data.data || []);
    } catch (error) {
      Alert.alert("오류", "신청 내역을 불러오는 중 오류가 발생했습니다.");
      setApplications([]); // 오류 발생 시 목록을 비웁니다.
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 화면이 포커스될 때마다 데이터를 새로고침합니다.
  useFocusEffect(loadApplications);

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
            setCancellingId(item.id);
            try {
              const token = await getAuthToken();
              await cancelApplication(item.id, token);
              Alert.alert("성공", "신청이 취소되었습니다.");
              // 성공 시 목록에서 해당 항목 제거
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
              setCancellingId(null);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: ApplicationItem }) => {
    const isPending = item.status === 'PENDING';
    const isCancelling = cancellingId === item.id;

    const statusInfo = {
      PENDING: { text: '승인 대기중', color: '#F59E0B' },
      APPROVED: { text: '참여 확정', color: '#10B981' },
      REJECTED: { text: '거부됨', color: '#EF4444' },
      CANCELED: { text: '취소됨', color: '#6B7280' },
    }[item.status];

    return (
      <View style={styles.item}>
        <View style={{ flex: 1, marginRight: 8 }}>
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
            style={[styles.cancelBtn, isCancelling && styles.cancelBtnDisabled]}
            onPress={() => handleCancel(item)}
            disabled={isCancelling}
          >
            {isCancelling ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.cancelBtnText}>취소하기</Text>}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator style={styles.center} size="large" color="#5498FF" />;
    }
    if (applications.length === 0) {
      return <Text style={styles.center}>신청 내역이 없습니다.</Text>;
    }
    return (
      <FlatList
        data={applications}
        keyExtractor={i => i.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>참여 모임</Text>
        <View style={{ width: 24 }} />
      </View>
      {renderContent()}
    </SafeAreaView>
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
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnDisabled: {
    backgroundColor: '#FCA5A5',
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50, 
  },
});
