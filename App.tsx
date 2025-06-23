import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen            from './screens/LoginScreen';
import TermsAgreementScreen   from './screens/TermsAgreementScreen';
import SignupInfoScreen from './screens/SignupInfoScreen';

export type RootStackParamList = {
  Login: undefined;
  Terms: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Terms" component={TermsAgreementScreen} />
        <Stack.Screen name="Signup" component={SignupInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
