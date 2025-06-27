// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/home/HomeScreen";
import CategoryListScreen from "./screens/category/CategoryListScreen";
import CommunityScreen from "./screens/community/CommunityScreen";
import MyPageScreen from "./screens/myPage/MyPageScreen";
import CategoryScreen from "./screens/category/CategoryScreen";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import MeetingDetailScreen from "./screens/meeting/MeetingDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CategoryListScreen" component={CategoryListScreen} />
      <Stack.Screen name="MeetingDetail" component={MeetingDetailScreen} />
    </Stack.Navigator>
  );
}

function CommunityStack() {
  return (
    <Stack.Navigator
      initialRouteName="Community"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Community" component={CommunityScreen} />
    </Stack.Navigator>
  );
}

function MyPageStack() {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MyPage" component={MyPageScreen} />
    </Stack.Navigator>
  );
}

function CategoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="Category"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

function MainTab() {
  return (
    <>
      {/* 하단 네비게이션바 */}
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="홈"
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/home_active.png") // 색 있는 이미지
                    : require("./assets/icons/home_inactive.png") // 회색/흑백 이미지
                }
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="카테고리"
          component={CategoryStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/category_active.png") // 색 있는 이미지
                    : require("./assets/icons/category_inactive.png") // 회색/흑백 이미지
                }
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="커뮤니티"
          component={CommunityStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/community_active.png") // 색 있는 이미지
                    : require("./assets/icons/community_inactive.png") // 회색/흑백 이미지
                }
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="마이페이지"
          component={MyPageStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? require("./assets/icons/mypage_active.png") // 색 있는 이미지
                    : require("./assets/icons/mypage_inactive.png") // 회색/흑백 이미지
                }
                style={{ width: 24, height: 24, resizeMode: "contain" }}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* 플로팅 버튼 */}
      <TouchableOpacity style={styles.fab}>
        <Image
          source={require("./assets/icons/floatingIcon.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 80, // 탭바 위에 살짝 떠 있게
    right: 20,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android 그림자
    shadowColor: "#000", // iOS 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
