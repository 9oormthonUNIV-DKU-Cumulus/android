// screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { api } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ── 1) StatusBar 높이 보정 (Android만) ─────────────────────────
const STATUS_BAR = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

// ── 2) Figma 픽셀값 그대로 top 계산 ──────────────────────────────
const LOGO_TOP = STATUS_BAR + 146; // Figma: 176px
const INPUT_TOP = LOGO_TOP + 119 + 32; // logo.height(119) + margin(32)
const SECOND_INPUT_TOP = INPUT_TOP + 46 + 12; // input.height(46) + gap(12)
const LOGIN_TOP = SECOND_INPUT_TOP + 46 + 12; // same gap
const LINK_ROW_TOP = LOGIN_TOP + 46 + 8; // loginButton.height(46) + gap(8)
const EASY_TITLE_TOP = LINK_ROW_TOP + 20 + 32; // linkRow.height(20) + gap(32)
const EASY_BUTTONS_TOP = EASY_TITLE_TOP + 20 + 8; // title.height(20) + gap(8)
const errorTop = SECOND_INPUT_TOP + 46 + 8;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await api.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken, refreshToken } = res.data.data;

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      console.log("로그인 성공 및 토큰 저장 완료");

      setErrorMessage("");

      // 로그인 성공 시 홈으로 이동
      navigation.replace("Main");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setErrorMessage(message);
      console.error("로그인 실패", message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1) 로고 */}
      <View style={[styles.logoWrapper, { top: LOGO_TOP }]}>
        <Image
          source={require("../assets/images/dmoim-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoName}>moim</Text>
      </View>

      {/* 2) 이메일 입력창 */}
      <TextInput
        placeholder="이메일"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { top: INPUT_TOP }]}
      />

      {/* 3) 비밀번호 입력창 */}
      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { top: SECOND_INPUT_TOP }]}
      />

      {/* 4) 로그인 버튼 */}
      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.loginButton, { top: LOGIN_TOP }]}
      >
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      {errorMessage !== "" && (
        <Text style={[styles.errorMessage]}>{errorMessage}</Text>
      )}

      {/* 5) 아이디/비번 찾기 · 회원가입 링크 */}
      <View style={[styles.linkRow, { top: LINK_ROW_TOP }]}>
        <TouchableOpacity onPress={() => navigation.navigate("FindId")}>
          <Text style={styles.link}>아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate("FindPassword")}>
          <Text style={styles.link}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.divider}>|</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // 1) 로고 래퍼
  logoWrapper: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    width: 116,
    height: 95,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  logoName: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  // 2·3) 입력창 공통
  input: {
    position: "absolute",
    alignSelf: "center",
    width: 288,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 12,
  },
  // 로그인 에러 메시지
  errorMessage: {
    position: "absolute",
    top: errorTop,
    alignSelf: "center",
    zIndex: 10,
    color: "red",
    fontSize: 12,
    backgroundColor: "white",
    paddingHorizontal: 4,
    borderColor: "red",
    borderWidth: 2,
  },
  // 4) 로그인 버튼
  loginButton: {
    position: "absolute",
    alignSelf: "center",
    width: 288,
    height: 46,
    backgroundColor: "#428DFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  // 5) 링크 행
  linkRow: {
    position: "absolute",
    alignSelf: "center",
    width: 219,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  link: {
    fontSize: 10,
    color: "#666",
  },
  divider: {
    fontSize: 14,
    color: "#CCC",
  },
  // 6) 간편 로그인 타이틀
  easyTitle: {
    position: "absolute",
    alignSelf: "center",
    width: 65,
    height: 20,
    textAlign: "center",
    color: "#999",
    fontSize: 13,
  },
  // 7) 간편 로그인 버튼 그룹
  easyButtons: {
    position: "absolute",
    alignSelf: "center",
    width: 212,
    height: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  easyImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
});
