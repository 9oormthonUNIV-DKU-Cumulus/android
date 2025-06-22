// screens/LoginScreen.tsx
import React from 'react';
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
} from 'react-native';

// ── 1) StatusBar 높이 보정 (Android만) ─────────────────────────
const STATUS_BAR = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

// ── 2) Figma 픽셀값 그대로 top 계산 ──────────────────────────────
const LOGO_TOP           = STATUS_BAR + 176;            // Figma: 176px
const INPUT_TOP          = LOGO_TOP + 119 + 32;         // logo.height(119) + margin(32)
const SECOND_INPUT_TOP   = INPUT_TOP + 46 + 12;         // input.height(46) + gap(12)
const LOGIN_TOP          = SECOND_INPUT_TOP + 46 + 12;  // same gap
const LINK_ROW_TOP       = LOGIN_TOP + 46 + 8;          // loginButton.height(46) + gap(8)
const EASY_TITLE_TOP     = LINK_ROW_TOP + 20 + 32;      // linkRow.height(20) + gap(32)
const EASY_BUTTONS_TOP   = EASY_TITLE_TOP + 20 + 8;     // title.height(20) + gap(8)

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1) 로고 */}
      <View style={[styles.logoWrapper, { top: LOGO_TOP }]}>
        <Image
          source={require('../assets/dmatch-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* 2) 아이디 입력창 */}
      <TextInput
        placeholder="아이디"
        placeholderTextColor="#999"
        style={[styles.input, { top: INPUT_TOP }]}
      />

      {/* 3) 비밀번호 입력창 */}
      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="#999"
        secureTextEntry
        style={[styles.input, { top: SECOND_INPUT_TOP }]}
      />

      {/* 4) 로그인 버튼 */}
      <TouchableOpacity style={[styles.loginButton, { top: LOGIN_TOP }]}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      {/* 5) 아이디/비번 찾기 · 회원가입 링크 */}
      <View style={[styles.linkRow, { top: LINK_ROW_TOP }]}>
        <Text style={styles.link}>아이디 찾기</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.link}>비밀번호 찾기</Text>
        <Text style={styles.divider}>|</Text>
        <Text style={styles.link}>회원가입</Text>
      </View>

      {/* 6) 간편 로그인 타이틀 */}
      <Text style={[styles.easyTitle, { top: EASY_TITLE_TOP }]}>간편 로그인</Text>

      {/* 7) 간편 로그인 버튼들 */}
      <View style={[styles.easyButtons, { top: EASY_BUTTONS_TOP }]}>
        {/* Kakao → 노란색 원 대신 이미지 */}
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={require('../assets/kakao-login.png')}
            style={styles.easyImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Naver → 초록색 원 대신 이미지 */}
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={require('../assets/naver-login.png')}
            style={styles.easyImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Apple → 검은색 원 대신 이미지 */}
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={require('../assets/apple-login.png')}
            style={styles.easyImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // 1) 로고 래퍼
  logoWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    width: 145,
    height: 119,
  },
  logo: {
    width: '100%',
    height: '100%',
  },

  // 2·3) 입력창 공통
  input: {
    position: 'absolute',
    alignSelf: 'center',
    width: 288,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },

  // 4) 로그인 버튼
  loginButton: {
    position: 'absolute',
    alignSelf: 'center',
    width: 288,
    height: 46,
    backgroundColor: '#3366FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // 5) 링크 행
  linkRow: {
    position: 'absolute',
    alignSelf: 'center',
    width: 219,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    fontSize: 14,
    color: '#CCC',
  },

  // 6) 간편 로그인 타이틀
  easyTitle: {
    position: 'absolute',
    alignSelf: 'center',
    width: 65,
    height: 20,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },

  // 7) 간편 로그인 버튼 그룹
  easyButtons: {
    position: 'absolute',
    alignSelf: 'center',
    width: 212,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // 서비스 로고 이미지
  easyImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
});
