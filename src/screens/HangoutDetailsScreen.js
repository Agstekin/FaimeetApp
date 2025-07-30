

// ✅ screens/HangoutDetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar, Image } from 'react-native';
import Gstyle from '../styles/stylesheetconst';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

import firestore from '@react-native-firebase/firestore';

export default function HangoutDetailsScreen({ navigation, route }) {

  const handleCancel = () => navigation.goBack();
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
 
  if(route){
    const { selectedHangout } = route.params;
   
   if (!selectedHangout) return null;
  
  return (
    <View style={Gstyle.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={Gstyle.detailsHeader}>
        <TouchableOpacity  style={Gstyle.backButton}>
          <Text style={Gstyle.backButtonText} onPress={handleCancel}>
             <Ionicons name="arrow-back" size={24} color="#333" />
          </Text>
        </TouchableOpacity>
        <Text style={Gstyle.detailsTitle}>Hangout Details</Text>
        <TouchableOpacity style={Gstyle.optionsButton}>
          <Text style={Gstyle.optionsButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={Gstyle.detailsContent} showsVerticalScrollIndicator={false}>
        <Text style={Gstyle.detailsHangoutTitle}>{selectedHangout.title}</Text>
        <View style={Gstyle.detailsImageContainer}>
          <View style={Gstyle.detailsMockImage} />
          <TouchableOpacity style={Gstyle.playButton}>
            <Image source={{ uri: selectedHangout.image }}/>
          </TouchableOpacity>
        </View>

        <Text style={Gstyle.detailsMainTitle}>{selectedHangout.title}</Text>
        <Text style={Gstyle.detailsDateTime}>{"25/30/2025"} • {"5:00 PM"}</Text>
        <View style={Gstyle.detailsLocationRow}>
          <Text style={Gstyle.locationIcon}>📍</Text>
          <Text style={Gstyle.detailsLocationText}>{selectedHangout.location}</Text>
          <View style={Gstyle.detailsCategoryBadge}>
            <Text style={Gstyle.categoryText}>{selectedHangout.category}</Text>
          </View>
        </View>

        <Text style={Gstyle.detailsDescription}>{selectedHangout.description}</Text>

        <Text style={Gstyle.descriptionLabel}>Description</Text>
        <Text style={Gstyle.fullDescription}>{selectedHangout.description}</Text>

        <TextInput
          style={Gstyle.messageInput}
          placeholder="Message..."
          placeholderTextColor="#999"
          multiline
        />

        <TouchableOpacity style={Gstyle.joinHangoutButton} onPress={() => {
                joinHangout(selectedHangout.id);
              }}>
          <Text style={Gstyle.joinHangoutButtonText}>Join Hangout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
  }

  }
  

