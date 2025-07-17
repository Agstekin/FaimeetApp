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
  Modal,
  FlatList
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// Enhanced Mock Data
const interests = [
  { id: 1, name: 'Hiking', icon: '🥾', color: '#4CAF50', followers: 1.2 },
  { id: 2, name: 'Music', icon: '🎵', color: '#FF9800', followers: 2.8 },
  { id: 3, name: 'Tech', icon: '💻', color: '#2196F3', followers: 3.1 },
  { id: 4, name: 'Gaming', icon: '🎮', color: '#9C27B0', followers: 4.5 },
  { id: 5, name: 'Food', icon: '🍕', color: '#F44336', followers: 2.3 },
  { id: 6, name: 'Art', icon: '🎨', color: '#FF5722', followers: 1.8 },
  { id: 7, name: 'Travel', icon: '✈️', color: '#00BCD4', followers: 3.7 },
  { id: 8, name: 'Sports', icon: '⚽', color: '#8BC34A', followers: 2.9 }
];

const calendarEvents = {
  ALL: [
    { id: 1, title: 'Tech Meetup', date: '2025-07-18', time: '6:00 PM', location: 'Cyber City', attendees: 45, category: 'Tech' },
    { id: 2, title: 'Hiking Adventure', date: '2025-07-20', time: '7:00 AM', location: 'Ananthagiri Hills', attendees: 12, category: 'Hiking' },
    { id: 3, title: 'Music Jam Session', date: '2025-07-22', time: '8:00 PM', location: 'Hard Rock Cafe', attendees: 25, category: 'Music' },
    { id: 4, title: 'Food Festival', date: '2025-07-25', time: '12:00 PM', location: 'Jubilee Hills', attendees: 150, category: 'Food' },
    { id: 5, title: 'Gaming Tournament', date: '2025-07-28', time: '3:00 PM', location: 'Phoenix Arena', attendees: 80, category: 'Gaming' }
  ],
  GOING: [
    { id: 1, title: 'Tech Meetup', date: '2025-07-18', time: '6:00 PM', location: 'Cyber City', attendees: 45, category: 'Tech' },
    { id: 3, title: 'Music Jam Session', date: '2025-07-22', time: '8:00 PM', location: 'Hard Rock Cafe', attendees: 25, category: 'Music' }
  ],
  SAVED: [
    { id: 2, title: 'Hiking Adventure', date: '2025-07-20', time: '7:00 AM', location: 'Ananthagiri Hills', attendees: 12, category: 'Hiking' },
    { id: 4, title: 'Food Festival', date: '2025-07-25', time: '12:00 PM', location: 'Jubilee Hills', attendees: 150, category: 'Food' }
  ],
  PAST: [
    { id: 6, title: 'Art Exhibition', date: '2025-07-10', time: '4:00 PM', location: 'State Gallery', attendees: 200, category: 'Art' },
    { id: 7, title: 'Cricket Match', date: '2025-07-12', time: '2:00 PM', location: 'Rajiv Gandhi Stadium', attendees: 500, category: 'Sports' }
  ]
};

export default function UserHomeScreen() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Animation refs
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const interestAnimations = useRef(interests.map(() => new Animated.Value(1))).current;
  const tabIndicatorAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous pulse animation for active elements
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
  }, []);

  useEffect(() => {
    // Tab indicator animation
    const tabIndex = ['ALL', 'GOING', 'SAVED', 'PAST'].indexOf(activeTab);
    Animated.spring(tabIndicatorAnim, {
      toValue: tabIndex,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  const handleInterestPress = (interest, index) => {
    const isSelected = selectedInterests.includes(interest.id);
    
    // Animate button press
    Animated.sequence([
      Animated.timing(interestAnimations[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(interestAnimations[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();

    // Update selected interests
    if (isSelected) {
      setSelectedInterests(prev => prev.filter(id => id !== interest.id));
    } else {
      setSelectedInterests(prev => [...prev, interest.id]);
    }
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const renderInterestItem = ({ item, index }) => {
    const isSelected = selectedInterests.includes(item.id);
    
    return (
      <Animated.View
        style={[
          styles.interestContainer,
          {
            transform: [{ scale: interestAnimations[index] }],
            backgroundColor: isSelected ? item.color : '#f0f0f0',
          }
        ]}
      >
        <TouchableOpacity
          style={styles.interestButton}
          onPress={() => handleInterestPress(item, index)}
          activeOpacity={0.7}
        >
          <Text style={styles.interestIcon}>{item.icon}</Text>
          <Text style={[
            styles.interestButtonText,
            { color: isSelected ? '#fff' : '#333' }
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.followersText,
            { color: isSelected ? '#fff' : '#666' }
          ]}>
            {item.followers}k
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleEventPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventCategory}>{item.category}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
      <View style={styles.eventFooter}>
        <Text style={styles.eventLocation}>📍 {item.location}</Text>
        <Text style={styles.eventAttendees}>👥 {item.attendees}</Text>
      </View>
    </TouchableOpacity>
  );

  const filteredEvents = search
    ? calendarEvents[activeTab].filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())
      )
    : calendarEvents[activeTab];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Back! 👋</Text>
        <Text style={styles.headerSubtitle}>Discover amazing events</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Interests Section */}
        <Text style={styles.sectionTitle}>Your Interests</Text>
        <Text style={styles.sectionSubtitle}>
          Select your interests to get personalized recommendations
        </Text>
        
        <FlatList
          data={interests}
          renderItem={renderInterestItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
          contentContainerStyle={styles.scrollContent}
        />

        {/* Selected Interests Summary */}
        {selectedInterests.length > 0 && (
          <Animated.View style={[styles.summaryContainer, { opacity: fadeAnim }]}>
            <Text style={styles.summaryText}>
              {selectedInterests.length} interests selected
            </Text>
          </Animated.View>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Calendar Section */}
        <Text style={styles.sectionTitle}>Your Calendar</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#999"
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Tab Container */}
        <View style={styles.tabContainer}>
          <View style={styles.tabIndicatorContainer}>
            <Animated.View
              style={[
                styles.tabIndicator,
                {
                  transform: [
                    {
                      translateX: tabIndicatorAnim.interpolate({
                        inputRange: [0, 1, 2, 3],
                        outputRange: [0, width/4, width/2, (width*3)/4],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
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

        {/* Events List */}
        <FlatList
          data={filteredEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.eventsContainer}
        />

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No events found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or check other tabs
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                <Text style={styles.modalCategory}>{selectedEvent.category}</Text>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalDetailText}>📅 {selectedEvent.date}</Text>
                  <Text style={styles.modalDetailText}>🕐 {selectedEvent.time}</Text>
                  <Text style={styles.modalDetailText}>📍 {selectedEvent.location}</Text>
                  <Text style={styles.modalDetailText}>👥 {selectedEvent.attendees} attending</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  horizontalList: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingRight: 20,
  },
  interestContainer: {
    marginRight: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  interestButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  interestIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  interestButtonText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  followersText: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  summaryText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  tabIndicatorContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
  },
  tabIndicator: {
    width: (width - 48) / 4,
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 21,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  activeTabButton: {
    // Styles handled by indicator
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  eventsContainer: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  eventCategory: {
    fontSize: 12,
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventLocation: {
    fontSize: 14,
    color: '#888',
  },
  eventAttendees: {
    fontSize: 14,
    color: '#888',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    width: width - 40,
    maxHeight: height * 0.8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalCategory: {
    fontSize: 16,
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalDetails: {
    marginBottom: 24,
  },
  modalDetailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});