import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Dimensions, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const UserLoginForm = () => {
    const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace with real authentication logic
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    } else {
     // Alert.alert('Success', `Welcome, ${username}!`);
       navigation.navigate('Interests', { username });

    }
  };

  const userLogin = () => {
  console.log('Navigating to HomeScreen...');

  navigation.navigate('MainTabs', {
    name: 'Test User',
    email: 'testuser@example.com',
    photo: null,
  });

};
  return (
    
    <View style={styles.gradientBackground}>
         <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
         <View style={[styles.floatingElement, styles.element1]} />
                <View style={[styles.floatingElement, styles.element2]} />
                <View style={[styles.floatingElement, styles.element3]} />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

       <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

        
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
    button: {
    backgroundColor: '#FFFFFF',         // White background
    borderColor: '#ccc',                // Light gray border
    borderWidth: 1.5,                   // Border thickness
    borderRadius: 10,                   // Rounded corners
    paddingVertical: 14,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,                       // Shadow for Android
    shadowColor: '#000',                // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#333333',                   // Dark text
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
     color: '#ffffff',
    letterSpacing: 2,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff'
  },
  buttonStyle: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
   googleButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  gradientBackground: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    paddingHorizontal: 30,
    color: '#000'
   
  },
   floatingElement: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  element1: {
    width: 80,
    height: 80,
    top: height * 0.15,
    left: width * 0.1,
  },
  element2: {
    width: 60,
    height: 60,
    top: height * 0.25,
    right: width * 0.15,
  },
  element3: {
    width: 40,
    height: 40,
    bottom: height * 0.3,
    left: width * 0.2,
  },
});

export default UserLoginForm;
