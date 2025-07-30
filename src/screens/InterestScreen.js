import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';

const allInterests = ['Music', 'Travel', 'Sports', 'Food', 'Art', 'Tech', 'Fitness', 'Movies'];
const { width, height } = Dimensions.get('window');

export default function InterestsScreen({ navigation, route }) {
  const { username } = route.params;
  const [selected, setSelected] = useState([]);

  const toggle = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleSave = () => {
    navigation.navigate('SetupComplete', { username, interests: selected });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gradientBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

        {/* Floating elements */}
        <View style={[styles.floatingElement, styles.element1]} />
        <View style={[styles.floatingElement, styles.element2]} />
        <View style={[styles.floatingElement, styles.element3]} />

        <View style={styles.innerContainer}>
          <Text style={styles.title}>Hi, {username}!</Text>
          <Text style={styles.subtitle}>Select your interests</Text>

          <ScrollView
            contentContainerStyle={styles.pillsContainer}
            showsVerticalScrollIndicator={false}
          >
            {allInterests.map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.pill, selected.includes(item) && styles.pillSelected]}
                onPress={() => toggle(item)}
              >
                <Text style={selected.includes(item) ? styles.pillTextSelected : styles.pillText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save & Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366f1',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    position: 'relative',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: '#ffffffaa',
    borderWidth: 1,
    margin: 6,
  },
  pillSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  pillText: {
    fontSize: 14,
    color: '#fff',
  },
  pillTextSelected: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: 'center',
    width: 250,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
