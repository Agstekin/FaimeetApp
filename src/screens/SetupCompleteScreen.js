import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SetupCompleteScreen({ navigation, route }) {
  const { username, interests } = route.params;

  const titleSlide = useRef(new Animated.Value(-width)).current;
  const subSlide = useRef(new Animated.Value(width)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(subSlide, {
          toValue: 0,
          duration: 800,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: 1000,
          delay: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('MainTabs');
      }, 2000);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      <View style={styles.background} />

      <Animated.Text
        style={[
          styles.title,
          { transform: [{ translateX: titleSlide }], opacity: fadeIn },
        ]}
      >
        You're set to go!
      </Animated.Text>

      <Animated.Text
        style={[
          styles.sub,
          { transform: [{ translateX: subSlide }], opacity: fadeIn },
        ]}
      >
        Welcome aboard, {username}!
      </Animated.Text>

      <Animated.Text style={[styles.sub, { opacity: fadeIn }]}>
        Interests: {interests?.join(', ') || 'None'}
      </Animated.Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#6366f1',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  sub: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
});
