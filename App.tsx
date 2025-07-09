import { useNavigationContainerRef } from "@react-navigation/native";
import { useState, useRef } from "react";

// App.tsx ─ 최상위 네비게이션 설정
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

/* ───── 화면 컴포넌트 ───── */
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SignupFormScreen from "./screens/SignupFormScreen";

import HomeScreen from "./screens/home/HomeScreen";
import CategoryScreen from "./screens/category/CategoryScreen";
import CategoryListScreen from "./screens/category/CategoryListScreen";
import CommunityScreen from "./screens/community/CommunityScreen";
import MyPageScreen from "./screens/myPage/MyPageScreen";

import MeetingDetailScreen from "./screens/meeting/MeetingDetailScreen";
import JoinConfirmScreen from "./screens/meeting/JoinConfirmScreen";
import MeetingApplyScreen from "./screens/meeting/MeetingApplyScreen";
import ApplicantInfoScreen from "./screens/meeting/ApplicantInfoScreen"; // “신청정보” 화면
import MoimFormScreen from "./screens/meeting/MoimFormScreen";

/* ───── 타입 정의 ───── */
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  SignupForm: undefined;
  Main: undefined;
};
export type HomeStackParamList = {
  Home: undefined;
  CategoryListScreen: { label?: string } | undefined;
  MeetingDetail: undefined;
  JoinConfirm: undefined;
  MeetingApply: undefined;
  ApplicantInfo: { id: string }; // ← 신청자 id 전달
  MoimForm: undefined;
};

/* ───── 네비게이터 생성 ───── */
const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const CategoryStk = createNativeStackNavigator();
const CommunityStk = createNativeStackNavigator();
const MyPageStk = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ===== HomeStack ===== */
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="CategoryListScreen"
        component={CategoryListScreen}
      />
      <HomeStack.Screen name="MeetingDetail" component={MeetingDetailScreen} />
      <HomeStack.Screen name="JoinConfirm" component={JoinConfirmScreen} />
      <HomeStack.Screen name="MeetingApply" component={MeetingApplyScreen} />
      <HomeStack.Screen name="ApplicantInfo" component={ApplicantInfoScreen} />
      <HomeStack.Screen name="MoimForm" component={MoimFormScreen} />
    </HomeStack.Navigator>
  );
}

/* ===== 기타 스택 ===== */
function CategoryStackScreen() {
  return (
    <CategoryStk.Navigator screenOptions={{ headerShown: false }}>
      <CategoryStk.Screen name="Category" component={CategoryScreen} />
    </CategoryStk.Navigator>
  );
}
function CommunityStackScreen() {
  return (
    <CommunityStk.Navigator screenOptions={{ headerShown: false }}>
      <CommunityStk.Screen name="Community" component={CommunityScreen} />
    </CommunityStk.Navigator>
  );
}
function MyPageStackScreen() {
  return (
    <MyPageStk.Navigator screenOptions={{ headerShown: false }}>
      <MyPageStk.Screen name="MyPage" component={MyPageScreen} />
    </MyPageStk.Navigator>
  );
}

/* ===== 하단 탭 ===== */
function MainTab({ currentRoute }: { currentRoute?: string }) {
  const hideFabRoutes = [
    "MeetingDetail",
    "JoinConfirm",
    "MeetingApply",
    "ApplicantInfo",
    "MoimForm",
  ];

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 80, // 높이 조절
            paddingBottom: 12, // 아래 여백
            paddingTop: 10, // 위 여백
          },
        }}
      >
        <Tab.Screen
          name="홈"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/home_active.png")
                    : require("./assets/icons/home_inactive.png")
                }
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="카테고리"
          component={CategoryStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/category_active.png")
                    : require("./assets/icons/category_inactive.png")
                }
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="커뮤니티"
          component={CommunityStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/community_active.png")
                    : require("./assets/icons/community_inactive.png")
                }
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MyPageStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/mypage_active.png")
                    : require("./assets/icons/mypage_inactive.png")
                }
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* FAB 조건부 렌더링 */}
      {!hideFabRoutes.includes(currentRoute || "") && (
        <TouchableOpacity style={styles.fab}>
          <Image
            source={require("./assets/icons/floatingIcon.png")}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

/* ===== App ===== */
export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          setCurrentRoute(navigationRef.getCurrentRoute()?.name);
        }}
        onStateChange={() => {
          setCurrentRoute(navigationRef.getCurrentRoute()?.name);
        }}
      >
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Signup" component={SignupScreen} />
          <RootStack.Screen name="SignupForm" component={SignupFormScreen} />
          <RootStack.Screen
            name="Main"
            children={() => <MainTab currentRoute={currentRoute} />}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

/* ===== 공용 스타일 ===== */
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 110,
    right: 20,
    borderRadius: 28,
    backgroundColor: "#5498FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
