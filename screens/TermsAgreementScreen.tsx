// screens/TermsAgreementScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; 

/* ───── 약관 데이터 ───── */
interface TermItem {
  id: string;
  label: string;
  required: boolean;
}

const TERMS: TermItem[] = [
  { id: 'tos',     label: '서비스 이용 약관 (필수)',        required: true },
  { id: 'privacy', label: '개인정보 수집 및 이용 동의 (필수)', required: true },
];

/* ───── 스크린 컴포넌트 ───── */
type Props = NativeStackScreenProps<RootStackParamList, 'Terms'>;

export default function TermsAgreementScreen({ navigation }: Props) {
  /* 각 항목 체크 여부 { tos: boolean, privacy: boolean } */
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  /* (1) 전체 동의 여부 */
  const allChecked = useMemo(
    () => TERMS.every(t => !!checked[t.id]),
    [checked],
  );

  /* (2) 필수 항목이 모두 체크됐는지 → Next 버튼 활성화 */
  const canProceed = useMemo(
    () => TERMS.filter(t => t.required).every(t => !!checked[t.id]),
    [checked],
  );

  /* (3) 토글 함수들 */
  const toggleAll = () => {
    const newVal = !allChecked;
    const obj: Record<string, boolean> = {};
    TERMS.forEach(t => { obj[t.id] = newVal; });
    setChecked(obj);
  };

  const toggleOne = (id: string) =>
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <SafeAreaView style={styles.container}>
      {/* ── 헤더 ────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity hitSlop={8} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>회원가입</Text>
        <View style={{ width: 24 }} />{ /* placeholder for right-side space */ }
      </View>

      {/* ── 본문 ─────────────────────────────────────── */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* 스텝 표시 */}
        <Text style={styles.stepText}>1 / 2</Text>

        {/* 본문 제목 */}
        <Text style={styles.title}>약관 동의하기</Text>

        {/* 전체 동의 */}
        <Pressable style={styles.allRow} onPress={toggleAll}>
          <Checkbox checked={allChecked} />
          <Text style={styles.allLabel}>전체 동의</Text>
        </Pressable>

        <View style={styles.divider} />

        {/* 개별 약관 */}
        {TERMS.map(term => (
          <Pressable
            key={term.id}
            style={styles.termRow}
            onPress={() => toggleOne(term.id)}
          >
            <Checkbox checked={!!checked[term.id]} />
            <Text style={styles.termLabel}>{term.label}</Text>
            <Icon
              name="chevron-forward"
              size={20}
              color="#9E9E9E"
              style={{ marginLeft: 'auto' }}
            />
          </Pressable>
        ))}
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <TouchableOpacity
        style={[styles.nextButton, { opacity: canProceed ? 1 : 0.3 }]}
        disabled={!canProceed}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.nextText}>다음으로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ── 단순 사각 체크박스 컴포넌트 ────────────────────────── */
function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Icon name="checkmark" size={14} color="#fff" />}
    </View>
  );
}

/* ── 스타일 ───────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  /* 헤더 */
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
    color: '#000',
  },

  /* 스크롤 영역 */
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 80, // 하단 버튼 공간 확보
  },

  stepText: { fontSize: 12, color: '#999', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 24 },

  /* 전체 동의 */
  allRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  allLabel: { marginLeft: 12, fontSize: 16, fontWeight: '600' },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },

  /* 개별 항목 */
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  termLabel: { marginLeft: 12, fontSize: 14, color: '#333' },

  /* 체크박스 비주얼 */
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#C6C6C6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3366FF',
    borderColor: '#3366FF',
  },

  /* 다음 버튼 */
  nextButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#357CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
