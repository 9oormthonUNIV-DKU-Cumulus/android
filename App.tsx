import {
  getFocusedRouteNameFromRoute,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useState, useRef } from "react";

// App.tsx ─ 최상위 네비게이션 설정
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

/* ───── 화면 컴포넌트 ───── */
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SignupFormScreen from "./screens/SignupFormScreen";

import HomeScreen from "./screens/home/HomeScreen";
import CategoryListScreen from "./screens/category/CategoryListScreen";
import MyPageScreen from "./screens/myPage/MyPageScreen";

import MeetingDetailScreen from "./screens/meeting/MeetingDetailScreen";
import JoinConfirmScreen from "./screens/meeting/JoinConfirmScreen";
import MeetingApplyScreen from "./screens/meeting/MeetingApplyScreen";
import ApplicantInfoScreen from "./screens/meeting/ApplicantInfoScreen"; // “신청정보” 화면
import MoimFormScreen from "./screens/meeting/MoimFormScreen"; // 모임 신청 폼 화면
import JoinMoimScreen from "./screens/meeting/JoinMoimScreen";
import ClubFormScreen from "./screens/meeting/ClubFormScreen";
import CommunityFormScreen from "./screens/community/CommunityFormScreen";
import CommunityDetailScreen from "./screens/community/CommunityDetailScreen";
import NoticeDetailScreen from "./screens/meeting/NoticeDetailScreen";
import NoticeFormScreen from "./screens/meeting/NoticeFormScreen";
import SearchScreen from "./screens/home/SearchScreen";

/* ───── 타입 정의 ───── */
// 모임 타입
export type PlanType = {
  id: number;
  title: string;
  location: string;
  date: string;
  peopleCount: number;
  content: string;
};

// 게시글 타입
export type PostType = {
  id: string;
  author: string;
  date: string;
  title: string;
  content: string;
};

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  SignupForm: undefined;
  Main: undefined;
};
export type HomeStackParamList = {
  HomeScreen: undefined;
  CategoryListScreen: { label?: string } | undefined;
  MeetingDetail: undefined;
  JoinConfirm: undefined;
  MeetingApply: undefined;
  ApplicantInfo: { id: string }; // ← 신청자 id 전달
  MoimForm: undefined;
  JoinMoim: { plan: PlanType };
  CommunityFormScreen: undefined;
  CommunityDetailScreen: { post: PostType };
  NoticeDetailScreen: { post: PostType };
  NoticeFormScreen: undefined;
  SearchScreen: undefined;
};

export type ClubManageStackParamList = {
  JoinConfirm: undefined;
  MeetingApply: undefined;
  ApplicantInfo: { id: string }; // ← 신청자 id 전달
};

/* ───── 네비게이터 생성 ───── */
const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ClubCreateStk = createNativeStackNavigator();
const ClubManageStk = createNativeStackNavigator<ClubManageStackParamList>();
const MyPageStk = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ===== HomeStack ===== */
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
      <HomeStack.Screen
        name="CategoryListScreen"
        component={CategoryListScreen}
      />
      <HomeStack.Screen name="MeetingDetail" component={MeetingDetailScreen} />
      <HomeStack.Screen name="MeetingApply" component={MeetingApplyScreen} />

      <HomeStack.Screen name="MoimForm" component={MoimFormScreen} />
      <HomeStack.Screen name="JoinMoim" component={JoinMoimScreen} />
      <HomeStack.Screen
        name="CommunityFormScreen"
        component={CommunityFormScreen}
      />
      <HomeStack.Screen
        name="CommunityDetailScreen"
        component={CommunityDetailScreen}
      />
      <HomeStack.Screen
        name="NoticeDetailScreen"
        component={NoticeDetailScreen}
      />
      <HomeStack.Screen name="NoticeFormScreen" component={NoticeFormScreen} />
    </HomeStack.Navigator>
  );
}

/* ===== 기타 스택 ===== */
function ClubCreateStackScreen() {
  return (
    <ClubCreateStk.Navigator screenOptions={{ headerShown: false }}>
      <ClubCreateStk.Screen name="CreateClub" component={ClubFormScreen} />
    </ClubCreateStk.Navigator>
  );
}
function ClubManageStackScreen() {
  return (
    <ClubManageStk.Navigator screenOptions={{ headerShown: false }}>
      <ClubManageStk.Screen name="JoinConfirm" component={JoinConfirmScreen} />
      <ClubManageStk.Screen
        name="ApplicantInfo"
        component={ApplicantInfoScreen}
      />
    </ClubManageStk.Navigator>
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
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

            const hiddenRoutes = [
              "CommunityFormScreen",
              "CommunityDetailScreen",
              "MeetingDetail",
              "MoimForm",
              "JoinMoim",
              "MeetingApply",
              "NoticeDetailScreen",
            ];

            return {
              tabBarStyle: hiddenRoutes.includes(routeName)
                ? { display: "none" }
                : {
                    height: 80,
                    paddingBottom: 12,
                    paddingTop: 10,
                  },
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
            };
          }}
        />
        <Tab.Screen
          name="동아리 개설"
          component={ClubCreateStackScreen}
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
          name="동아리 관리"
          component={ClubManageStackScreen}
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
