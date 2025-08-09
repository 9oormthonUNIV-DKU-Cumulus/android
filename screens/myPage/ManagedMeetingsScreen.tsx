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
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { fetchLeaderApplications } from '../../utils/api';

/* -------- 타입 -------- */
type Nav = NativeStackNavigationProp<RootStackParamList, 'ManagedMeetings'>;
interface Props { navigation: Nav; }

// API 응답에 맞게 타입 정의 (추정)
interface ApplicantItem {
  id: number; // applicationId
  name: string; // 신청자 이름
  clubName: string; // 신청한 동아리 이름
  appliedDate: string; // 신청일
  // ApplicantInfoScreen으로 전달해야 할 모든 데이터 포함
  intro?: string;
  motive?: string;
  dept?: string;
  phone?: string;
  portfolio?: string;
}

/* -------- 메인 -------- */
export default function ManagedMeetingsScreen({ navigation }: Props) {
  const [applicants, setApplicants] = useState<ApplicantItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthToken = async () => {
    // 실제 리더의 토큰을 가져와야 함
    return "your_hardcoded_leader_access_token_for_testing";
  };

  const loadApplicants = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      const response = await fetchLeaderApplications(token);
      setApplicants(response.data.data || []);
    } catch (error) {
      Alert.alert("오류", "신청자 목록을 불러오는 중 오류가 발생했습니다.");
      setApplicants([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(loadApplicants);

  const renderItem = ({ item }: { item: ApplicantItem }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ApplicantInfo', { applicant: item })}
    >
      <Image source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.applicantName}>{item.name}</Text>
        <Text style={styles.clubInfo}>신청 동아리: {item.clubName}</Text>
        <Text style={styles.dateText}>신청일: {item.appliedDate}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#6B7280" />
    </TouchableOpacity>
  );

  const Empty = () => (
    <View style={styles.emptyWrap}>
      <Ionicons name="notifications-outline" size={40} color="#C7C7C7" />
      <Text style={styles.emptyTitle}>새로운 신청 내역이 없습니다.</Text>
      <Text style={styles.emptySub}>새로운 신청이 들어오면 여기에 표시됩니다.</Text>
    </View>
  );

  const renderBody = () => {
    if (isLoading) {
      return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
    }
    return (
      <FlatList
        data={applicants}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={Empty}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>신청자 관리</Text>
        <View style={{ width: 24 }} />
      </View>
      {renderBody()}
    </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  infoContainer: {
    flex: 1,
  },
  applicantName: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  clubInfo: { fontSize: 14, color: '#374151', marginTop: 2 },
  dateText: { fontSize: 12, color: '#6B7280', marginTop: 4 },

  emptyWrap: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { marginTop: 12, fontSize: 16, fontWeight: '700', color: '#1C1C1C' },
  emptySub: { marginTop: 6, fontSize: 12, color: '#6F6F6F' },
});
