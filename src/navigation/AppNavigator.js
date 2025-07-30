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

import { PermissionsAndroid, Platform } from 'react-native';
import { useEffect } from 'react';
import { getCurrentLocation } from '../utils/images/location/LocationUtil';
import CustomTabBarButton from '../screens/CustomBarAddButton';
import CreateHangoutScreen from '../screens/CreateHangoutScreen';
import SettingsScreen from '../screens/SettingScreen';
import UserLoginForm from '../screens/Userlogin';
import InterestsScreen from '../screens/InterestScreen';
import SetupCompleteScreen from '../screens/SetupCompleteScreen';
import HangoutDetailsScreen from '../screens/HangoutDetailsScreen';
import HangoutsListScreen from '../screens/HangoutsListScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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
  const DummyScreen = () => null;
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
       headerShown: true,
       headerStyle:{
        height: 50,
       // backgroundColor: '#6366f1'
       color: '#fff'
       },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
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
          backgroundColor: '#6366f1',
        },
        
      })}
    >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />

            <Tab.Screen
          name="Dummy"
          component={DummyScreen} // Invisible screen or create a screen later
          options={{
            tabBarButton: (props) => (
              <CustomTabBarButton
                {...props}
              />
            ),
          }}
        />


      <Tab.Screen name="Notifications" component={NotificationScreen}/>
      <Tab.Screen name="Settings" component={SettingsScreen} />
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
        <Stack.Screen name="CreateHangout" component={CreateHangoutScreen} />
         <Stack.Screen name="Interests" component={InterestsScreen} />
         <Stack.Screen name="SetupComplete" component={SetupCompleteScreen} />
         <Stack.Screen name="UserLoginForm" component={UserLoginForm} />
         <Stack.Screen name="HangoutDetails" component={HangoutDetailsScreen} />
         <Stack.Screen name="HangoutListScreen" component={HangoutsListScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
