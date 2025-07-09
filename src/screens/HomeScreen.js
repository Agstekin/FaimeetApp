import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Dimensions,
  StatusBar,
  Modal
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// Mock data
const hangouts = [
];

export default function UserHomeScreen() {
  const [activeTab, setActiveTab] = useState('ALL');
  
  
  
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedHangout, setSelectedHangout] = useState(null);
  const [search, setSearch] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);


   const slideAnim = useRef(new Animated.Value(0)).current;
   const fadeAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: currentScreen === 'home' ? 0 : currentScreen === 'details' ? -width : -width * 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

  
    return (
      <View style={styles.container}>
  {/* Interests Section */}
  <Text style={styles.sectionTitle}>Your Interests</Text>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.horizontalScroll}
    contentContainerStyle={styles.scrollContent}
  >
    {['Hiking', 'Music', 'Tech', 'Gaming', 'Food', 'Art'].map((interest) => (
      <TouchableOpacity key={interest} style={styles.interestButton}>
        <Text style={styles.interestButtonText}>{interest}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>

  {/* Faded Divider Line */}
  <View style={styles.divider} />

  {/* Calendar Section */}
  <Text style={styles.sectionTitle}>Your Calendar</Text>
  {/* Replace below with your calendar component or content */}
  <View style={styles.calendarPlaceholder}>
     <View style={styles.tabContainer}>
    {['ALL', 'GOING', 'SAVED', 'PAST'].map((tab) => (
      <TouchableOpacity
        key={tab}
        style={[
          styles.tabButton,
          activeTab === tab && styles.activeTabButton,
        ]}
        onPress={() => setActiveTab(tab)}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText,
          ]}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
  </View>
 
</View>
    );
  };



 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  screensContainer: {
    flex: 1,
    flexDirection: 'row',
    width: width * 3,
  },
  screenWrapper: {
    position: 'absolute',
    width: width,
    height: height,
  },
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 4,
},

horizontalScroll: {
  marginBottom: 8,
  maxHeight: 40
},

scrollContent: {
  paddingRight: 8,
},

interestButton: {
  backgroundColor: '#007AFF',
  //paddingVertical: 4,
  paddingHorizontal: 16,
  height: 20,
  borderRadius: 0,
  marginRight: 10,
  
},

interestButtonText: {
  color: '#fff',
  fontSize: 14,
  
},

divider: {
  height: 1,
  backgroundColor: '#ccc',
  opacity: 0.3,
  marginVertical: 8,
},

calendarPlaceholder: {
  height: 120,
  backgroundColor: '#f2f2f2',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
  tabContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 16,
  marginBottom: 8,
},

tabButton: {
  flex: 1,
  paddingVertical: 10,
  borderBottomWidth: 2,
  borderBottomColor: 'transparent',
  alignItems: 'center',
},

activeTabButton: {
  borderBottomColor: '#007AFF',
},

tabText: {
  color: '#888',
  fontSize: 14,
  fontWeight: '500',
},

activeTabText: {
  color: '#007AFF',
  fontWeight: 'bold',
},

tabContent: {
  padding: 12,
  backgroundColor: '#f4f4f4',
  borderRadius: 6,
  marginTop: 8,
},
});