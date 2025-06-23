// screens/SignupInfoScreen.tsx
import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInputProps,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupInfoScreen({ navigation }: Props) {
  /* ---------- form state ---------- */
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    major: '',
    grade: '',
    schoolEmail: '',
    emailCode: '',
    bio: '',
  });

  const onChange = (k: keyof typeof form, v: string) =>
    setForm(prev => ({ ...prev, [k]: v }));

  /* 모든 필수값 + 비밀번호 일치해야 활성화 */
  const canSubmit = useMemo(() => {
    const filled = ['name', 'username', 'password', 'confirmPassword']
      .every(k => form[k as keyof typeof form].trim());
    return filled && form.password === form.confirmPassword;
  }, [form]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (form.password !== form.confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: API 호출
    console.log('[SIGNUP]', form);
  };

  /* ---------- render ---------- */
  return (
    <SafeAreaView style={styles.container}>
      {/* ── 헤더 ─────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity hitSlop={8} onPress={navigation.goBack}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>회원가입</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ── 본문(폼) ───────────────── */}
      <ScrollView
        style={{ flex: 1 }}               // ⬅️ 화면 남는 공간 채우기
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.stepText}>2&nbsp;/&nbsp;2</Text>
        <Text style={styles.title}>가입하기</Text>

        {/* 이름 */}
        <Label text="이름" />
        <Input value={form.name} onChangeText={v => onChange('name', v)} />

        {/* 아이디 */}
        <Label text="아이디" />
        <Input value={form.username} onChangeText={v => onChange('username', v)} />

        {/* 비밀번호 */}
        <Label text="비밀번호" />
        <Input
          secureTextEntry
          value={form.password}
          onChangeText={v => onChange('password', v)}
          style={{ marginBottom: 4 }}
        />
        <Text style={styles.helper}>*영문, 숫자, 특수문자 포함 8자 이상</Text>

        {/* 비밀번호 확인 */}
        <Label text="비밀번호 확인" />
        <Input
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={v => onChange('confirmPassword', v)}
        />

        {/* 전공 */}
        <Label text="전공" />
        <Input value={form.major} onChangeText={v => onChange('major', v)} />

        {/* 학년 */}
        <Label text="학년" />
        <Input value={form.grade} onChangeText={v => onChange('grade', v)} />

        {/* 학교 이메일 + 인증 버튼 */}
        <Label text="학교 이메일" />
        <InputRow
          btnLabel="인증"
          value={form.schoolEmail}
          onChangeText={v => onChange('schoolEmail', v)}
          onPress={() => console.log('request email auth')}
        />

        {/* 인증 코드 + 확인 버튼 */}
        <Label text="학교 이메일 인증 코드" />
        <InputRow
          btnLabel="확인"
          value={form.emailCode}
          onChangeText={v => onChange('emailCode', v)}
          onPress={() => console.log('verify code')}
        />

        {/* 소개 */}
        <Label text="간단한 소개 (선택)" />
        <Input
          multiline
          value={form.bio}
          onChangeText={v => onChange('bio', v)}
        />
      </ScrollView>

      {/* ── 하단 고정 버튼 ─────────────── */}
      <TouchableOpacity
        style={[styles.submitBtn, { opacity: canSubmit ? 1 : 0.3 }]}
        onPress={handleSubmit}
        disabled={!canSubmit}
      >
        <Text style={styles.submitText}>가입하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ───────── 재사용 컴포넌트 ───────── */
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

interface RowProps extends TextInputProps {
  btnLabel: string;
  onPress: () => void;
}
const InputRow = ({ btnLabel, onPress, ...rest }: RowProps) => (
  <View style={styles.row}>
    <Input {...rest} style={{ flex: 1, marginRight: 8, marginBottom: 0 }} />
    <TouchableOpacity style={styles.smallBtn} onPress={onPress}>
      <Text style={styles.smallBtnText}>{btnLabel}</Text>
    </TouchableOpacity>
  </View>
);

/* ───────── 스타일 ───────── */
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
  },

  /* 스크롤 콘텐츠 */
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,          // 하단 버튼과 살짝 간격
  },
  stepText: { fontSize: 12, color: '#999', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 24 },

  label: { fontSize: 12, color: '#666', marginBottom: 4 },
  helper: { fontSize: 10, color: '#999', marginBottom: 12 },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 16,
    color: '#000',
  },

  /* 인풋 + 버튼 한 줄 */
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  smallBtn: {
    width: 56,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#DDE5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBtnText: { fontSize: 12, fontWeight: '600', color: '#3366FF' },

  /* 하단 가입 버튼 (고정) */
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
