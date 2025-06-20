// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Placeholder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Placeholder" component={() => null} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
