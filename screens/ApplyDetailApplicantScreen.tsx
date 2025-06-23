import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  navigation: any;
}

export default function ApplyDetailApplicantScreen({ navigation }: Props) {
  /* 폼 상태 */
  const [form, setForm] = useState({
    date: '2025. 06. 16',
    name: '',
    intro: '',
    motive: '',
    org: '',
    phone: '',
    portfolio: '',
    career1: '',
    career2: '',
    career3: '',
  });

  const onChange = (k: keyof typeof form, v: string) =>
    setForm(prev => ({ ...prev, [k]: v }));

  /* 필수 값 검증 */
  const canSubmit = useMemo(() => {
    return (
      ['name', 'intro', 'motive', 'org', 'phone'].every(
        k => form[k as keyof typeof form].trim(),
      )
    );
  }, [form]);

  const handleSubmit = () => {
    if (!canSubmit) {
      Alert.alert('알림', '필수 항목을 모두 입력해주세요.');
      return;
    }
    // TODO: API 호출
    console.log('[APPLY]', form);
    Alert.alert('완료', '신청이 완료되었습니다.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity hitSlop={8} onPress={navigation.goBack}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>모임 신청</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 본문 */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.date}>{form.date}</Text>

        {/* 이름 */}
        <Label text="이름" />
        <Input value={form.name} onChangeText={v => onChange('name', v)} />

        {/* 간단 소개 */}
        <Label text="간단 소개" />
        <Input
          multiline
          value={form.intro}
          onChangeText={v => onChange('intro', v)}
        />

        {/* 지원 동기 */}
        <Label text="지원 동기" />
        <Input
          multiline
          value={form.motive}
          onChangeText={v => onChange('motive', v)}
        />

        {/* 소속 */}
        <Label text="소속" />
        <Input value={form.org} onChangeText={v => onChange('org', v)} />

        {/* 연락처 */}
        <Label text="연락처" />
        <Input value={form.phone} onChangeText={v => onChange('phone', v)} />

        {/* 포트폴리오 */}
        <Label text="포트폴리오" />
        <Input
          value={form.portfolio}
          onChangeText={v => onChange('portfolio', v)}
        />

        {/* 경력 사항 (선택) */}
        <Label text="경력 사항" />
        <Input
          placeholder="경력 1"
          value={form.career1}
          onChangeText={v => onChange('career1', v)}
        />
        <Input
          placeholder="경력 2"
          value={form.career2}
          onChangeText={v => onChange('career2', v)}
        />
        <Input
          placeholder="경력 3"
          value={form.career3}
          onChangeText={v => onChange('career3', v)}
        />
      </ScrollView>

      {/* 하단 제출 버튼 */}
      <TouchableOpacity
        style={[styles.submitBtn, { opacity: canSubmit ? 1 : 0.3 }]}
        disabled={!canSubmit}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>모임 신청하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------- 공통 ---------- */
const Label = ({ text }: { text: string }) => (
  <Text style={styles.label}>{text}</Text>
);

const Input = (props: TextInputProps) => (
  <TextInput
    {...props}
    placeholderTextColor="#999"
    style={[styles.input, props.style]}
  />
);

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

  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 },
  date: { fontSize: 12, color: '#999', marginBottom: 16 },

  label: { fontSize: 12, color: '#666', marginBottom: 4 },

  input: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#000',
    textAlignVertical: 'top',
  },

  submitBtn: {
    height: 48,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#357CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
