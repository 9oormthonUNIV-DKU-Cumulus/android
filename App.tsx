// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/home/HomeScreen";
import CategoryListScreen from "./screens/category/CategoryListScreen";

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
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* 하단 네비게이션바 */}
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="홈" component={HomeStack} />
          <Tab.Screen name="카테고리" component={HomeStack} />
          <Tab.Screen name="커뮤니티" component={HomeStack} />
          <Tab.Screen name="마이페이지" component={HomeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
