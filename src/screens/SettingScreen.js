import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from 'react-native';
//import { getCurrentLocation } from '../utils/images/location/LocationUtil';
import auth from '@react-native-firebase/auth'; // if using Firebase Auth
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getCurrentLocation } from '../utils/images/location/LocationUtil';
import Geocoder from 'react-native-geocoder-reborn';
const SettingsScreen = () => {
  const [email, setEmail] = useState('');
  const [locationStr, setLocationStr] = useState('Detecting...');
  const navigation = useNavigation();

  
  useEffect(() => {
    (async () => {
      console.log('🏁 fetching coords...');
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
          console.log(addr)
          setLocationStr(addr);
        
        } catch (e) {
          console.error('🚨 geocode error:', e);
          setLocationStr('Unable to find address');
        }
      } else {
        console.warn('⚠️ coordinates unavailable');
        setLocationStr('Location permission denied or unavailable');
      }
    })();
  }, []);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setEmail(currentUser.email);
    }
/*
    (async () => {
      const loc = await getCurrentLocation();
      if (loc) {
        setLocationStr(`${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`);
      } else {
        setLocationStr('Location not available');
      }
    })();
  */
    }, []);

  const handleSignOut = () => {
    Alert.alert('Confirm', 'Do you really want to sign out?', [
      { text: 'Cancel' },
      {
        text: 'Sign Out',
        onPress: async () => {
          try {
            await auth().signOut();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          } catch (error) {
            //console.error('Sign out error:', error);
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* --- Top Half --- */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.location}>
            <Ionicons name="location-sharp" size={20} color="#555" style={styles.icon} />	
            {locationStr}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#6366f1" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* --- Bottom Half --- */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('HangoutListScreen')}
        >
          <Ionicons name="albums-outline" size={20} color="#444" />
          <Text style={styles.menuText}>Manage Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#d00" />
          <Text style={[styles.menuText, { color: '#d00' }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  topSection: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
  },
  profileDetails: {
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#6366f1',
    borderRadius: 6,
  },
  editText: {
    color: '#6366f1',
    marginLeft: 6,
    fontWeight: '500',
  },
  bottomSection: {
    marginTop: 30,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});
