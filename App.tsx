import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import SignupFormScreen from "./screens/SignupFormScreen"; 
import HomeScreen from "./screens/home/HomeScreen";
import CategoryScreen from "./screens/category/CategoryScreen";
import CategoryListScreen from "./screens/category/CategoryListScreen";
import CommunityScreen from "./screens/community/CommunityScreen";
import MyPageScreen from "./screens/myPage/MyPageScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CategoryListScreen" component={CategoryListScreen} />
    </Stack.Navigator>
  );
}

function CategoryStack() {
  return (
    <Stack.Navigator initialRouteName="Category" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

function CommunityStack() {
  return (
    <Stack.Navigator initialRouteName="Community" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Community" component={CommunityScreen} />
    </Stack.Navigator>
  );
}

function MyPageStack() {
  return (
    <Stack.Navigator initialRouteName="MyPage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPage" component={MyPageScreen} />
    </Stack.Navigator>
  );
}

function MainTab() {
  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="홈"
          component={HomeStack}
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
          component={CategoryStack}
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
          component={CommunityStack}
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
          component={MyPageStack}
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

      <TouchableOpacity style={styles.fab}>
        <Image
          source={require("./assets/icons/floatingIcon.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </>
  );
}

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="SignupForm" component={SignupFormScreen} />
            <Stack.Screen name="Main" component={MainTab} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

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