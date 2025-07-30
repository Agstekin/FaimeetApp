// ExploreScreen.js
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
  Alert,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import Gstyle from '../styles/stylesheetconst';

import firestore from '@react-native-firebase/firestore';
import { getHangoutDetails, createHangout } from '../firebase/firebaseService';
import HangoutDetailsScreen from './HangoutDetailsScreen';
import CreateHangoutScreen from './CreateHangoutScreen';
import { GET_HANGOUT_DOC_ID } from '../firebase/firebaseConstants';
import { Picker } from '@react-native-picker/picker';
import { getCurrentLocation } from '../utils/images/location/LocationUtil';
import Geocoder from 'react-native-geocoder-reborn';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();



export default function ExploreScreen() {
  const navigation = useNavigation();
  const DocId = GET_HANGOUT_DOC_ID;

  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedHangout, setSelectedHangout] = useState(null);
  const [search, setSearch] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [locationStr, setLocationStr] = useState('Loading...');

  const [availableLocations, setAvailableLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Detecting...');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
    message: '',
  });

  const slideAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    (async () => {
      console.log('🏁 fetching coord000s...');
      const loc = await getCurrentLocation();
      if (loc) {
        console.log('📍 coords:', loc);
        try {
          const results = await Geocoder.geocodePosition({
            lat: loc.latitude,
            lng: loc.longitude
          });
          console.log('🏠 address results:', results);
          const addr = results[0]?.locality || 'Address not found';
          console.log("............",addr)
          setLocationStr(addr);
          setSelectedLocation(addr);
           setAvailableLocations((prev) => {
            if (!prev.includes(addr)) {
              return [addr, ...prev];
            }
            return prev;
          });
        
        } catch (e) {
          console.error('🚨 geocode error:', e);
          setLocationStr('Unable to find address');
           setSelectedLocation('Unable to find address');
        }
      } else {
        console.warn('⚠️ coordinates unavailable');
        setLocationStr('Location permission denied or unavailable');
         setSelectedLocation('Location permission denied or unavailable');
      }
    })();
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue:
        currentScreen === 'home'
          ? 0
          : currentScreen === 'details'
          ? -width
          : -width * 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

  const [hangoutsdatas, setHangoutsdatas] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('hangouts')
      .orderBy('timeCreated', 'desc')
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            title: data.title,
            date: data.date,
            time: data.time,
            location: data.location,
            category: data.environmentType,
            image: data.imageUrl,
            description: data.description,
          });
        });
        setHangoutsdatas(list);
      });
    return () => subscriber();
  }, []);

  const navigateToDetails = (hangout) => {
    console.log('1', hangout);
    setSelectedHangout(hangout);
    navigation.navigate('HangoutDetails', { selectedHangout: hangout });
   // setCurrentScreen('details');
  };

  const navigateToCreate = () => {
    setCurrentScreen('create');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  const HangoutCard = ({ hangout, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const joinHangout = async (hangoutId) => {
      try {
        const querySnapshot = await firestore()
          .collection('rsvp_hangouts')
          .where('user_id', '==', auth().currentUser?.uid)
          .where('hangout_id', '==', hangoutId)
          .get();

        if (!querySnapshot.empty) {
          Toast.show({
            type: 'customError',
            text1: 'Already Joined',
            text2: 'You’ve already sent an RSVP to this hangout.',
            position: 'bottom',
            visibilityTime: 3000,
          });
        } else {
          await firestore().collection('rsvp_hangouts').add({
            hangout_id: hangoutId,
            user_id: auth().currentUser?.uid || 'anonymous',
            rsvp_sent_at: firestore.FieldValue.serverTimestamp(),
            rsvp_withdraw_at: null,
          });
          Toast.show({
            type: 'customSuccess',
            text1: 'RSVP sent!',
            text2: 'You have successfully joined the hangout.',
            position: 'bottom',
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        console.error('RSVP Error:', error);
      }
    };

    return (
      <Animated.View
        style={[styles.hangoutCard, { transform: [{ scale: scaleAnim }] }]}
      >
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <View style={styles.cardImageContainer}>
            <Image source={{ uri: hangout.image }} style={styles.image} />
            <View style={styles.mockImage} />
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{hangout.category}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{hangout.title}</Text>
            <Text style={styles.cardDate}>
              {hangout.date} • {hangout.time}
            </Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{hangout.location}</Text>
            </View>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => {
                joinHangout(hangout.id);
              }}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const HomeScreen = () => (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.headerContainer}>
        {/* Location Picker */}
    <View style={styles.wrapper}>
      <Picker
        selectedValue={selectedLocation}
        onValueChange={(itemValue) => setSelectedLocation(itemValue)}
        style={styles.picker}
        mode="dropdown"
        dropdownIconColor="#ffffff" // Optional: hide native icon on Android
      >
        {availableLocations.map((loc, idx) => (
          <Picker.Item label={loc} value={loc} key={idx} />
        ))}
      </Picker>

      {/* Custom dropdown icon (e.g. location pin) */}
      <Ionicons name="location-sharp" size={20} color="#555" style={styles.icon} />	
    </View>

      {/* Search + Filter */}
        <View style={Gstyle.headerRow}>
          <TextInput
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.filterButton}
          >
            <Ionicons name="filter" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Title + Add */}
       
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {hangoutsdatas.map((hangout) => (
          <HangoutCard
            key={hangout.id}
            hangout={hangout}
            onPress={() => navigateToDetails(hangout)}
          />
        ))}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setSelectedCategory(null)}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>

            {['Outdoor', 'Indoor'].map((category) => (
              <TouchableOpacity
                key={category}
                style={styles.filterOptionContainer}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.filterOption}>
                  {selectedCategory === category ? '✔️ ' : ''}{category}
                </Text>
              </TouchableOpacity>
            ))}

           <TouchableOpacity
  style={styles.applyButton}
  onPress={async () => {
    setFilteredCategory(selectedCategory);
    setModalVisible(false);

    try {
      const query = firestore()
        .collection('hangouts')
        .orderBy('timeCreated', 'desc');

      let filteredQuery = query;

      if (selectedCategory) {
        filteredQuery = query.where('environmentType', '==', selectedCategory);
      }

      const snapshot = await filteredQuery.get();
      const filteredData = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        filteredData.push({
          id: doc.id,
          title: data.title,
          date: data.date,
          time: data.time,
          location: data.location,
          category: data.environmentType,
          image: data.imageUrl,
          description: data.description,
        });
      });

      setHangoutsdatas(filteredData);
    } catch (error) {
      console.error('🔥 Filter fetch error:', error);
      Alert.alert('Error', 'Failed to fetch filtered hangouts.');
    }
  }}
>
  <Text style={styles.applyButtonText}>Apply</Text>
</TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          flexDirection: 'row',
          width: width * 3,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={{ width }}>{HomeScreen()}</View>
      <View style={{ width }}>
        <HangoutDetailsScreen
          hangout={selectedHangout}
          onBack={navigateToHome}
        />
      </View>
      
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
    width: '50%',
  },
  picker: {
    //width: '50%',
    height: '100%',
    color: '#000',
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: Platform.OS === 'android' ? 16 : 12,
    pointerEvents: 'none',
  },
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: 10,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pickerRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  locationPicker: {
    width: '100%',
    height: 48,
    color: '#333',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  hangoutCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  mockImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#444',
  },
  joinButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cancelText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetText: {
    color: '#007AFF',
    fontSize: 16,
  },
  filterOptionContainer: {
    marginVertical: 8,
  },
  filterOption: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
