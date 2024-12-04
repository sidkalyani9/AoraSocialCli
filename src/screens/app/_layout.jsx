import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import 'react-native-reanimated';
import { GlobalProvider } from '../../context/GlobalProvider';


// This is for Tailwind
import "../global.css";
import { SafeAreaView } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // SplashScreen.hideAsync();

  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      try {
        if (fontsLoaded) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        }
      } catch (err) {
        console.error("Error loading resources:", err);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

    const screenOptions = {
      headerShown: false,
    };
  
    return (
      <GlobalProvider>
        <SafeAreaView className="h-full bg-primary">
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(camera)" />
            <Stack.Screen name="search/[query]" />
          </Stack>
          <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
      </GlobalProvider>
    );
  }

  

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161622',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
});
