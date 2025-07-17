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
  Alert
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import Gstyle from '../styles/stylesheetconst';
const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// firebase mock test 
import firestore from '@react-native-firebase/firestore';
import { getHangoutDetails, createHangout } from '../firebase/firebaseService';

// Screens
import HangoutDetailsScreen from './HangoutDetailsScreen';
import CreateHangoutScreen from './CreateHangoutScreen';
import { GET_HANGOUT_DOC_ID } from '../firebase/firebaseConstants';


// Mock data
const hangouts = [
  {
    id: 1,
    title: 'Picnic in the Park',
    date: 'Apr 23, 2024',
    time: '2:00 PM',
    location: 'Lakeside Park',
    category: 'Outdoor',
    description: 'Join us for a relaxing picnic at Lakeside Park! Bring your favorite snacks and enjoy the beautiful weather with friends.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Study Group',
    date: 'Apr 24, 2024',
    time: '2:00 PM',
    location: 'Central Library',
    category: 'Outdoor',
    description: 'Collaborative study session for upcoming exams.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Study Group',
    date: 'Apr 24, 2024',
    time: '2:00 PM',
    location: 'Central Library',
    category: 'Outdoor',
    description: 'Collaborative study session for upcoming exams.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
  },
];



// hangout data came from firebase
const hangoutData = ''

export default function ExploreScreen() {


    const DocId = GET_HANGOUT_DOC_ID;
  

  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedHangout, setSelectedHangout] = useState(null);
  const [search, setSearch] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
    message: '',
  });

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: currentScreen === 'home' ? 0 : currentScreen === 'details' ? -width : -width * 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);


   const [hangoutDatas, setHangoutDatas] = useState(null);
  
  //  useEffect(() => {
  //     const fetchData = async () => {
  //       const details = await getHangoutDetails(DocId);
  
  //       console.log('Hangout Details:', details);
  
  
  // //   let tok =   await createHangout({
  // //   title: 'React Native Meetup',
  // //   description: 'Discuss latest updates in React Native.',
  // //   date: '2025-07-15',
  // //   time: '6:30 PM',
  // //   location: 'Bhopal madhya pradesh',
  // // });
  //       // console.log('New Hangout Created:', tok);
  //       setHangoutDatas(details);
  //     };
  
  //     fetchData();
  //   }, []);
 
    // 🔥 Firestore listener for real-time hangouts
  const [hangoutsdatas, setHangoutsdatas] = useState([]);  // note: shadows mock data 'hangouts'
  useEffect(() => {
    const subscriber = firestore()
      .collection('hangouts')
      .orderBy('timeCreated','desc')
      .onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach(docSnap => {
          const data = docSnap.data();
          list.push({
            id: docSnap.id,
            title: data.title,
            date: data.date,
            time: data.time,
            location: data.location,
            category: data.environmentType,
            image: data.imageUrl,
            description: data.description
          });
        });
        setHangoutsdatas(list);
        
      });
    return () => subscriber();
  }, []);

    console.log('Hangout:', hangoutsdatas);

  // firebase 
//   const [hangouts, setHangouts] = useState([]);

// // Realtime listener for hangouts collection
// useEffect(() => {
//   const subscriber = firestore()
//     .collection('hangouts')
//     .onSnapshot(querySnapshot => {
//       const list = [];
//       querySnapshot.forEach(docSnap => {
//         const data = docSnap.data();
//         list.push({
//           id: docSnap.id,
//           title: data.title,
//           date: data.date,
//           time: data.time,
//           location: data.location,
//           category: data.environmentType,
//           image: data.imageUrl,
//         });
//       });
//       setHangouts(list);
//     });

//   return () => subscriber(); // unsubscribe on cleanup
// }, []);


  const navigateToDetails = (hangout) => {
    setSelectedHangout(hangout);
    setCurrentScreen('details');
  };

  const navigateToCreate = () => {
    setCurrentScreen('create');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  const navigateToExplore = () => {
    setCurrentScreen('Explore')
  }

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

    const joinHangout= async (hangoutId) => {

   //   alert('SEND RSVP FOR '+selectedHangout.id);

    console.log('SEND RSVP FOR '+hangoutId);
      
        try{
        const querySnapshot = await firestore()
      .collection('rsvp_hangouts')
      .where('user_id', '==', auth().currentUser?.uid)
      .where('hangout_id', '==', hangoutId)
      .get();
          console.log('snap:', querySnapshot.empty);
    if (!querySnapshot.empty) {
     
       Toast.show({
              type: 'customError',
              text1: 'Already Joined',
              text2: 'You’ve already sent an RSVP to this hangout.',
              position: 'bottom', // or 'top'
              visibilityTime: 3000,
         });
    } else {
        try {
          const rsvpRef = firestore().collection('rsvp_hangouts').add({
              hangout_id: hangoutId, // Reference to 'hangouts' collection
              user_id: auth().currentUser?.uid || 'anonymous',
              rsvp_sent_at: firestore.FieldValue.serverTimestamp(),
              rsvp_withdraw_at: null,
            });

   // console.log('RSVP created with ID:', rsvpRef.id);
            Toast.show({
              type: 'customSuccess',
              text1: 'RSVP sent!',
              text2: 'You have successfully joined the hangout.',
              position: 'bottom', // or 'top'
              visibilityTime: 3000,
            });
        }
      catch (error) {
          console.error('Failed to create RSVP:', error);
          Toast.show({
            type: 'customError',
            text1: 'RSVP FAILED!',
            text2: 'You have successfully joined the hangout.',
            position: 'bottom', // or 'top'
            visibilityTime: 3000,
          });
          throw error;
        }
    }
  } catch (error) {
    console.error('Error checking RSVP:', error);
    return false;
  }
   // const hangoutRef = firestore().collection('rsvp_hangouts').doc(hangoutId);
 
  }; 
   
    return (
      <Animated.View style={[styles.hangoutCard, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
        
          <View style={styles.cardImageContainer}>
              <Image source={{ uri: hangout.image }} style={styles.image}/>

             <View style={styles.mockImage} />
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{hangout.category}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{hangout.title}</Text>
            <Text style={styles.cardDate}>{hangout.date} • {hangout.time}</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>{hangout.location}</Text>
            </View>
            <TouchableOpacity style={styles.joinButton} onPress={() => { joinHangout(hangout.id)}}>
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

  {/* Header Section */}
  <View style={styles.headerContainer}>
    
    {/* First Row: Search + Filter */}
    <View style={Gstyle.headerRow}>
      <TextInput
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterButton}>
        <Ionicons name="filter" size={24} color="#333" />
      </TouchableOpacity>
    </View>

    {/* Second Row: Title + Add Button */}
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>Local Hangouts</Text>
      <TouchableOpacity style={styles.addButton} onPress={navigateToCreate}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
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

      {/* Filter Modal */}
     <Modal visible={isModalVisible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => {
              setSelectedCategory(null); // clear temp selection
            }}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

      {/* Filter Options */}
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

      {/* Apply Button */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
          setFilteredCategory(selectedCategory);
          setModalVisible(false);
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
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.screensContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={[styles.screenWrapper, { left: 0 }]}>
          <HomeScreen />
        </View>
        <View style={[styles.screenWrapper, { left: width }]}>
         <HangoutDetailsScreen
          selectedHangout={selectedHangout}
          hangout={hangoutsdatas}
          onBack={navigateToHome}
          navigateToHome={navigateToHome}
        />
        </View>
        <View style={[styles.screenWrapper, { left: width * 2 }]}>
                  <CreateHangoutScreen
          navigateToHome={navigateToHome}
          formData={formData}
          setFormData={setFormData}
        />

        </View>
      </Animated.View>
    </View>
  );
}

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
  // started search and model style 
  headerContainer: {
  padding: 16,
  backgroundColor: '#f8f9fa',
},

headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10, // Space between rows
},

searchInput: {
  flex: 1,
  height: 40,
  backgroundColor: '#e0e0e0',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginRight: 10,
},

filterButton: {
  padding: 8,
},

headerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
},

addButton: {
  backgroundColor: '#007AFF',
  borderRadius: 20,
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
},

addButtonText: {
  color: '#fff',
  fontSize: 20,
  lineHeight: 20,
},
modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cancelText: { color: '#888', fontWeight: '600' },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  resetText: { color: '#007BFF', fontWeight: '600' },
  filterOption: {
    paddingVertical: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterOptionContainer: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  flexDirection: 'row',
  alignItems: 'center',
},

applyButton: {
  marginTop: 20,
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  borderRadius: 5,
  alignItems: 'center',
},

applyButtonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
  // ended search and model styles
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    color: '#007bff',
    fontWeight: 'bold',
  },
  
  // Scroll View
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical:40,
  },
  
  // Hangout Card Styles
  hangoutCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    height: 200,
    width: '100%',
  },
  mockImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8fbc8f',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  joinButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Bottom Auth Styles
  bottomAuth: {
    padding: 20,
    paddingBottom: 40,
  },
  googleButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emailButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emailButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Details Screen Styles
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#2c3e50',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  optionsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsButtonText: {
    fontSize: 24,
    color: '#2c3e50',
  },
  detailsContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailsHangoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsImageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  detailsMockImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8fbc8f',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  playButtonText: {
    fontSize: 24,
    color: '#2c3e50',
    marginLeft: 4,
  },
  detailsMainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  detailsDateTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  detailsLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsLocationText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    marginLeft: 6,
  },
  detailsCategoryBadge: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  detailsDescription: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  fullDescription: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 20,
  },
  messageInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 20,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  joinHangoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  joinHangoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // Create Screen Styles
  createHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  createTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 20,
  },
  createContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  uploadSection: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 30,
  },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadIconText: {
    fontSize: 32,
  },
  uploadText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  createInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  createTextArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dropdownInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#666',
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});