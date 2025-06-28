import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { api } from "../utils/api";

const STATUS_BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
const PASSWORD_RULE =
  "* 비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.";

export default function SignupFormScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [major, setMajor] = useState("");
  const [grade, setGrade] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [intro, setIntro] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState("");

  /* ─────────────────────────────── 유효성 */
  const passwordValid = useMemo(
    () =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password),
    [password]
  );
  const passwordsMatch = password && password === passwordConfirm;

  const handleEmailVerify = async () => {
    if (!schoolEmail.includes("@")) {
      Alert.alert("알림", "올바른 이메일을 입력해주세요.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/api/auth/email-code/send", { email: schoolEmail });
      Alert.alert("알림", "인증 코드가 발송되었습니다.");
      setIsEmailSent(true);
      setServerErrorMsg("");
    } catch (e: any) {
      const msg =
        e?.response?.data?.error?.message ??
        e?.response?.data?.message ??
        "인증 코드 발송에 실패했습니다.";
      setServerErrorMsg(msg);
      Alert.alert("오류", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeConfirm = async () => {
    if (emailCode.length < 4) {
      Alert.alert("알림", "올바른 인증 코드를 입력해주세요.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/api/auth/email-code/verify", {
        email: schoolEmail,
        code: emailCode,
      });
      Alert.alert("알림", "이메일 인증이 완료되었습니다.");
      setIsEmailVerified(true);
      setServerErrorMsg("");
    } catch (e: any) {
      const msg =
        e?.response?.data?.error?.message ??
        e?.response?.data?.message ??
        "인증 코드가 올바르지 않습니다.";
      setServerErrorMsg(msg);
      Alert.alert("오류", msg);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!name) return "이름을 입력해주세요.";
    if (!username) return "아이디를 입력해주세요.";
    if (!passwordValid) return "비밀번호 형식이 올바르지 않습니다.";
    if (!passwordsMatch) return "비밀번호가 일치하지 않습니다.";
    if (!major) return "전공을 입력해주세요.";
    if (!grade) return "학년을 입력해주세요.";
    if (!isEmailVerified) return "학교 이메일 인증을 완료해주세요.";
    return null;
  };

  const handleComplete = async () => {
    setServerErrorMsg("");
    const error = validateForm();
    if (error) {
      setServerErrorMsg(error);
      return;
    }
    try {
      setLoading(true);
      await api.post("/api/auth/signup", {
        name,
        userName: username,
        password,
        major,
        grade,
        email: schoolEmail,
        intro,
      });
      Alert.alert("알림", "회원가입이 완료되었습니다.", [
        { text: "확인", onPress: () => navigation.replace("Login") },
      ]);
    } catch (e: any) {
      const msg =
        e?.response?.data?.error?.message ??
        e?.response?.data?.message ??
        "회원가입에 실패했습니다.";
      setServerErrorMsg(msg);
      Alert.alert("오류", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.step}>2 / 2</Text>
        <Text style={styles.header}>가입하기</Text>

        {/* 이름 */}
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          placeholder="실명을 입력해주세요"
          keyboardType="default"
          value={name}
          onChangeText={setName}
        />

        {/* 아이디 */}
        <Text style={styles.label}>아이디</Text>
        <TextInput
          style={styles.input}
          placeholder="사용할 아이디를 입력해주세요"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        {/* 비밀번호 */}
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.note}>{PASSWORD_RULE}</Text>

        {/* 비밀번호 확인 */}
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="비밀번호를 한번 더 입력해주세요"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
        />
        {!passwordsMatch && passwordConfirm !== "" && (
          <Text style={[styles.note, styles.errorText]}>
            비밀번호가 다릅니다.
          </Text>
        )}

        {/* 전공 */}
        <Text style={styles.label}>전공</Text>
        <TextInput
          style={styles.input}
          placeholder="전공을 입력해주세요"
          keyboardType="default"
          value={major}
          onChangeText={setMajor}
        />

        {/* 학년 */}
        <Text style={styles.label}>학년</Text>
        <TextInput
          style={styles.input}
          placeholder="학년을 입력해주세요"
          value={grade}
          onChangeText={setGrade}
          keyboardType="numeric"
        />

        {/* 학교 이메일 */}
        <Text style={styles.label}>학교 이메일</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="학교 이메일을 입력해주세요"
            value={schoolEmail}
            onChangeText={setSchoolEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isEmailVerified}
          />
          <TouchableOpacity
            style={[
              styles.smallButton,
              (isEmailVerified || loading) && styles.buttonDisabled,
            ]}
            onPress={handleEmailVerify}
            disabled={isEmailVerified || loading}
          >
            <Text style={styles.smallButtonText}>
              {isEmailSent ? "재발송" : "인증"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 이메일 인증 코드 */}
        {isEmailSent && !isEmailVerified && (
          <>
            <Text style={styles.label}>학교 이메일 인증 코드</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholder="인증 코드를 입력해주세요"
                value={emailCode}
                onChangeText={setEmailCode}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={[styles.smallButton, loading && styles.buttonDisabled]}
                onPress={handleCodeConfirm}
                disabled={loading}
              >
                <Text style={styles.smallButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* 인증완료 메시지 */}
        {isEmailVerified && (
          <Text style={styles.verifiedText}>✓ 이메일 인증이 완료되었습니다.</Text>
        )}

        {/* 간단한 소개 */}
        <Text style={styles.label}>간단한 소개 (선택)</Text>
        <TextInput
          style={[
            styles.input,
            { height: 100, textAlignVertical: "top", paddingTop: 12 },
          ]}
          placeholder="간단한 소개를 입력해주세요"
          multiline
          keyboardType="default"
          value={intro}
          onChangeText={setIntro}
        />

        {/* 서버에서 온 오류 */}
        {!!serverErrorMsg && (
          <Text style={[styles.note, styles.errorText]}>{serverErrorMsg}</Text>
        )}

        {/* 가입하기 버튼 */}
        <TouchableOpacity
          style={[styles.finishButton, loading && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.finishText}>가입하기</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR + 16,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  step: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  note: {
    fontSize: 12,
    color: "#999",
    marginTop: -12,
    marginBottom: 16,
  },
  errorText: {
    color: "#EF4444",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallButton: {
    width: 80,
    height: 40,
    backgroundColor: "#3366FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#AAC4FF",
  },
  smallButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  finishButton: {
    height: 50,
    backgroundColor: "#3366FF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  finishText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  verifiedText: {
    color: "#22C55E",
    fontSize: 14,
    marginBottom: 16,
  },
});
