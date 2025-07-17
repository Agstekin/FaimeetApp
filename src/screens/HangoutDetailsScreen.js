

// ✅ screens/HangoutDetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import Gstyle from '../styles/stylesheetconst';

export default function HangoutDetailsScreen({ selectedHangout, hangout, onBack }) {
  if (!selectedHangout) return null;
  console.log(hangout);
  console.log('selected: ',selectedHangout);
  return (
    <View style={Gstyle.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={Gstyle.detailsHeader}>
        <TouchableOpacity onPress={onBack} style={Gstyle.backButton}>
          <Text style={Gstyle.backButtonText}>←</Text>
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
            <Text style={Gstyle.playButtonText}>▶</Text>
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

        <TouchableOpacity style={Gstyle.joinHangoutButton}>
          <Text style={Gstyle.joinHangoutButtonText}>Join Hangout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
