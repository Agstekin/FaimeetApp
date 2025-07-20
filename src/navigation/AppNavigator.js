// navigation/AppNavigator.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect } from 'react';
import { getCurrentLocation } from '../utils/images/location/LocationUtil';


const screenHeaderOptions = {

  
  headerTitle: '', // This removes the header title
  headerTitleAlign: 'center',
  headerRight: () => (
    <TouchableOpacity onPress={() => alert('User icon clicked')} style={{ marginRight: 15 }}>
      <Ionicons name="person-circle-outline" size={28} color="black" />
    </TouchableOpacity>
  ),
};
// 👇 Bottom Tab Navigator with 3 tabs
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
       headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = 'search-outline';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#6366f1'
        }
      })}
    >

      <Tab.Screen name="HomeScreen" component={HomeScreen} options={screenHeaderOptions} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={screenHeaderOptions} />
      <Tab.Screen name="Notifications" component={NotificationScreen} options={screenHeaderOptions}/>
      <Tab.Screen name="Settings" component={HomeScreen} options={screenHeaderOptions} />
    </Tab.Navigator>
  );
}
// <!Stack.Screen name="HomeScreen" component={HomeScreen} />
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
