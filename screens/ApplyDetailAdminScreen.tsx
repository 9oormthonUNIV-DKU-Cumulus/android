import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  navigation: any;
}

/* 데모용 더미 데이터 (API 연결 시 교체) */
const dummy = {
  date: '2025. 06. 16',
  name: '김단웅',
  intro: '안녕하세요 동아리 기회라는 김단웅입니다.',
  motive: '다양한 교류모임을 경험해보고 싶어 신청하게 되었습니다.',
  org: '중앙대학교 디자인학부',
  phone: '010-1234-5678',
  portfolio: 'https://portal.dankook.ac.kr',
  careers: ['2024 봉사 공모전 대상', '2025 포스터 대상', '대학교 디자인 공모전 수상'],
};

export default function ApplyDetailAdminScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity hitSlop={8} onPress={navigation.goBack}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>신청 정보</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* 날짜 */}
        <Text style={styles.date}>{dummy.date}</Text>

        {/* 이름 */}
        <Text style={styles.name}>{dummy.name}</Text>

        {/* 구분선 */}
        <Divider />

        {/* 간단 소개 */}
        <Section title="간단 소개" body={dummy.intro} />

        {/* 지원 동기 */}
        <Section title="지원 동기" body={dummy.motive} />

        {/* 소속/연락처/포트폴리오 */}
        <Divider />
        <Field label="소속" value={dummy.org} />
        <Field label="연락처" value={dummy.phone} />
        <Field label="포트폴리오" value={dummy.portfolio} />

        {/* 경력 사항 */}
        <Divider />
        <Text style={styles.sectionTitle}>경력 사항</Text>
        {dummy.careers.map(c => (
          <Text key={c} style={styles.career}>
            • {c}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- 재사용 ---------- */
const Section = ({ title, body }: { title: string; body: string }) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionBody}>{body}</Text>
    <Divider />
  </>
);

const Field = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

/* ---------- 스타일 ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  content: { padding: 24, paddingBottom: 40 },

  date: { fontSize: 12, color: '#999', marginBottom: 8 },
  name: { fontSize: 20, fontWeight: '700', marginBottom: 16 },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },

  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  sectionBody: { fontSize: 14, color: '#333' },

  fieldRow: { marginBottom: 12 },
  fieldLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  fieldValue: { fontSize: 14, color: '#333' },

  career: { fontSize: 14, color: '#333', marginBottom: 4 },
});
