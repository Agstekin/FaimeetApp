// components/CustomTabBarButton.js
import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CustomTabBarButton = ({ onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    
    navigation.navigate('CreateHangout'); // ✅ must match Stack.Screen name
  };
  return (
  <TouchableOpacity
    style={styles.container}
    onPress={handlePress}
    activeOpacity={0.8}
  >
    <View style={styles.button}>
      <Ionicons name="add" size={32} color="#fff" />
    </View>
    
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 0,
  },
});

export default CustomTabBarButton;
