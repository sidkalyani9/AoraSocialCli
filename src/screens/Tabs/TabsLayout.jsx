import { View, Text, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import Create from './Create';
import Icon from 'react-native-vector-icons/Ionicons';
import { icons } from '../../constants';

const TabsLayout = () => {


const Tab = createBottomTabNavigator();

  return (
    <View className='bg-primary h-full w-full'>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let colorName;           

            if (route.name === 'home') {
              iconName = icons.home;
            } else if (route.name === 'profile') {
              iconName = icons.profile;
            } else if (route.name === 'create') {
              iconName = icons.plus;
            }

            return <Image className='w-6 h-6' source={iconName} tintColor={color} />;
          },
          tabBarActiveTintColor: '#FF9C01',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 0,    
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="create" component={Create} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    </View>
  )
}

export default TabsLayout