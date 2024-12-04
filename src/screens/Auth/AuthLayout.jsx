import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './SignIn';
import { createStaticNavigation } from '@react-navigation/native';
import SignUp from './SignUp';

export const AuthLayout = () => {

    
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator initialRouteName="signin">
      <AuthStack.Screen
        name="signin"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="signup"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  )
}