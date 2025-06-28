import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

/* ───── 스크린 컴포넌트 ───── */
import LoginScreen           from "./screens/LoginScreen";
import SignupScreen          from "./screens/SignupScreen";
import SignupFormScreen      from "./screens/SignupFormScreen";
import HomeScreen            from "./screens/home/HomeScreen";
import CategoryScreen        from "./screens/category/CategoryScreen";
import CategoryListScreen    from "./screens/category/CategoryListScreen";
import CommunityScreen       from "./screens/community/CommunityScreen";
import MyPageScreen          from "./screens/myPage/MyPageScreen";
import MeetingDetailScreen   from "./screens/meeting/MeetingDetailScreen";

/* ───────────────────────── 타입 정의 (Navigation ParamList) */

/** RootStack – App 전역에서 사용 */
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  SignupForm: undefined;
  Main: undefined;
};

/** HomeStack – 하단 탭 중 “홈” 탭에서만 사용 */
export type HomeStackParamList = {
  Home: undefined;
  CategoryListScreen: { label?: string } | undefined;
  MeetingDetail: undefined;
};

/* ───────────────────────── 네비게이터 생성 */
const RootStack   = createNativeStackNavigator<RootStackParamList>();
const HomeStack   = createNativeStackNavigator<HomeStackParamList>();
const CategoryStk = createNativeStackNavigator();
const CommunityStk= createNativeStackNavigator();
const MyPageStk   = createNativeStackNavigator();
const Tab         = createBottomTabNavigator();

/* ====== HomeStack 구성 ====== */
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <HomeStack.Screen name="Home"               component={HomeScreen} />
      <HomeStack.Screen name="CategoryListScreen" component={CategoryListScreen} />
      <HomeStack.Screen name="MeetingDetail"      component={MeetingDetailScreen} />
    </HomeStack.Navigator>
  );
}

/* ====== 나머지 탭 Stack ====== */
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

/* ====== 하단 탭 네비게이터 ====== */
function MainTab() {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
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

      {/* floating 버튼 (예: 글쓰기) */}
      <TouchableOpacity style={styles.fab}>
        <Image
          source={require("./assets/icons/floatingIcon.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </>
  );
}

/* ====== App 컴포넌트 ====== */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login"      component={LoginScreen} />
          <RootStack.Screen name="Signup"     component={SignupScreen} />
          <RootStack.Screen name="SignupForm" component={SignupFormScreen} />
          <RootStack.Screen name="Main"       component={MainTab} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

/* ───────────────────────── 스타일 (FAB 전용) */
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 80,
    right: 20,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
