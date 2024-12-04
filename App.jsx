/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "./global.css"
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Home from "./src/screens/Tabs/Home";
import { GlobalProvider } from "./src/context/GlobalProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import LandingPage from "./src/screens/LandingPage";
import { AuthLayout } from "./src/screens/Auth/AuthLayout";
import { NavigationContainer } from "@react-navigation/native";
import TabsLayout from "./src/screens/Tabs/TabsLayout";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import SignUp from "./src/screens/Auth/SignUp";

function App(){

  // const Stack = createStackNavigator();

  // const RootStack = createNativeStackNavigator({
  //   initialRouteName: 'landing',
  //   screens: {
  //     landing: {
  //       screen: LandingPage,
  //       options:{
  //         headerShown:false
  //       }
  //     },
      
  //     Home: {
  //       screen: Home,
  //       options: {
  //         headerShown:false
  //       },
  //     },
  //   },
  // });
  
  const RootStack = createNativeStackNavigator();
  // const Navigation = createStaticNavigation(RootStack);

  return (
    <GlobalProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="landing">
          <RootStack.Screen
            name="landing"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="auth"
            component={AuthLayout}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="tabs"
            component={TabsLayout}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* <Navigation /> */}
      {/* <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer> */}
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
