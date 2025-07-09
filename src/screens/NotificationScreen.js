import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="notifications-outline" size={80} color="#ccc" style={styles.icon} />

      <Text style={styles.heading}>Nothing yet, but stay tuned</Text>

      <Text style={styles.subText}>
        You’ll see your updates here once they arrive.{"\n"}
        Check back later!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertical center
    alignItems: 'center',     // horizontal center
    padding: 20,
    backgroundColor: '#fff',
  },
  icon: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});