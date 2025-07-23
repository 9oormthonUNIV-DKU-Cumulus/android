// screens/myPage/ParticipatingMeetingsScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

/* ---------- 타입 ---------- */
type Nav = NativeStackNavigationProp<RootStackParamList, 'ParticipatingMeetings'>;
interface Props { navigation: Nav; }

interface MeetingItem {
  id: string;
  title: string;
  timeRange: string;  // 14~16시
  dateText: string;   // 7/6(일) 오후 14:00
}

/* ---------- 더미 데이터 ---------- */
const dummyMeetings: MeetingItem[] = [
  { id: '1', title: '동아리 정기 모임', timeRange: '14~16시', dateText: '7/6(일) 오후 14:00' },
  { id: '2', title: '동아리 자유 모임', timeRange: '14~16시', dateText: '7/6(일) 오후 14:00' },
  { id: '3', title: '동아리 자유 모임', timeRange: '14~16시', dateText: '7/6(일) 오후 14:00' },
  { id: '4', title: '동아리 자유 모임', timeRange: '14~16시', dateText: '7/6(일) 오후 14:00' },
];

/* ---------- 컴포넌트 ---------- */
export default function ParticipatingMeetingsScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: MeetingItem }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>
        {item.title} <Text style={styles.itemTime}>{item.timeRange}</Text>
      </Text>
      <Text style={styles.itemLabel}>
        일시  <Text style={styles.itemDate}>{item.dateText}</Text>
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} hitSlop={8} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1C1C1C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>참여 모임</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={dummyMeetings}
        keyExtractor={i => i.id}
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

  item: {},
  itemTitle: { fontSize: 14, fontWeight: '700', color: '#1C1C1C' },
  itemTime: { fontSize: 12, fontWeight: '400', color: '#6F6F6F' },
  itemLabel: { marginTop: 6, fontSize: 12, color: '#6F6F6F' },
  itemDate: { fontSize: 12, fontWeight: '600', color: '#1C1C1C' },
});
