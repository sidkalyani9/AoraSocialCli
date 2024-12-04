import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Profile from './Profile';
import Create from './Create';
import Icon from 'react-native-vector-icons/Ionicons';

const TabsLayout = () => {


const Tab = createBottomTabNavigator();

  return (
    <View className='bg-primary h-full w-full'>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            console.log(route.name);
            

            if (route.name === 'home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'create') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF9C01',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 0,    
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="create" component={Create} />
        {/* <Tab.Screen name="profile" component={Profile} /> */}
      </Tab.Navigator>
    </View>
  )
}

export default TabsLayout